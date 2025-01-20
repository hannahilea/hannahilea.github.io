using Pkg
Pkg.activate(@__DIR__)
using pandoc_jll
using Dates
using YAML

const BLOG_DIR = joinpath(@__DIR__, "..", "blog")
const BLOG_TEMPLATE = joinpath(BLOG_DIR, "__template", "blog.template.html")
const BLOG_INDEX_TEMPLATE = joinpath(BLOG_DIR, "__template", "index.template.html")

const PROJECT_DIR = joinpath(@__DIR__, "..", "projects")
const PROJECT_INDEX_TEMPLATE = joinpath(PROJECT_DIR, "__template", "index.template.html")

const RSS_FILE = joinpath(@__DIR__, "..", "rss.xml")
const RSS_TEMPLATE = joinpath(BLOG_DIR, "__template", "rss.template.xml")

get_warning(file)  = "<!--Auto-generated! Make changes in $(basename(file)), not this file-->\n"

function convert_to_html(file, outfile; template=BLOG_TEMPLATE, overwrite_existing=false)
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end
    cmd = pipeline(`$(pandoc_jll.pandoc()) --template $template -o $outfile --highlight-style tango $file `)
    @debug "About to run pandoc" cmd
    run(pipeline(cmd))

    # Get date and format it 
    date_pretty = let
        yaml_dict = YAML.load_file(file)
        str = string(yaml_dict["created"])
        Dates.format(Date(str), dateformat"d u yyyy")
    end

    # For now, do a very brittle tuning of properties!
    # In future, turn this into a pandoc plugin 
    str = read(outfile, String)
    str = replace(str, "{{ BLOG_DIR }}" => basename(dirname(file)))
    str = replace(str, "{{ BLOG_DATE }}" => date_pretty)
    str = tweak_html!!(str)
    write(outfile, str)

    return nothing
end

function tweak_html!!(text)
    # Checkboxes are default enabled---disable them (https://github.com/jgm/pandoc/issues/8562)
    text = replace(text, " type=\"checkbox\"" => " disabled type=\"checkbox\"")

    # Add footnotes heading (this is SO GROSS and we're doing it anyway)
    fnote_predecessor = "role=\"doc-endnotes\">\n<hr />"
    fnote_heading = """\n<h3 id="footnotes-title">Footnotes</h3>"""
    text = replace(text, fnote_predecessor => fnote_predecessor * fnote_heading)

    # the formatter will yell otherwise...
    text = replace(text, "</br>" => "<br>")

    # Strip out image captions 
    # This is...a truly hacky approach. ¯\_(ツ)_/¯
    in_caption = false
    str_start = "<figcaption aria-hidden=\"true\">"
    str_stop = "</figcaption>"
    lines = map(split(text, "\n")) do line
        # Making some real assumptions that there'll never be multiple of these in one line
        # ...but if there are, we'll see it in git, so it'll still be okay

        # Single line contains both start and stop
        if !in_caption && contains(line, str_start) && contains(line, str_stop)
            line = split(line, str_start; limit=2)[1]
            return split(line, str_stop; limit=2)[end]
        end

        # Multiline caption
        if in_caption && contains(line, str_stop)
            in_caption = false
            return split(line, str_stop; limit=2)[end]
        end
        in_caption && return missing
        if contains(line, str_start)
            in_caption = true
            line = split(line, str_start; limit=2)[1]
        end
        return line
    end
    lines = filter(!ismissing, lines)
    all_text = join(lines, "\n")

    # linking to an external page (i.e., not within the site)? open in a new tab 
    words = split(all_text, " ")
    phrases = map(words) do word 
        contains(word, "href=") || return word
        contains(word, "href=\"#") && return word
        contains(word, "href=\"https://www.hannahilea.com") && return word
        contains(word, "href=\".") && return word
        str = "target=\"_blank\" rel=\"noreferrer noopener\""
        return replace(word, "href="=> "$str href=")
    end
    return join(phrases, " ")
end

function generate_blog_html(md_file; overwrite_existing=true)
    if !isfile(md_file)
        @warn "Expected blog source file not found: `$(md_file)`; skipping"
        return nothing
    end

    @info "Converting $(basename(dirname(md_file)))..."
    html_outfile = replace(md_file, "src.md" => "index.html")
    convert_to_html(md_file, html_outfile; overwrite_existing)

    @info "...and formatting it"
    try
        run(`prettier $(html_outfile) --write --print-width 240`)
    catch
        @warn "Prettier not installed OR current html errors"
    end
    return nothing
end

function generate_all_blogposts(; overwrite_existing=true)
    for dir in readdir(BLOG_DIR; join=true)
        isfile(dir) && continue
        isequal(joinpath(BLOG_DIR, "__template"), dir) && continue
        # contains(dir, "list") || continue

        md_file = joinpath(dir, "src.md")
        generate_blog_html(md_file; overwrite_existing)
    end
    return nothing
end

function get_blog_metadata(md_file) 
    yaml_dict = YAML.load_file(md_file)
    yaml_dict["tags"] = join(yaml_dict["tags"], ",")
    yaml_dict["date_str"] = string(yaml_dict["created"])
    yaml_dict["rawtitle"] = haskey(yaml_dict, "rawtitle") ? yaml_dict["rawtitle"] : yaml_dict["title"]
    return NamedTuple(Symbol(k) => v for (k,v) in yaml_dict)
