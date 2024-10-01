import frontmatter
import json
import os
import re
import subprocess
from datetime import datetime, date, timezone

md_path = "markdown/"
html_path = "posts/"
draft_path = "drafts/"
json_filename = "articles.js"
feed_filename = "feed.xml"
ext_re = re.compile(r"^(?![\.#~]).*\.md$")
base_url = "https://charlie-volow.com/blog/"
required_attrs = ["title", "date", "status", "tags"]
rss_date_fmt = "%a, %d %b %Y %H:%M:%S %z"
source_date_fmt = "%Y-%m-%d"

articles = []
article_content = []
for filename in os.listdir(md_path):
    if (ext_re.match(filename)):
        with open(os.path.join(md_path, filename)) as f:
            metadata, content = frontmatter.parse(f.read())
            missing_attrs = [attr for attr in required_attrs if attr not in metadata.keys()]
            if not missing_attrs:
                tagstr=""
                for i, tag in enumerate(metadata["tags"]):
                    if i != 0:
                        tagstr += ", "
                    tagstr += tag
                metadata["tagstr"] = tagstr
                match metadata["status"]:
                    case "test":
                        print(f"Skipping test article {filename}...")
                    case "draft":
                        print(f"Publishing \"{filename}\" as draft")
                        base_filename, _ = os.path.splitext(filename)
                        new_filename = base_filename + ".html"
                        command = ['pandoc', md_path + filename, '--template=article_template.html', '-o', draft_path + new_filename]
                        result = subprocess.run(command, capture_output=True, text=True)
                        if result.returncode != 0:
                            print("Pandoc error:")
                            print(result.stderr)
                            print("Stdout:")
                            print(result.stdout)

                    case "published":
                        print(f"Publishing article \"{filename}\"")
                        base_filename, _ = os.path.splitext(filename)
                        new_filename = base_filename + ".html"
                        print("generating HTML from this metadata:")
                        print(metadata)

                        command = ['pandoc', md_path + filename, '--template=article_template.html', '-o', html_path + new_filename]
                        result = subprocess.run(command, capture_output=True, text=True)
                        if result.returncode != 0:
                            print("Pandoc error:")
                            print(result.stderr)
                            print("Stdout:")
                            print(result.stdout)
                        else:
                            metadata["url"] = base_url + html_path + new_filename
                            metadata["rel_link"] = html_path + new_filename
                            pubdatetime = datetime.combine(metadata["date"], datetime.min.time()).astimezone()
                            metadata["pubDate"] = pubdatetime.strftime(rss_date_fmt)

                            articles.append(metadata)
                            result = subprocess.run(
                                ['pandoc', '-f', 'markdown', '-t', 'html'],
                                input=content.encode('utf-8'),
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE)
                            html_content = result.stdout.decode('utf-8')
                            article_content.append(html_content)

            else:
                print(f"Error: article {filename} missing attrs: {', '.join(missing_attrs)}")

with open(json_filename, "w") as f:
    f.write("const articles = ")
    f.write(json.dumps(articles, indent=2, default=str))


with open(feed_filename, "w") as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>')
    f.write('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">')
    f.write('<channel>')
    f.write("<title>Charlie Volow's blog</title>")
    f.write('<link>https://charlie-volow.com/blog/index.html</link>')
    f.write('<atom:link href="https://charlie-volow.com/blog/feed.rss" rel="self" type="application/rss+xml" />')
    f.write('<description>Mostly a technical blog about developing Jackdaw, my digital audio workstation (DAW)</description>')
    now = datetime.now(timezone.utc);
    pub_str = now.strftime(rss_date_fmt)
    f.write(f'<lastBuildDate>{pub_str}</lastBuildDate>')
    f.write('<language>en-us</language>')

    # Articles here
    for i, article in enumerate(articles):
        f.write('<item>')
        f.write(f'<title>{article["title"]}</title>')
        f.write(f'<link>{article["url"]}</link>')
        f.write(f'<guid>{article["url"]}</guid>')
        f.write(f'<pubDate>{article["pubDate"]}</pubDate>')
        f.write(f'<description>{article["subtitle"]}</description>')
        f.write('<content:encoded><![CDATA[')
        f.write(article_content[i])
        f.write(']]></content:encoded>')
        f.write('</item>')
    f.write('</channel>')
    f.write('</rss>')
