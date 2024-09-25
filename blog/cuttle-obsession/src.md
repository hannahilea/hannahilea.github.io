# Obsessed with Cuttle: Parametric CAD for prototyping, producing, and procrastinating

One of my primary creative outlets this year has been playing with the CNC laser cutter[^cutters] at my library's makerspace. It is the first  ("computer numerical control", i.e., computer-programmable) shop tool I've gotten comfortable and fluent with: while I've worked informally with plenty of *manual* shop tools for wood and metal, I've never previously bridged that programming/shop divide.[^attempt] Unsurprisingly, it is SO. MUCH. FUN.

[^cutters]: Technically my makerspace has two laser cutters, an [Epilog Zing](https://www.epiloglaser.com/laser-machines/legacy-systems/zing-16-24/) and a [Glowforge](https://glowforge.com/); while I've trained to use both, I prefer the Zing. I'll save the reasoning---and my Zing workflow---for a future write-up. Both are great, though, for different reasons. 

[^attempt]: I had one aborted attempt many years ago, where I got trained to use a very large (and very cool!) CNC laser cutter for working with sheet metal. Lack of materials, lack of transport for acquiring materials, and lack of initiative for solving either issue proved prohibitive, so I never ended up making anything with it. Now that I feel comfortable with this desktop-sized CNC machine, I feel a lot more empowered (not to mention motivated!) to try the large-format version.

There is a vast and inspiring community of makers in this space, who learn generously by sharing their project designs online. I used some of these pre-existing projects while getting comfortable cutting and engraving with the machine, but quickly realized that I'm happiest when I can make a project my own---whether designing it from scratch, modifying a pre-existing project, or re-implementing an existing design with a toolchain I'm familiar with. 

I don't remember what exact search brought me to [Cuttle.xyz](http://cuttle.xyz)---some combination of "CAD" and "laser cutter" and "web-based", probably---but since I started using it, I haven't so much as thought about switching to a different ecosystem. Cuttle is a web-based "parametric" design tool, with loads of built-in capability and (most excitingly) the ability to program any functionality that it doesn't have, in Javascript. This means that it is both easy for non-programmers to use it, and extensible by folks who need additional custom objects and modifiers. It is a powerful design system with an exceptionally shallow learning curve, a commendable set of tutorials, pre-existing templates, and an active and welcoming [Discord community](TODO) in which its developers participate actively.

Also, I'm now addicted to it.

## How do I CAD thee? Let me count the ways

There are several classes of activity for which I turn to Cuttle; I'll summarize those here, and then document them below:

- **Creation of physical laser-cutter objects.** This motivation is the most straight-forward one, and why I started using Cuttle in the first place: I have a set of shapes that I need to be able to cut with the laser cutter, in service of building a physical object. 

    Examples: [decorative bookends](#bookends), [a doorbell chime cover](#a-cover-for-a-set-of-doorbell-chimes), and assorted [calibration tools](#a-handful-of-calibration-tools).

- **Exploration of arbitrary patterns/shapes/concepts.** This one is a natural result of Cuttle being fun to play with. When I see an interesting shape or pattern, I now think "hrm, how might I construct that?" And then I give it a try. Notably, instead of hard-coding specific dimensions or qualities of the item (number of sides, number of repeats, sizes of angles, etc) I parameterize them in different ways: instead of making a 6-sized shape, I'll make an `n`-sided shape and set `n` as a Cuttle variable. Then, once I have successfully completed the original item, I can play with those parameters to see what other interesting shapes or designs fall out.
    
    This motivation is the one I use to "let" myself procrastinate. I *could* respond to that email...or I could see how quickly I can implement a basic [Moiré pattern](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern). ¯\\\_(ツ)\_/¯ Before Cuttle I didn't really do this type of activity, except *maybe* by hand. Now it scratches the dual creativity itches of "constrained problem solving" followed by "open-ended exploration and search for visually interesting outcomes".

    Examples: [assorted pattern studies](#pattern-studies), [poem](#a-poem).

- **Prototyping.** This was an unexpected use-case, and one that came about because I had problems I wanted to solve at a point where I was already actively using Cuttle. Instead of turning to other programming languages or software apps, I used Cuttle as a first-pass "try it out and see what works" approach. If/when I move on to next drafts for these, Cuttle would not be the best tool---but for an environment that lets me accomplish what I need to accomplish and gets out of my way while I do it, my needs have been met.

    Examples: [music box punch cards](#punch-cards-for-music-boxes), [weaving cartoon](#weaving-cartoon).

## Show, don't tell?

The following is an un-ordered selection of projects I've designed myself (or at least, have significantly modified from someone else's initial design). I'm not including pre-existing Cuttle templates that I've printed-but-not-altered, although those are also fun.[^gift]

[^gift]: E.g., this [mini Crankie](https://cuttle.xyz/@cuttle/Crankie-Moving-Panorama-8fpsa2kxvOgg), which makes a particularly fun/customizable gift. 

In no particular order:

### Bookends

*Play with the project [here](https://cuttle.xyz/@hannahilea/Bookends-eBHfPdCNGTIH)!*

[TODO: image of result]

There are two pieces I'm especially proud of here:
1. The original design of "decorative faceplate designed to attach (with magnets) to cheap metal bookends, including correctly managing registration (i.e., alignment of the piece) during printing to engrave both front and back.
2. The specific book icon I designed to decorate the faceplates. The book icon parameterized on FOO, BAR, and FOO; you can see that the bookends each play with that design in a different way---note that the number of pages change for each successive icon row. which I then changed the values of iteratively for the design. The book icon is fun to play with in its own right! 

[TODO-gif of parameterized design]

### Doorbell chime cover

*Play with the project [here](TODO)!*

[TODO: image of result]

I designed this [decorative doorbell cover](TODO) for my parents, to replace an original doorbell cover that they didn't care for. I started from a basic [Cuttle box template](TODO), and then added a design to the sides, a decorated front plate, and a cutout on the bottom for the chimes. 

It took me awhile to build this, as I did a lot of angsting over how to decorate it---the only project requirement was that the size and bottom cutout matched the original, so that it would fit. Eventually I got unstuck by building a single little snowflake pattern unit and then playing around with with repeating and incrementally scaling a couple parameters until it felt visually pleasing.

[TODO-gif]

I also ended up printing a bunch of test pieces to see how thin I could get the lines on the decorative cutouts before they were too thin for the laser to handle:

[TODO-test pieces]

### Punch cards for music boxes!

*Play with the project [here](TODO)!*

[TODO: image of result]

This was a project I've wanted to do for a long time: automatically generate music rolls that can be played on a mechanical music box. I'm planning to document this project in its own write-up, so am intentionally skimping on details here, but there is already sparse write-up in [the Cuttle project itself](TODO).

These music box rolls are an example of using Cuttle to prototype: rather than building out an end-to-end MIDI->SVG pipeline (`midi2svg`!), I instead converted MIDI to note index coordinates in an external Julia script, and then plugged the output coordinates of that script into a Cuttle template. This allowed me to spend my development time easily tweaking print parameters (hole spacing, metadata engraving, roll pagination, etc) with immediate visual feedback. When (if?) I turn it into an end-to-end system in the future, I won't include Cuttle in the pipeline, and I knew that from the start, but it still made the development process easier and faster for me than I would have been without it.


### Card display for a truck-loving kid

*Play with the project [here](TODO)!*

[TODO: image of result]

My young niblings have a [Yoto](TODO) player, along with a collection of various story and music cards. (A Yoto player is a small portable music box for kids; specific playlists are triggered by inserting a corresponding card.) I like making and sending mixes to them, so made this card holder so they could see their entire library.[^remember] While I CADed this myself, I modeled it off of card holders I saw elsewhere on the internet, parameterized to be customizable to the size of a card collection. The piece that I was most excited about here was the color---I cut it from Glowforge Draftboard (a proprietary medium-density fiberboard material), painted it with watercolor paint (!), and then sealed it. The piece the recipient was most excited about was that the truck design was one that he specifically likes to color in, when printed at a larger size. 

[^remember]: "...and remember that music other than *Helper Cars* exists," I thought, to no avail! 

Sidebar: are you a parent with a penchant for music curation or friends who would like to share music with your kids? Yoto is super awesome; my niblings love theirs, and I love that I can send them custom mixes. (Do not ask their parents if they love that I can send them custom mixes, seeing as the recent mix was a set of songs from a beloved and HIGHLY repetitive cartoon about trucks). 

### A handful of calibration tools

*Play with the calibrators [here](TODO)/[here](TODO)/[here](TODO)!*

[TODO: images of result]

Most of these were in support of some other project, either public or non, learning how to appropriately tune the laser cutter across different materials. They were also a good way to explore Cuttle's [repeat modifiers with custom per-repeat transformations](TODO) functionality.

### Weaving cartoon

*Play with the project [here](TODO)!*

[TODO: image of result]
TODO-description

My mom is a weaver, and asked me to prototype various ways of "blowing up" a floormat that we thought looked cool, to see how it might be 


### Pattern studies!

*Play with the project [here](TODO)!*

[TODO: image of result]
TODO-description

### A poem!

*Play with the project [here](TODO)!*

[TODO: image of result]
TODO-description

Last but not least. 
RC intro, etc. It took me awhile to get comfortable calling what I was doing with Cuttle "programming", which in hindsight is ridiculous, but at the time felt bad. Imposter system, amirite? Graphical programming is still programming. ANYWAY. Early in my [batch at the Recurse Center](TODO-new blog post?), [creative coding session](TODO-new blog post creative coding)

## Discussion

My overall favorite thing about playing around with Cuttle and the laser cutter both, is that I've been able to scale my ambitions as I learn more about how to make and use both tools. I'll save my current end-to-end workflow for a future post, but as far as the Cuttle piece is concerned, FOOO. 


Something something usual creative skills of programming (iteration, etc), but a different way of thinking about building out a system. (Flag awesome video tutorial on person building out box template) Similar frustrations, similar wins, something something. 

It remains to be seen whether Cuttle is my gateway drug to using the historically professional CAD software. For now, it has met my needs, and I've been able to either design around any software limitations[^limitations] or avoid larger version control reproducibility issues by prototyping only a portion of the system in Cuttle, keeping the non-CAD pieces in a different (and checked in) ecosystem[^vc], and assuming that I'll rebuild the Cuttle piece in a different language if I truly want to make the design more robust and user-friendly. The development team is friendly, supportive, and actively plugging away, and with any luck these limitations are a symptom of early-stage software development (a focus on rapid iteration rather than optimization and long-term exportability/reproducibility). 

The biggest problem with Cuttle is that it is fun. Too fun. Too easy to say "oh, let me just try one more thing..." and then come up for air to find that it is 1am. 🙃

[^limitations]: Sometimes large numbers of objects causes my session to choke! Truly the bounds of the project? Maybe my understandings of the abstractions need tweaking? So far not worth asking for help, and easier to just design around and approach in different ways, but the Cuttle Discord is active and supportive, and when I've asked for help their I've gotten it, so until further notice assume that this is not a fundamental limitation of the software!

[^vc]: Lack of incremental and introspectable version control, or at least, import/export serialization that would enable use of external version control systems (i.e., git). 

---
### Footnotes

<footnotes/>

--- 
- created: 2024-09-25
- last updated: 2024-09-25
- tags: project-writeup, cuttle, cad, programming, prototyping, javascript, creative-coding, makerspace
