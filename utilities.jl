using Pkg
Pkg.activate(; temp=true)
Pkg.add("Dates")
using Dates

const NEW_PROJ_COMMENT = "<!-- Add new project here -->"
const NEW_BLOG_COMMENT = "<!-- Add new post here -->"

# Some quick and brittle Julia utilities for adding new projects
# Doesn't handle nested, only does new js projects
# Will fail if dir already exists
# Future: functions to add different types of projects
# Future: validate git state isn't dirty before starting
function new_js_project()
    project_name = lstrip(rstrip(Base.prompt("Enter project name: ")))
    dir_name = lstrip(rstrip(Base.prompt("Enter project url name: ")))
    dir = joinpath("projects", dir_name)

    @info "Creating new project directory" project_name dir_name
    cp(joinpath("projects", "__template"), dir)
    for file in readdir(dir; join=true)
        @info "Updating $file..."
        str = read(file, String)
        str = replace(str, "{{ PROJECT_NAME }}" => project_name)
        str = replace(str, "{{ DIR_NAME }}" => dir_name)
        write(file, str)
    end

    @info "Adding new project to project index"
    let
        index_path = joinpath("projects", "index.html")
        new_blob = """\n        <li><a href="./projects/$(dir_name)">\n            <h3>$(project_name)</h3>\n          </a>\n          <p>TODO-description</p>\n        </li>"""
        str = read(index_path, String)
        i = findfirst(NEW_PROJ_COMMENT, file)
        isnothing(i) && throw(ArgumentError("Oh no, $(NEW_PROJ_COMMENT) not found in $(index_path)"))
        str = str[1:last(i)] * new_blob * str[last(i)+1:end]
        write(index_path, str)
    end
    @info "Do ctrl+f TODO to find regions to update for newly added project!"
end

function new_blog_post()
    blog_title = lstrip(rstrip(Base.prompt("Enter blog post title")))

    dir_name = let 
        default=replace(lowercase(blog_title), " " => "-")
        lstrip(rstrip(Base.prompt("Enter blog dir name: "; default)))
    end
    
    dir = joinpath("blog", dir_name)
    date = today()
    date_pretty = Dates.format(today(), dateformat"d U yyyy")

    @info "Creating new blog directory" blog_title dir_name
    cp(joinpath("blog", "__template"), dir)
    for file in readdir(dir; join=true)
        @info "Updating $file..."
        str = read(file, String)
        str = replace(str, "{{ BLOG_TITLE }}" => blog_title)
        str = replace(str, "{{ DATE }}" => date)
        str = replace(str, "{{ BLOG_DIR }}" => dir_name)
        write(file, str)
    end

    @info "Adding new project to blog index"
    let
        index_path = joinpath("blog", "index.html")
        new_blob = """\n        <li>$(date_pretty): <a href="./$(dir_name)">$(blog_title)</a>
                          <p><em>In which TODO.</em></p>
                      </li>"""
        str = read(index_path, String)
        i = findfirst(NEW_BLOG_COMMENT, str)
        isnothing(i) && throw(ArgumentError("Oh no, $(NEW_BLOG_COMMENT) not found in $(index_path)"))
        str = str[1:last(i)] * new_blob * str[last(i)+1:end]
        write(index_path, str)
    end

    #TODO-future: also add to rss feed 
    @info "Do ctrl+f TODO to find regions to update for newly added project!"
end

