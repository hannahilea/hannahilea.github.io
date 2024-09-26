# Obsessed with Cuttle: Parametric CAD for prototyping, producing, and procrastinating

One of my primary creative outlets this year has been playing with the CNC laser cutter[^cutters] at my library's makerspace. It is the first CNC ("computer numerical control", i.e., computer-programmable) shop tool I've gotten comfortable and fluent with: while I've worked informally with plenty of *manual* shop tools for wood and metal, I've never previously bridged that programming/shop divide.[^attempt] Unsurprisingly, it is SO. MUCH. FUN.

[^cutters]: Technically my makerspace has two laser cutters, an [Epilog Zing](https://www.epiloglaser.com/laser-machines/legacy-systems/zing-16-24/) and a [Glowforge](https://glowforge.com/); while I've trained to use both, I prefer the Zing. I'll save the reasoning---and my Zing workflow---for a future write-up. Both are great, though, for different reasons. 

[^attempt]: I had one aborted attempt many years ago, where I got trained to use a very large (and very cool!) CNC laser cutter for working with sheet metal. Lack of materials, lack of transport for acquiring materials, and lack of initiative for solving either issue proved prohibitive, so I never ended up making anything with it. Now that I feel comfortable with this desktop-sized CNC machine, I feel a lot more empowered (not to mention motivated!) to try the large-format version.

There is a vast and inspiring community of makers in this space, who learn generously by sharing their project designs online. I used some of these pre-existing projects while getting comfortable cutting and engraving with the machine, but quickly realized that I'm happiest when I can make a project my own---whether designing it from scratch, modifying a pre-existing project, or re-implementing an existing design with a toolchain I'm familiar with. 

I don't remember what exact search brought me to [Cuttle.xyz](http://cuttle.xyz)---some combination of "CAD" and "laser cutter" and "web-based", probably---but since I started using it, I haven't so much as thought about switching to a different ecosystem. Cuttle is a web-based "parametric" design tool, with loads of built-in capability and (most excitingly) the ability to program any functionality that it doesn't have, in Javascript. This means that it is both easy for non-programmers to use it, and extensible by folks who need additional custom objects and modifiers. It is a powerful design system with an exceptionally shallow learning curve, a commendable set of tutorials, pre-existing templates, and an active and welcoming Discord community in which its developers participate actively.

Also, I'm now addicted to it.

## How do I CAD thee? Let me count the ways

There are several classes of activity for which I turn to Cuttle:

- **Creation of physical laser-cutter objects.** This is the most straight-forward motivation, and why I started using Cuttle in the first place: I have a set of shapes that I need to be able to cut with the laser cutter, in service of building a physical object. I build them in Cuttle, export them as SVG files, and then import and print them from the laser cutter.

    Examples (to be described shortly!): [decorative bookends](#bookends), [a doorbell chime cover](#a-cover-for-a-set-of-doorbell-chimes), and assorted [calibration tools](#a-handful-of-calibration-tools).

- **Exploration of arbitrary patterns/shapes/concepts.** This motivation is a natural result of Cuttle being fun to play with. When I see an interesting shape or pattern, I now think "hrm, how might I construct that?" and then I give it a try. Notably, instead of hard-coding specific dimensions or qualities of the item (number of sides, number of repeats, sizes of angles, etc), I attempt to parameterize them in different ways: instead of making a 6-sized shape, I'll make an `n`-sided shape and set `n` as a Cuttle variable. Then, once I have successfully completed the original item, I can play with those parameters to see what other interesting shapes or designs fall out. (In case it doesn't go without saying, there is no one way to parameterize a design! That is one of the creative joys/frustrations.)
    
    This motivation is the one I use to "let" myself procrastinate. I *could* respond to that email...or I could see how quickly I can implement a basic [Moiré pattern](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern). ¯\\\_(ツ)\_/¯ Before Cuttle I didn't really do this type of activity, except *maybe* by hand. Now it scratches the dual creativity itches of "constrained problem solving" followed by "open-ended exploration and search for visually interesting results". (Translation: I like making pretty pictures.)

    Examples: [assorted pattern studies](#pattern-studies), [poem](#a-poem).

- **Prototyping.** This was an unexpected Cuttle use-case for me, and came about because I had tasks I needed to accomplish at a point in time where I was actively using Cuttle. For these types of projects, instead of defaulting to other more-familiar-to-me programming paradigms/languages/environments, I used Cuttle as a first-pass "try it out and see what works" approach.

    Examples: [music box punch cards](#punch-cards-for-music-boxes), [weaving cartoon](#weaving-cartoon).

## Show, don't tell?

The following are an un-ordered selection of projects I've designed myself---or in a couple cases, have significantly modified from someone else's initial design. (I'm not including pre-existing Cuttle templates that I've printed-but-not-altered, although those are also fun.[^gift]) I encourage you to go to at least one of the associated project pages and play around with any parameters that are visible; you can't possibly break anything[^break], and it's really fun. 

[^break]: Except, perhaps, your concentration, if you get sucked into this world like I did...

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

*Play with the project [here](https://cuttle.xyz/@hannahilea/Doorbell-box-q6JyrDmh1bNq)!*

[TODO: image of result]

I designed this decorative doorbell cover for my parents, to replace an original doorbell cover that they didn't care for. I started from a basic [Cuttle box template](https://cuttle.xyz/@cuttle/Open-Box-with-Finger-Joints-D2ugGEvYUNfd), and then added a design to the sides, a decorated front plate, and a cutout on the bottom for the chimes. 

It took me awhile to build this, as I did a lot of angsting over how to decorate it---the only project requirement was that the size and bottom cutout matched the original, so that it would fit. Eventually I got unstuck by building a single little snowflake pattern unit and then playing around with with repeating and incrementally scaling a couple parameters until it felt visually pleasing.

[TODO-gif]

I also ended up printing a bunch of test pieces to see how thin I could get the lines on the decorative cutouts before they were too thin for the laser to handle:

[TODO-test pieces]

### Punch cards for music boxes!

*Play with the project [here](https://cuttle.xyz/@hannahilea/Music-box-punchcards-iTT4lnLVNL5f)!*

[TODO: image of result]

This was a project I've wanted to do for a long time: automatically generate music rolls that can be played on a mechanical music box. I'm planning to document this project in its own write-up, so am intentionally skimping on details here, but there is an additional sparse write-up [here](https://github.com/hannahilea/music-box-punch-cards).

These music box rolls are an example of using Cuttle to prototype: rather than building out an end-to-end MIDI->SVG pipeline (`midi2svg`!), I instead converted MIDI to note index coordinates in an external Julia script, and then plugged the output coordinates of that script into a Cuttle template. This allowed me to spend my development time easily tweaking print parameters (hole spacing, metadata engraving, roll pagination, etc) with immediate visual feedback. When (if?) I turn it into an end-to-end system in the future, I won't include Cuttle in the pipeline, and I knew that from the start, but it still made the development process easier and faster for me than I would have been without it.


### Card display for a truck-loving kid

*Play with the project [here](https://cuttle.xyz/@hannahilea/Tabletop-card-stand-A4tFugrfB4wg)!*

[TODO: image of result]

My young niblings have a [Yoto](https://us.yotoplay.com/yoto-mini) player, along with a collection of various story and music cards. (A Yoto player is a small portable music box for kids; specific playlists are triggered by inserting a corresponding card.) I like making and sending mixes to them, so made this card holder so they could see their entire library.[^remember] While I CADed this myself, I modeled it off of card holders I saw elsewhere on the internet, parameterized to be customizable to the size of a card collection. The piece that I was most excited about here was the color---I cut it from Glowforge Draftboard (a proprietary medium-density fiberboard material), painted it with watercolor paint (!), and then sealed it. The piece the recipient was most excited about was that the truck design was one that he specifically likes to color in, when printed at a larger size. 

[^remember]: "...and remember that music other than *Helper Cars* exists," I thought, to no avail! 

Sidebar: are you a parent with a penchant for music curation or friends who would like to share music with your kids? Yoto is super awesome; my niblings love theirs, and I love that I can send them custom mixes. (Do not ask their parents if they love that I can send them custom mixes, seeing as the recent mix was a set of songs from a beloved and HIGHLY repetitive cartoon about trucks). 

### A handful of calibration tools

*Play with the calibrators [here](TODO)/[here](TODO)/[here](TODO)!*

[TODO: images of result]

Most of these were in support of some other project, either public or non, for learning how to appropriately tune the laser cutter across different materials. You can see the ones where I thought I was engraving words but was actually cutting all the way through the material (whoops!), and also the ones where I scrawled on them to be able to later map back to various print settings.

### Weaving cartoon

*Play with the project [here](https://cuttle.xyz/@hannahilea/Weaving-cartoon-Fireplace-SFpVg2LNsz41)!*

[TODO: image of result]

My mom is a weaver; she asked me to make a "weaving cartoon" (i.e., a mock-up) to see how this nifty doormat might look if scaled up, in service of potentially weaving a site-specific piece. (What she requested was a very basic hacky photoshop collage...instead I had some fun in Cuttle. Ah well, the result was fun!)


### Pattern studies

*Play with the project [here](TODO)!*

[TODO: image of result]

These are fairly self-evident: I see a pattern I think is cool and I have a go at CADding it and then playing with the result. (Once you start thinking in CAD elements, it is very hard to stop---but it does make the world more interesting at large! Hard to be bored if you could instead be thinking through how you'd replicate the design of the wallpaper/that building across the street/etc.) 

### A poem!

*Play with the project [here](https://cuttle.xyz/@hannahilea/RC-CC-Everybody-has-a-hungry-heart-pqGODlplgbMg)!*

[TODO: image of result]

Last but not least, this is the most off-label task I've used Cuttle for thus far: a poem. I made this as a creative coding exercise while at the [Recurse Center](https://www.recurse.com/); in the weekly creative coding session, attendees have ~1.5 hours to build something (anything, in any programming language or paradigm!) based on a prompt received at the start of the session. The week's prompt had been "Everybody has a hungry heart", and I used the session as an excuse to write and apply a very basic custom modifier in Cuttle. 

I'm actually really pleased with how this turned out, and it makes me want to do more interactive poem-type pieces in the future. I encourage you to make your own Cuttle poem---it doesn't have to be fancy! If you do, please share it with me.[^discord] 

[^discord]: You can find me over in the [Cuttle Discord server](https://cuttle.xyz/discord), as (of course) `@hannahilea`.


## Discussion

My overall favorite thing about playing around with both Cuttle and the laser cutter is that I've been able to scale my ambitions as I learn more about how to design and construct objects. It facilitates the traditional creative skills of programming, but from a different perspective. 

Cuttle isn't without flaws---but also, it is under active and responsive development, and the team that builds it responds quickly to questions and makes themselves available to troubleshoot, ideate, and provide quick bug fixes. So far I've been able to either design around any software limitations[^limitations] or avoid larger version control reproducibility issues by prototyping only a portion of the system in Cuttle, keeping the non-CAD pieces in a different (and checked in) ecosystem[^vc], and assuming that I'll rebuild the Cuttle piece in a different language if I truly want to make the design more robust and user-friendly. The development team is friendly, supportive, and actively plugging away, and with any luck these limitations are a symptom of early-stage software development (a focus on rapid iteration rather than optimization and long-term exportability/reproducibility). 

It remains to be seen whether Cuttle is my gateway drug to using professional CAD software. If I want to start designing anything in 3D (that isn't a flatpackable 3D!), I'll have to find a new ecosystem. For now, however, Cuttle has more than met me current needs as a curious CAD newbie. 

The biggest problem with Cuttle is that it is fun. Too fun. Too easy to say "oh, let me just try one more thing..." and then come up for air to find that it is 1am. 🙃

[^limitations]: Sometimes large numbers of objects (or modifiers that I'm asking to do A Lot™) cause my browser to choke. Is that truly the bounds of the project? I suspect that it's more that my approach to a given design needs rethinking. So far I haven't run into anything so blocking that it has been worth asking for assistance, and has been easier just to design in a different way. The Cuttle Discord is active and supportive, however, and when I've asked for help in other dimensions I've received it, so until further notice let's assume that this browser choking is a me-issue and not a fundamental limitation of the software!

[^vc]: In order to confidently shift from my tool use from "casual" to "underpinning a larger project," I need to be able to maintain my own version control, e.g. with import/export serialization that would facilitate the use of external version control systems (i.e., git). As I don't (currently? 😅) use Cuttle in a professional software engineer setting, this is not a blocking concern for me! And it seems like the bulk of the current usership approaches it from a maker perspective rather than a "software engineer hell bent on total reproducibility" perspective, so I suspect I'm an outlier in wanting this feature in the first place.

---
### Footnotes

<footnotes/>

--- 
- created: 2024-09-25
- last updated: 2024-09-25
- tags: project-writeup, cuttle, cad, programming, prototyping, javascript, creative-coding, makerspace
