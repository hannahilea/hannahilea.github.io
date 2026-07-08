---
title: 'Birduino: A Tonuino-based birdcall learning game'
type: Project write-up
tags: [birbs, hardware, audio, CAD, ]
description: 'TODO'
created: 2026-07-08
published: Wed, 8 Jul 2026 14:18:19 EST
header: '<style>
.blog {
  img {
    max-width: 90%;
    }
}
</style>'
---

Here's the project write-up for an interactive birdcall learning game I made, using a deck of bird cards, audio from the Cornell Ornithology Lab, RFID stickers, and an open-source RFID-triggered mp3 player project called the [Tonuino](TODO-link).

![Photo of birduino](./assets/TODO)

## What?

TODO-explain

## Why?

A few years ago I was excited to discover the [Tonuino](TODO) project, an open-source alternative to the proprietary Yoto Player. While my nephews have a Yoto player, and I love making them mix ~~tapes~~ cards for it, I was curious about the world of open-source alternatives.

At the time the Tonuino inventor was selling component kits, and I purchased a couple. I then lost track of them in my box of electronics. When I came across them earlier this year, I wanted a scoped and self-contained use case for building one of them. Making a birdcall learning tool seemed like a low-effort way to try the kit out. After all, it was [just](../just-flag/) a matter of soldering the kit's pieces together, right? As the kids say, lol.[^hah]

[^hah]: Hah!

## How?

#### Hardware: Tonuino kit assembly

TODO

TODO-photos

TODO-diagram, colored

#### Software

TODO - how software loaded on device, where from, any steps needed

TODO - what tweaked for addition of various buttons/knobs

TODO - link to my code?

#### Enclosure

I created a basic box housing in parametric CAD program [cuttle.xyz](https://cuttle.xyz), and then created a second box plus tray so that the assembled Tonuino and its associated bird cards could be presented together.

![Vectorized layout of components to cut.](./assets/TODO-cuttle-1)
![Vectorized layout of components to cut.](./assets/TODO-cuttle-2)

The Cuttle designs are [here](TODO) and [here](TODO), if you want to cut your own.

I cut the pieces from 1/8" acrylic, since I think objects with visible innards look cool and hadn't yet internalized that I'd used an excessive amount of wire relative to the size of the enclosure. This fabrication was done with the laser cutter at my public library's maker space.

![Photo of cut components.](./assets/TODO)

I had to tweak the design to make sure that the speaker and potentiometer fit perfectly, and then had to re-cut the box to leave more space for all the wires.

Even though the enclosure is technically a press-fit box, it needed to be glued for longevity. The choice of clear acrylic made for a frustrating adhesive process, as I needed to find a glue that didn't make the acrylic cloudy. After way too many different purchases and ugly test bonds, we[^af] settled on TODO.[^gorilla] 

[^af]: AF was the MVP of the glue process; when she saw I was losing my mind a little, she took over the research and procurement.

[^gorilla]: No thanks to the Gorilla Glue branding including many different flavors of glue, all similarly named despite their chemical differences. It's enough to make me want to apply for a job in their branding department, revamp their spec sheets and packaging, and then quit. Seriously, though, I *want* to use your glue! Take my money! Make it easy for me! 

    One resource that did prove useful was TODO'S write-up ["TODO-TITLE"](TODO-link).

If I were going to build another one, I'd make different wire choices to make the Birduino contents look a little cleaner, but I am happy with how this first attempt turned out.

![Photo of assembled Birduino plus empty tray](./assets/TODO)

#### Audio


#### Cards

I was picky about the playing cards I chose; while there are some beautiful ones out there, I wanted photos. I ended up purchasing [TODO's deck](TODO-link).

TODO-photo 

I put an [NFC sticker](TODO-link) on the back of each:

TODO-photo

Programming the cards ended up being easy, thanks to a program written by TODO-FOO.[^fast] From the manifest I generated from my audio files, it took no time at all to program the stickers on all 52 bird cards.

[^fast]: "Ended up" being the operative phrase there; before I folded and had AF dig her old android out of storage to enable me to use the above app, I first tried--and cursed---a bunch of RFID-programming apps from the Apple app store. The programs exist, but are designed to be "user friendly" and program URLs or text blobs or files.  Too user friendly. I couldn't find one that would support a basic binary string as required by the Tonuino.

    Apple app designers take note: there is a gap in the market for a lightweight, no nonsense, RFID writer. When you make it, let me know.

TODO-photo


## All together now

Tada!

TODO-video

TODO-photo

So much for a light and breezy project! It was a satisfying one to complete, though. And now I'm a whiz at birdcall identification! Well, not yet, but perhaps soon...

I still have another couple Tonuinos in wait for a good use-case, and now that I've assembled this first one, it should be trivial to build the others into new projects, right? :) 

***Thanks to TODO-Tonuino community, TODO-audio-folks, and AF for her adhesive assist!***
