mdDir = "."
overwrite_existing = true

# For md file in mdDir 
# TODO - do it!

blog_dir = joinpath( @__DIR__, "..", "blog")
blog_template = joinpath(blog_dir, "__template", "template.html")

function convert_to_html(file, outfile; template=blog_template, overwrite_existing=true) #TODO: set overwrite default
    if !overwrite_existing && isfile(outfile)
        @warn "Output file already exists; not overwriting: $outfile"
        return nothing
    end
    cmd = pipeline(`pandoc --standalone --template $template $file -o $outfile`)
    @info "About to run pandoc" cmd
    run(pipeline(cmd))

    # For now, do a very brittle tuning of properties!
    # In future, turn this into a pandoc plugin 
    str = read(outfile, String)
    str = tweak_html!!(str)
    write(outfile, str)
    return nothing
end

function tweak_html!!(str)
    # Checkboxes are default enabled---disable them (https://github.com/jgm/pandoc/issues/8562)
    str = replace(str, " type=\"checkbox\"" => " disabled type=\"checkbox\"")
    return str
end

filepath = joinpath(blog_dir, "make-a-list", "src.md")
outfile = replace(filepath, "src.md" => "orig.html")
convert_to_html(filepath, outfile)


# Update from-markdown retroactively
