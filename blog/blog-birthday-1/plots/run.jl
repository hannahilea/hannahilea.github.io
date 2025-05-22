# Script for generating the plots for blog-birthday-1 post

using Dates
using YAML
using WordCloud
using Images
using CairoMakie
using CairoMakie: Axis
using Git

const ASSET_DIR = joinpath(@__DIR__, "..", "assets")
const SITE_ROOT = joinpath(@__DIR__, "..", "..", "..")
const BLOG_DIR = joinpath(SITE_ROOT, "blog")
const git = Git.git()

function process_md(path)
    yaml_dict = YAML.load_file(path)
    date = yaml_dict["created"]
    date_pretty = let
        Dates.format(Date(string(date)), dateformat"d u yyyy")
    end

    tags = join(yaml_dict["tags"], " ")

    contents = let
        lines = readlines(replace(path, "src.md" => "index.html"))

        # remove header and footer
        i = findfirst(contains("</h1>"), lines)
        lines = lines[(i + 2):end]
        i = findlast(contains("<ul class=\"date\">"), lines)
        lines = lines[1:(i - 1)]

        c = join(lines, " ")
        c = replace(c, "\n" => " ")
        html2text(c)
    end
    wordcount = length(contents)
    footnotecount = length(collect(eachmatch(r"↩︎", contents)))
    return (; contents, wordcount, footnotecount, tags, date, date_pretty,
            name=basename(dirname(path)))
end

# 1. Collect all the metadata from each markdown post 
src_files = filter!(isfile, joinpath.(readdir(BLOG_DIR; join=true), "src.md"))
md_files = map(process_md, src_files)

# 2. Create a word cloud for each post 
function wordcloud_from_post(words, id; asset_dir=ASSET_DIR)
    wc = paintcloud(words;
                    mask=shape(box, 500, 400; cornerradius=2),
                    masksize=:original,
                    colors=["#000080"],
                    backgroundcolor="linen",
                    angles=(0, 45, 90),
                    fonts=["Tahoma"],
                    density=0.7,
                    maxnum=500)
    save(joinpath(asset_dir, "wc-$(id).png"), wc)
    return wc
end

sort!(md_files; by=x -> x.date)
for (i, f) in enumerate(md_files)
    @info f.name
    wordcloud_from_post(f.contents, "$i-$(f.name)")
end
wordcloud_from_post(join(f.contents for f in md_files), "combo")

# 3. Make some more plots!
ys = [length(f.contents) for f in md_files]

# okay this is dumb, but it seems like makie and date-based axes don't play 
# nice? so do the dumb thing.
daily = collect(Date(2024, 5, 1):Day(1):Date(2025, 6, 1))
xs = [findfirst(==(f.date), daily) for f in md_files]
monthly = collect(Date(2024, 5, 1):Month(1):Date(2025, 6, 1))
monthly_ticks = [findfirst(==(m), daily) for m in monthly]

function ytickformat(values)
    map(values) do value
        value == 0 && return "0"
        # This is dumb but I'm sick of fighting it
        value % 1000 == 0 && return "$(Int(value/1000))k"
        return "$(value/1000)k"
    end
end

monthly_labels = map(monthly) do date
    m = monthabbr(date)
    m != "May" && return m
    str = "$(year(date)) $m"
    return "'" * str[3:end]
end

f = Figure(; size=(800, 300))
ax = Axis(f[1, 1];
          title="A year of @hannahilea blog posts",
          ylabel="Word count",
          xlabel="Publication date",
          ytickformat,
          xticks=(monthly_ticks, monthly_labels),
          xticklabelrotation=0.3)
barplot!(ax, xs, ys;
         strokewidth=0.5,
         strokecolor=:white,
         width=3,
         color="#000080",);
save(joinpath(ASSET_DIR, "timeline.png"), f)

# 4. Make a wordcloud chart for tags 
tags = let
    t = split(join((f.tags for f in md_files), " "), " ")
    # WordCloud.jl is goofy about plurals, and treats .js like a plural 
    # I don't have time to fix it at the source, so here's a workaround
    map(x -> x == "p5.js" ? "'p5.js'" : x, t)
end
wc = paintcloud(tags;
                mask=shape(box, 500, 300; cornerradius=2),
                masksize=:original,
                colors=:rainbow,
                backgroundcolor="linen",
                angles=(0),
                fonts=["Tahoma"])
save(joinpath(ASSET_DIR, "wc-tags.png"), wc)

# 5. Make a plot based on git commits 
# ...not actually sharing this one because I don't love the styling and don't have 
# additional interesting narrative around it.

logs = split(chomp(read(`$git log main --date=short --pretty='format:%ad %s' --since="2024-05-01"`,
                        String)), "\n")
commits = map(logs) do log
    return date_str, subj = split(log, " "; limit=2)
end

# We're using the same daily and monthly info as the above plot!
commit_xs = [findfirst(==(first(c)), string.(daily)) for c in commits]
commit_ys = [1 for _ in commit_xs]

f = Figure(; size=(800, 150))
ax = Axis(f[1, 1];
          title="Timeline of www.hannahilea.com changes",
          xlabel="Contribution date",
          xticks=(monthly_ticks, monthly_labels),
          xticklabelrotation=0.3)
hideydecorations!(ax)

vlines!(ax, commit_xs;
        color="#000080", label="Contribution");
vlines!(ax, xs;
        color=:tomato,
        label="Publish");
# save(joinpath(ASSET_DIR, "timeline-multi.png"), f);

# 6. Some stats 
for f in sort(md_files; by=x -> x.wordcount)
    @info f.wordcount f.name
end

footnotes = [length(collect(eachmatch(r"↩︎", f.contents))) for f in md_files]

for f in sort(md_files; by=x -> x.footnotecount)
    @info f.footnotecount f.name
end

@info "Total words: $(sum(x -> x.wordcount, md_files))"

all_content = join((f.contents for f in md_files), " ")
ex_count = length(collect(eachmatch(r"!", all_content)))
per_count = length(collect(eachmatch(r".", all_content)))
@info "Punctiation:" ex_count per_count ratio = (per_count / ex_count)

for f in sort(md_files; by=x -> x.date)
    ratio = Int(round(length(collect(eachmatch(r".", f.contents))) /
                      length(collect(eachmatch(r"!", f.contents)))))
    # @info f.date_pretty ratio f.name
    println(ratio)
end
