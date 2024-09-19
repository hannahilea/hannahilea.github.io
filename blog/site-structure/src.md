# This website's structure: a meta post

While doing a batch at the <a class="impersonal" href="https://www.recurse.com">Recurse Center</a>, I revived my personal website—the very site you are almost certainly looking at Right Now!

![surprise-pikachu](/assets/img/emojis/surprise-pikachu.png)

## Motivation

I had two goals for this site at the outset:
1. **Be trivially easy to set up**, so that my focus could be on "building new stuff" rather than "building, styling, and maintaining a website" and
2. **Be trivially easy to update**, so that I can reduce the friction of sharing projects and (in theory!) get out of my own way to actually share them.

In service of 1, I was hoping to avoid using templating engines, but was prepared to use one if it was the fastest way to achieve my two goals. (My limited experience with templating engines in the past has been a bit frustrating, in that I spend more time trying to understand and work within/around their confines than I spend working on the content of said site.)

I asked a bunch of questions of my Recurse batchmates, and got a lot of good advice from folks with web expertise (have I mentioned that I do not have web expertise? I myself do not have web expertise!), and was gratified that their advice boiled down to "just do it in vanilla html/js", plus some pointers to reading material/examples/etc. So that's what I did!

Now that I've been working with it and adding projects to it for a few months, the structure seems static enough to be worth sharing. If you are a person who, like me, has cursory web experience and similar goals for website creation, perhaps this documentation will help you set up your own site.

## Structure

The structure is pretty basic:
```
.
├── README.md
├── add_stuff.jl
├── blog
│   ├── __template
│   ├── index.html
│   ├── <blog-1>
│   ├── ...
│   └── <blog-n>
├── index.html
└── projects
    ├── __template
    ├── index.html
    ├── <project-1>
    ├── ...
    └── <project-n>
```
There are also some top-level style folders that I've excluded here, as they will likely be reshuffled at some point. (Want to see the full source? You're [in luck](https://github.com/hannahilea/hannahilea.github.io/).)

### Blog subdirectories

The structure of each blog subdirectory `<blog-n>` is
```
.
├── index.html
└── src.md
```
`src.md` contains the full content of a blogpost, written in markdown. `index.html` is identical across blog posts and contains no specialized content; it exists simply to contain the results of converting `src.md` to html, which is performed with the <a class="impersonal" href="https://md-block.verou.me/">`md-block.js`</a> library.

Why this approach? Writing markdown feels much more natural to me than writing html, and even though I have to include the same boilerplate html file in every blog post directory, it is mentally cheaper than switching the whole site over to a templating engine that generates the whole site from a set of markdown files. (It is also cheaper than writing my own markdown-to-html converter, however tempting that was...)

### Project subdirectories

The structure of each project subdirectory `<project-n>` depends on the type of project, as many projects are not hosted directly on the site at all: some link out to external repositories or sites, etc.

That said, for a common type of project that I've been building lately, namely, self-contained creative coding sketches, the structure looks like:
```
.
├── index.html
└── sketch.js
```
where the index contains no little specialized content except a description of the project, and the content of the sketch lives in `sketch.js`.

This structure has made it trivially easy to transfer javascript sketches to this site from sandbox environments like the <a class="impersonal" href="https://editor.p5js.org/">p5.js</a> editor.

## Site hosting and deployment

I build, host, and deploy the site using <a class="impersonal" href="https://pages.github.com/">GitHub Pages</a>. Thanks, GitHub! You can look at the [GitHub Action](https://github.com/hannahilea/hannahilea.github.io/blob/main/.github/workflows/static.yml) I use to deploy, but there is nothing custom or personal about it.

## Adding new content

You might be thinking, well, if the blog and project subdirectories all have similar structures, it would probably be easy to auto-setup new blog posts and/or projects. And you would be correct! (That was, in fact, one of the reasons I did it this way. :))

The top-level [`add_stuff.jl`](https://github.com/hannahilea/hannahilea.github.io/blob/main/add_stuff.jl) file is a commandline Julia script that (1) generates a new subdirectory, based on files in the corresponding `__template` subdirectory; (2) adds it to the relevant list in the corresponding project/blog index.html; and (3) (in the case of blogs) adds it to the rss feed. (Okay, this last item isn't actually implemented yet, but it will be shortly.)

Setting up the script and templates was relatively easy, and has made adding new content to the site downright delightful. ("Delight" may be a strong word, but the less overhead and wordsmithing I have to deal with in order to post content to my site, the more likely that said content will get posted at all...)

Why is the script in Julia? Because I like Julia, and I find it easy to read/write.

## That's all, folks!

The structure of this site has evolved slightly since I first set it up, and may evolve further, but for now I'm in a state where both goals (trivially easy to set up, trivially easy to update) are met, as evinced by the fact that I have fairly consistently added [projects](../../projects) to the site as I've built them! 🎉 Will this site structure work out longer-term? Time will tell! But at least it exists (!) publicly (!!) right now (!!!).

As I borrowed (with permission!) when first assembling this site, please feel free to borrow from me. It doesn't seem worthwhile to turn the whole site into a template itself (yet?!), but I could be convinced otherwise if you reach out to let me know that you're interested.

And finally if you, erstwhile reader, are a Web Person™ who thinks I've made an egregious error in approach or wants to propose some additional tweaks/improvements, do let me know!

***Thanks to <a class="impersonal" href="https://teresaibarra.com">Teresa Ibarra</a>, whose site (and assistance!) I used as an initial starting point.***

---
- created: 2024-05-17
- last updated: 2024-05-17
- tags: project-writeup, webdev, programming, metawriting
