using Pkg 
Pkg.activate(@__DIR__)
using pandoc_jll

blog_dir = joinpath( @__DIR__, "..", "blog")
blog_template = joinpath(blog_dir, "__template", "index.html.template")

function convert_to_html(file, outfile; template=blog_template, overwrite_existing=false)
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
    
    # TODO: add intental anchors?!?!? to headings
    # text = text.replace(/\shref="#/g, ' class="internal-anchor" href="#');

    # Add specialized classes to links 
    # text = replace(text, " href=\"." =>  " class=\"local\" href=\".");
	text = replace(text, " href=\"https://github.com/hannahilea" =>" class=\"local\" href=\"https://github.com/hannahilea");

    # Add footnotes heading (this is SO GROSS and we're doing 
    # it anyway)
    fnote_predecessor = "role=\"doc-endnotes\">\n    <hr />"
    fnote_heading = """\n<h3 id="footnotes-title">Footnotes</h3>"""
    text = replace(text, fnote_predecessor => fnote_predecessor * fnote_heading)
    return text
end

function generate_all_blogposts(; overwrite_existing=true)
    for dir in readdir(blog_dir; join=true)
        isfile(dir) && continue
        isequal(joinpath(blog_dir, "__template"), dir) && continue
        # contains(dir, "cuttle") || continue
        
        md_file = joinpath(dir, "src.md")
        if !isfile(md_file)
            @warn "Expected blog source file not found: `$(md_file)`; skipping"
            continue
        end
        @info "Converting $(basename(dirname(md_file)))..."
        html_outfile = joinpath(dir, "index.html")
        convert_to_html(md_file, html_outfile; overwrite_existing)
    end
    return nothing
end

generate_all_blogposts(; overwrite_existing=true)