end

function generate_blog_index(; overwrite_existing=false, template=BLOG_INDEX_TEMPLATE)
    outfile = joinpath(BLOG_DIR, "index.html")
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end

    @info "Generating blog index..."
    metadata = get_all_blog_metadata()
    blog_strs = map(metadata) do m
        date_pretty = Dates.format(Date(m.date_str), dateformat"d u yyyy")
        tags = "#" * replace(m.tags, "," => " #")

        return """
        <tr>
            <td class="date date-pretty">$(date_pretty)</td>
            <td class="date-raw" hidden>$(m.date_str)</td>
            <td class="title-raw" hidden>$(m.title)</td>
            <td class="title">
                <a class="blog-url" href="$(m.url)">$(m.title)</a>

            </td>
          </tr>
          """
    end

    str = read(template, String)
    str = replace(str, "<!-- POSTS -->" => join(blog_strs, "\n"))
    str = get_warning(template) * str
    write(outfile, str)

    try
        run(`prettier $(outfile) --write --print-width 360`)
    catch
        @warn "Prettier not installed OR current html errors"
    end

    return nothing
end

function get_all_blog_metadata()
    metadata = []
    for dir in readdir(BLOG_DIR; join=true)
        isfile(dir) && continue
        isequal(joinpath(BLOG_DIR, "__template"), dir) && continue

        md_file = joinpath(dir, "src.md")
        m = get_blog_metadata(md_file)
        push!(metadata, (; url="./" * basename(dir), dir=basename(dir), m...))
    end
    metadata = sort(metadata; by=(m) -> m.date_str, rev=true)
    return metadata
end

function generate_rss_feed(; overwrite_existing=false, template=RSS_TEMPLATE)
    outfile = RSS_FILE
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end

    @info "Generating RSS feed..."
    metadata = get_all_blog_metadata()
    blog_strs = map(reverse(metadata)) do m
        return """    <item>
                  <title>$(m.rawtitle)</title>
                  <pubDate>$(m.published)</pubDate>
                  <link>https://hannahilea.com/blog/$(basename(m.url))</link>
                  <guid>https://hannahilea.com/blog/$(basename(m.url))</guid>
                  <description>$(m.description)</description>
                </item>
            """
    end

    str = read(template, String)
    str = replace(str, "<!-- POSTS -->" => join(blog_strs, ""))
    write(outfile, str)
    return nothing
end

function generate_project_index(; overwrite_existing=false, template=PROJECT_INDEX_TEMPLATE)
    input_data = joinpath(PROJECT_DIR, "project-list.yaml")
    outfile = joinpath(PROJECT_DIR, "index.html")
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end
    index_str = read(template, String)

    @info "Generating project index..."
    all_projects = YAML.load_file(input_data)

    is_present = x -> !(isnothing(x) || isempty(x))

    for key in keys(all_projects)
        proj_strs = map(all_projects[key]) do p
            url = get(p, "url", "")
            name = get(p, "project", "")
            description = get(p, "description", "")
            blog_str = get(p, "blogs", "")
            tag_str = get(p, "tags", "")
            thumbnail_url = get(p, "thumbnail_url", "")

            url_prefix = is_present(url) ? "<a class=\"project-url\" href=\"$(url)\">" :
                         "<strong>"
            url_suffix = is_present(url) ? "</a>" : "</strong>"

            thumbnail_str = is_present(thumbnail_url) ?
                            """$(url_prefix)<img class="thumbnail" src="$(thumbnail_url)"/>$(url_suffix)""" :
                            ""

            details_str = is_present(description) ? """
                          <p class="blog-tags">$(description) 
                          $(tag_str)
                          $(blog_str)</p>
                          """ : ""

            return """
            <tr>
                <td class="year date">$(get(p, "year", ""))</td>
                <td class="title">
                    $(url_prefix)$name$(url_suffix)
                    <div class="details">
                        $(thumbnail_str)
                        $(details_str)
                    </div>
                </td>
            </tr>
            """
        end
        index_str = replace(index_str, "<!-- POSTS-$key -->" => join(proj_strs, "\n"))
    end
    write(outfile, index_str)

    try
        run(`prettier $(outfile) --write --print-width 360`)
    catch
        @warn "Prettier not installed OR current html errors"
    end

    return nothing
end

# Run from commandline? 
if abspath(PROGRAM_FILE) == @__FILE__
    if isempty(ARGS)
        generate_all_blogposts(; overwrite_existing=true)
        generate_blog_index(; overwrite_existing=true)
        generate_rss_feed(; overwrite_existing=true)
    elseif isfile(ARGS[1]) && endswith(ARGS[1], ".md")
        generate_blog_html(ARGS[1]; overwrite_existing=true)
        generate_blog_index(; overwrite_existing=true)
        generate_rss_feed(; overwrite_existing=true)
    elseif isfile(ARGS[1]) || isequal(ARGS[1], "projects")
        generate_project_index(; overwrite_existing=true)
    else
        @warn "Unknown/unsupported arguments"
    end
    @info "Complete"
    return nothing
end
