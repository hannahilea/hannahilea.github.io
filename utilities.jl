const NEW_PROJ_COMMENT = "<!-- Add new project here -->"

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
        projects_file = "projects.html"
        new_blob = """\n        <li><a href="./projects/$(dir_name)">\n            <h3>$(project_name)</h3>\n          </a>\n          <p>TODO-description</p>\n        </li>"""
        str = read(projects_file, String)
        i = findfirst(NEW_PROJ_COMMENT, file)
        isnothing(i) && throw(ArgumentError("Oh no, $(NEW_PROJ_COMMENT) not found in projects.html!"))
        str = str[1:last(i)] * new_blob * str[last(i)+1:end]
        write(projects_file, str)
    end
    @info "Do ctrl+f TODO to find regions to update for newly added project!"
end
