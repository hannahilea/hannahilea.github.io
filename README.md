# hannahilea.github.io

Personal website; can be viewed at [hannahilea.com](https://hannahilea.com).


### Use template to add new content

Run `julia --startup-file=no add_stuff.jl <ARG>` with arg `blog` or `p5`.

### Convert 

Will be automated (soon); in the meantime, run `julia build-site/run.jl` to convert all block markdown src.md files to index.html files and regenerate both the project and blog indices.
Requires a local installation of [prettier](https://formulae.brew.sh/formula/prettier)
