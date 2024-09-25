# Obsessed with Cuttle: Parametric CAD for prototyping, producing, and procrastinating

One of my primary creative outlets this year has been playing with the CNC laser cutter[^cutters] at my library's makerspace. It is the first  ("computer numerical control", i.e., computer-programmable) shop tool I've gotten comfortable and fluent with: while I've worked informally with plenty of *manual* shop tools for wood and metal, I've never previously bridged that programming/shop divide.[^attempt] Unsurprisingly, it is SO. MUCH. FUN.

[^cutters]: Technically my makerspace has two laser cutters, an [Epilog Zing](LINK) and a [Glowforge](LINK); while I've trained to use both, I prefer the Zing. I'll save the reasoning---and my Zing workflow---for a future write-up.

[^attempt]: I had one aborted attempt many years ago, where I got trained to use a very large (and very cool!) CNC laser cutter for working with sheet metal. Lack of materials, lack of transport for acquiring materials, and lack of initiative for solving either issue proved prohibitive, so I never ended up making anything with it. Now that I feel comfortable with this desktop-sized CNC machine, I feel a lot more empowered (not to mention motivated!) to try the large-format version.

There is a vast and inspiring community of makers in this space, who learn generously by sharing their project designs online. I used some of these pre-existing projects while getting comfortable cutting and engraving with the machine, but quickly realized that I'm happiest when I can make a project my own---whether designing it from scratch, modifying a pre-existing project, or re-implementing an existing design with a toolchain I'm familiar with. 

I don't remember what exact search brought me to [Cuttle.xyz](http://cuttle.xyz)---some combination of "CAD" and "laser cutter" and "web-based", probably---but since I started using it, I haven't so much as thought about switching to a different ecosystem. Cuttle is a web-based "parametric" design tool, with loads of built-in capability and (most excitingly) the ability to program any functionality that it doesn't have, in Javascript. This means that it is both easy for non-programmers to use it, and extensible by folks who need additional custom objects and modifiers. It is a powerful design system with an exceptionally shallow learning curve, a commendable set of tutorials, pre-existing templates, and an active and welcoming [Discord community](TODO) in which its developers participate actively.

Also, I'm now addicted to it.

## How do I CAD thee? Let me count the ways

There are several classes of activity for which I turn to Cuttle; I'll summarize those here, and then document them below:

