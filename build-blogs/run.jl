using Pkg
Pkg.activate(@__DIR__)
using pandoc_jll
using Dates

blog_dir = joinpath(@__DIR__, "..", "blog")
blog_template = joinpath(blog_dir, "__template", "blog.html.template")
blog_index_template = joinpath(blog_dir, "__template", "index.html.template")

function convert_to_html(file, outfile; template=blog_template,
                         overwrite_existing=false,)
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end
    cmd = pipeline(`$(pandoc_jll.pandoc()) --template $template $file -o $outfile`)
    @debug "About to run pandoc" cmd
    run(pipeline(cmd))

    # For now, do a very brittle tuning of properties!
    # In future, turn this into a pandoc plugin 
    str = read(outfile, String)
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
    return join(lines, "\n")
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
    return (; url=basename(md_file),)
end

function generate_all_blogposts(; overwrite_existing=true)
    for dir in readdir(blog_dir; join=true)
        isfile(dir) && continue
        isequal(joinpath(blog_dir, "__template"), dir) && continue
        # contains(dir, "list") || continue

        md_file = joinpath(dir, "src.md")
        generate_blog_html(md_file; overwrite_existing)
    end
    return nothing
end

function get_blog_metadata(md_file)
    date_str = "2024-10-18"
    date_pretty = Dates.format(Date(date_str), dateformat"d u yyyy")
    return (; date_str, date_pretty, title="BAR", md_file)
end

function generate_blog_index(; overwrite_existing=false, template=blog_index_template)
    outfile = joinpath(blog_dir, "index.html")
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end

    metadata = []
    for dir in readdir(blog_dir; join=true)
        isfile(dir) && continue
        isequal(joinpath(blog_dir, "__template"), dir) && continue

        md_file = joinpath(dir, "src.md")
        m = get_blog_metadata(md_file)
        push!(metadata, (; url="./" * basename(dir), m...))
    end

    blog_strs = map(metadata) do m
        return """<li><strong class="blog-date">$(m.date_pretty)</strong> <a class="blog-url" href="$(m.url)">$(m.title)</a></li>"""
    end

    str = read(template, String)
    str = replace(str, "<!-- POSTS -->" => join(blog_strs, "\n"))
    write(outfile, str)

    @info "...and formatting it"
    try
        run(`prettier $(outfile) --write --print-width 240`)
    catch
        @warn "Prettier not installed OR current html errors"
    end

    return nothing
end

# Run from commandline? 
if abspath(PROGRAM_FILE) == @__FILE__
    if isempty(ARGS)
        # generate_all_blogposts(; overwrite_existing=true)
        generate_blog_index(; overwrite_existing=true)
    elseif isfile(ARGS[1])
        generate_blog_html(ARGS[1]; overwrite_existing=true)
        generate_blog_index(; overwrite_existing=true)
    else
        @warn "Unknown argument $(ARGS[1])"
    end
    return nothing
end
