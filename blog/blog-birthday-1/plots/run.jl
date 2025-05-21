using Dates
using YAML
using WordCloud
using Images
using CairoMakie
using CairoMakie: Axis

const ASSET_DIR = joinpath(@__DIR__, "..", "assets")
const SITE_ROOT = joinpath(@__DIR__, "..", "..", "..")
const BLOG_DIR = joinpath(SITE_ROOT, "blog")

function process_md(path)
    yaml_dict = YAML.load_file(path)
    date = yaml_dict["created"]
    date_pretty = let
        Dates.format(Date(string(date)), dateformat"d u yyyy")
    end

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
    return (; contents, date, date_pretty, name=basename(dirname(path)))
end

# 1. Collect all the metadata from each markdown post 
src_files = filter!(isfile, joinpath.(readdir(BLOG_DIR; join=true), "src.md"))
md_files = map(process_md, src_files)

# 2. Create a word cloud for each post 
function wordcloud_from_post(text, id; asset_dir=ASSET_DIR)
    # words = lowercase.(text)
    words = text

    # stopwords_extra = ["↩︎"]

    # See https://github.com/guo-yong-zhi/WordCloud-Gallery/blob/main/README.md 
    # for styling options
    wc = paintcloud(words;
                    mask=shape(box, 500, 400; cornerradius=2),
                    masksize=:original,
                    colors=["#000080"],
                    backgroundcolor="linen",
                    angles=(0, 45, 90),
                    fonts=["Tahoma"],
                    stopwords_extra,
                    density=0.7,
                    maxnum=500)
    # display(wc)
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
# nice. so do the dumb thing.
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
         strokewidth=.5,
         strokecolor=:white,
         width=3,
         color="#000080",);
# f
save(joinpath(ASSET_DIR, "timeline.png"), f)


# 4. Make some more plots!