- **Specific laser cutter projects.** This motivation is the most straight-forward one, and why I started using Cuttle in the first place: I have a set of shapes that I need to be able to cut with the laser cutter, in service of building a physical object. 

    Relevant projects: [decorative bookends](#bookends), [a doorbell chime cover](#a-cover-for-a-set-of-doorbell-chimes), and assorted [calibration tools](#a-handful-of-calibration-tools).

- **Exploration of patterns/shapes/concepts.** This one is a natural result of Cuttle being fun to play with. Now when I see an interesting shape or pattern, I think "hrm, how might program that?" In the act of building it, instead of hard-coding specific dimensions or qualities (number of sides, number of repeats, sizes of angles, etc) I try parameterizing them in different ways. Then, once I have successfully copied the original item, I can play with those parameters to see what other interesting shapes or designs they turn into. Before Cuttle I didn't really do this type of activity, except *maybe* by hand. Now it scratches the dual creativity itches of "constrained problem solving" and "open-ended exploration".

    Relevant projects: [assorted pattern studies](#pattern-studies).

    

- **Prototyping.** This was an unexpected use-case, and one that came about because I had problems I wanted to solve at a point where I was already actively using Cuttle. Instead of turning to other tools (programming languages or independent software apps), I used Cuttle. 

    Relevant projects: [music box punch cards](#punch-cards-for-music-boxes), [weaving cartoon](#weaving-cartoon).



An alternative way to break down my motivations for pulling out Cuttle:
- I need to build A SPECIFIC THING
- I need something vaguely constructive to do to procrastinate on doing something else entirely


## Show, don't tell

Right, so what have I made with it? The following only include projects I've designed myself (or at least, have significantly changed from a cited starting point). I'm not including pre-existing Cuttle templates that I've printed, e.g., [this one](TODO), which makes a particularly fun/extensible gift. 

In no particular order:

### Bookends!

I designed this [set of bookends](https://cuttle.xyz/@hannahilea/Bookends-eBHfPdCNGTIH) was a gift I made, and also an excuse to make an easily-swappable decoration for an otherwise utilitarian object: metal bookends.

This project is a good starting point if you want to make your own bookends with your own decorations---simply swap out the pattern for one of your own!

[TODO: image of result]
[TODO: screenshot of design]

I made the book icon parameterized on FOO, BAR, and FOO; you can see that the bookends each play with that design in a different way---note that the number of pages change for each successive icon row. which I then changed the values of iteratively for the design. The book icon is fun to play with in its own right! 

[TODO-gif]

#### A cover for a set of doorbell chimes!

I designed this [decorative doorbell cover]() for my parents, to replace an original doorbell cover that they didn't care for. I started with a basic [Cuttle box template](TODO), and then added a design on the sides, a decorated front plate, and a cutout on the bottom for the chimes. 

It took me awhile to build this, as I did a lot of angsting about pattern---the only requirement was that the size and chime cutout matched the original. Eventually I got unstuck by building a single little pattern unit and then playing with iteratively adjusting its parameters until I had something I liked.

[TODO-gif]

I ended up printing a bunch of test pieces to see how thin I could get the lines on the decorative cutouts before they were too thin for the laser to handle:

[TODO-test pieces]

#### Punch cards for music boxes!
While this is lightly documented in the [cuttle project itself](TODO), I'm going to be light on details here and save them for a future post. Basically I used a combination of a Julia script and a Cuttle project to generate music box punchcards from MIDI (a symbolic music format), and then cut them out with the laser cutter. This was a decently hefty project that I worked on while in batch at [the Recurse Center](TODO).

[TODO-picture]
[TODO-video]

#### Pattern studies!
TODO

#### A card holder for my nibling's Yoto cards
TODO

Sidebar: are you a parent with a penchant for music curation? Or with friends who like to make playlists? Yoto is super awesome; my niblings love theirs, and I love that I can send them custom mixes. (Do not ask their parents if they love that I can send them custom mixes, seeing as the recent mix was a set of songs from a beloved and HIGHLY repetitive cartoon about trucks). 

#### A handful of calibration tools
Most of these were in support of some other project, either public or non, but they were a good way to explore Cuttle's [repeat modifiers with custom per-repeat transformations](TODO):

 in service of other projects and/or learning how to appropriately tune the laser cutter across different materials.

TODO

#### Weaving cartoon
My mom is a weaver, and asked me to prototype various ways of "blowing up" a floormat that we thought looked cool, to see how it might be 

#### A poem!
TODO
RC intro, etc. It took me awhile to get comfortable calling what I was doing with Cuttle "programming", which in hindsight is ridiculous, but at the time felt bad. Imposter system, amirite? Graphical programming is still programming. ANYWAY. Early in my [batch at the Recurse Center](TODO-new blog post?), [creative coding session](TODO-new blog post creative coding)


#### Discussion

I think taht my overall favorite thing about playing around with Cuttle and the laser cutter is that I've been able to scale my ambitions as I learn more about how to make/use both tools. I'll make a separate post with my current end-to-end workflow, but as far as the Cuttle piece is concerned, FOOO. Something something usual creative skills of programming (iteration, etc), but a different way of thinking about building out a system. (Flag awesome video tutorial on person building out box template) Similar frustrations, similar wins, something something. 

Prototyping: 
Producing:
Procrastinating:

It remains to be seen whether Cuttle is my gateway drug to using the historically professional CAD software. For now, it has met my needs, and I've been able to either design around any software limitations[^limitations] or avoid larger version control reproducibility issues by prototyping only a portion of the system in Cuttle, keeping the non-CAD pieces in a different (and checked in) ecosystem[^vc], and assuming that I'll rebuild the Cuttle piece in a different language if I truly want to make the design more robust and user-friendly. The development team is friendly, supportive, and actively plugging away, and with any luck these limitations are a symptom of early-stage software development (a focus on rapid iteration rather than optimization and long-term exportability/reproducibility). 

The biggest problem with Cuttle is that it is fun. Too fun. And too easy to say "oh, let me just try one more thing..." and then come up for air to find that it is 1am.

[^limitations]: Sometimes large numbers of objects causes my session to choke! Truly the bounds of the project? Maybe my understandings of the abstractions need tweaking? So far not worth asking for help, and easier to just design around and approach in different ways, but the Cuttle Discord is active and supportive, and when I've asked for help their I've gotten it, so until further notice assume that this is not a fundamental limitation of the software!

[^vc]: Lack of incremental and introspectable version control, or at least, import/export serialization that would enable use of external version control systems (i.e., git). 

---
### Footnotes

<footnotes/>

--- 
- created: 2024-09-25
- last updated: 2024-09-25
- tags: project-writeup, cuttle, cad, programming
