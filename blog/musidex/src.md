---
title: 'Introducing the Musidex: A physical music library for the streaming era'
type: Project write-up
tags: [digital-to-analog-but-not-like-that, houseplant-programming, all-the-colors, jukebox-poseur, audio, programming-as-a-tool]
description: 'A tangible music library of streaming service URLs, served by a Rolodex.'
created: 2026-02-14
published: Sat, 14 Feb 2026 14:00:00 EST
---

I listen to a lot of music, but my ~~object permanence~~ active recall is really weak around remembering artists and albums that I love.[^recall] This didn't used to be a problem, as I could remind myself by flipping through my CD collection or (later) scrolling through my iTunes collection.

When I switched over to using streaming services for my day-to-day music listening, however, my listening patterns shifted. I ended up listening mostly to newer songs by contemporary artists, relistening to new favorites but losing track of the much broader and more diverse back catalog of things I'd loved.

[^recall]: To the point where when asked what kind of music I like, I've panicked and not been able to come with anything at all.

Several years ago I decided that I wanted a physical manifestation of my favorite albums, an analog reminder of myself through reminding me of the music I've loved. A collection for re-discovery, by myself or anyone visiting my home.[^jukebox] I didn't want to stop using a streaming service, but I did want to supplement it with a physical link of some sort.

I couldn't find a suitable solution, so I made one. Enter: the humble Musidex!

![TODO: gif of musidex](jwiefj)

The Musidex is a Rolodex[^rolodex] full of albums. Each page documents a single album, and contains the album art, basic metadata---album title, artist, release year---and a QR code that links to that album on a music streaming platform.[^platform]

![TODO: photo close-up of single page](jwiefj)

I added an NFC tag to the side knob; when I tap my phone on the tag, the phone connects and starts broadcasting to my living room speakers. I mounted the Musidex next to the speakers, on a pair of ~~ultra luxe~~ sturdy hooks.

![TODO: photo of mounting set-up](jwiefj)

[^rolodex]: For the uninitiated, a [Rolodex](https://en.wikipedia.org/wiki/Rolodex) is a desktop directory of contacts---addresses and phone numbers---in a characteristic cards-on-axel shape. They used to be very very common in office and home settings; I was surprised to discover that they [still exist as a brand](https://www.rolodex.com/).

[^platform]: The music streaming platform itself is immaterial; the QR codes are simply URLs, so can link to any streaming service. Ideally they'd link to some sort of centralized index, such that the choice of service could be swapped out with the flip of a switch, when it turns out that the service you bought into years ago is not only exploiting its artists but also [funding](https://mixmag.net/read/spotify-ceo-daniel-ek-pledges-600-million-investment-into-ai-defence-company-news) and [shilling for](https://www.sfgate.com/sf-culture/article/no-kings-organizers-spotify-boycott-21127453.php) fascism.

[^jukebox]: What I *really* wanted was a jukebox---but none of the jukeboxes on Craigslist were in my budget, but even if they had been, they probably weren't within the space or weight limits of my apartment. I did do a fair amount of research on Jukebox acquisition, though...

The Musidex is relatively cheap, relatively lightweight, relatively easy to make, and supplements  existing listening behavior; I'm really happy with how it turned out, and several years in, continue to appreciate its presence in my home.

## Exhibit A: Musidex I

The first Musidex I built was for myself.

![Photo TODO](./assets/exhibit-a.png)

_On the software and curation side:_ I wrote a couple of scripts to parse (1) my ancient iTunes library backup and (2) a streaming service playlist, to which I added tracks from my most recent decade of listening. The scripts took in the specific song, found the album that the song came from, and then dumped the album's metadata into a table with its streaming service URL, along with links to locally downloaded album art.

I then did a bunch of manual deduplication and title/artist cleanup within that spreadsheet, to make sure that all of the text would fit nicely on the Rolodex cards.

_On the real-world side:_ I acquired a Rolodex and removed its pages, cut a bunch of cardstock into the correct page size, used a specialized die to punch the specially-shaped notches into the cards, and arranged them by color.[^key]

I then printed sheets of the album art at a local print shop and printed clear stickers containing the rest of the metadata using a mini thermal printer. I cut out the albums by hand and glued one to each page, paired with its metadata sticker.

[^key]: Probably the most important step of the whole project, tbh.

**Details**

- Roughly TODO pages, one album per page (front and back)
- Highly curated, with only one album per artist
- Some pages intentionally left blank, to allow future additions
- No album ordering---fully randomized
- A few pages linking to playlists instead of albums, each on a shiny (instead of solid color) page
- Albums printed on regular paper and glued to pages; metadata printed on clear stickers

**Challenges**

- Music curation and selection was rough; narrowing this collection down to one album per artist was *really* rough.
- Matching iTunes albums to albums on my streaming service was rough, and only partially successful, and required using an external service to do the translation.[^service]
- I had to accept that some of the songs I'd listened to obsessively in the past just didn't exist on a streaming service, and without spending the time to set up a local server, I wasn't going to be able to include them here.

[^service]:  In hindsight, it would probably have taken less time to do this manually than it took to find a service, try it, run it for real, quality-check it, and correct it post-hoc---it required a *lot* of correction. I used [Soundiiz](https://soundiiz.com/), which seemed like the best option at the time, and the lack of resounding success was not their fault; it's a tough problem!

![TODO photo of supplies](./assets/supplies-b.png)

## Exhibit B: Musidex II

The second Musidex I built was for my dad.

![Photo TODO](./assets/exhibit-b.png)

I thought I'd made choices and learned lessons when making the first one that would make creating a second one trivially easy---after all, I had the scripts to pull in album art and generate QR codes already, how hard could it really be?

Hah.

One aspect was actively easier: instead of printing the metadata and album art separately, I printed both together onto white stickers, and then each Musidex page got a single sticker. That part was nice.

**Specification**

- TODO pages, one album per page (front and back)
- Highly curated, with multiple albums per artist in a few cases and no pages left blank
- At the recipient's request, albums roughly sorted into five genres[^genres]
- Metadata and album art printed together on a single white sticker

**Challenges**

- It turned out that the iTunes script I'd made for pulling in my library didn't work with my dad's exported iTunes library, thanks to a differing XML version; I had to clean it up instead of using it verbatim.
- Figuring out a usable genre grouping was tricky and angst-ridden, lol.
- Even with years of listening history by which to sort the albums---thanks, iTunes "play count"!---the task still required a *lot* of manual curation, including some back and forth with my sister and parents to figure out which albums should take precedence.

## Advice for future Musidex builders

While I'm happy with how my Musidexes[^plural] turned out, here is some advice for anyone making their own:

- Don't bother leaving blank pages. If you want to add more albums in the future, just add more pages then. If your Musidex gets too full? Remove pages.[^second] The work of curation and assembly is hefty enough that you might as well end up with a full Musidex at the end.

[^second]: Or buy another Rolodex. :D

- Since each album QR has an independent URL, there is no need to limit your Musidex to a single music streaming provider: different pages can link to different services! For example, use [Bandcamp](https://acampbellpayne.bandcamp.com/album/flow-control) whenever possible, links to your local private server if you have one, and various different streaming platforms as needed.

- There are some lovely vintage Rolodex form factors out there, e.g. on Ebay; if you choose one of those, be aware that they might not use the same hole punch size or spacing as the official Rolodex holes. (I learned this the hard way.)

- While I think that printing the metadata on clear stickers (Musidex I) looks slightly nicer than printing it on the white sticker along with the album art (Musidex II), it is a lot more time consuming to make and less legible on darker paper colors. Also, the gluing of the albums made the underlying cards warp a little bit on Musidex I.

- Don't get too bogged down in the minutia of the sorting order of albums, genre grouping, matching of paper color to album color, etc. Easier said than done.

- Hand-cutting the paper and manually punching the Rolodex-shaped holes takes a long time.

    It could be faster do do this part on a laser cutter, if making a bunch of pages. Or, if you aren't hung up on aesthetics, just use the blank white pages that came with your Rolodex or purchase print-to-Rolodex pages and print everything on to them directly, if you don't want to mess with making stickers.

- I wanted my Musidex to look a certain way (colorful!), but it was time-consuming to make. A much lighter-weight version could easily be made by using the default Rolodex cards instead of hand-cutting colorful new ones, not bothering to include album art[^crime], and/or hand-writing URLs (full or shortened) instead of generating QR codes. Or not including a URL at all, if you want your Musidex to be a reminder of music you've loved but not a shortcut to listening to it.

All that said, if you're going to take the time to make a Musidex, might as well make it lovely. :) Don't take *too* many shortcuts!

[^crime]: Crimes!


## Addendum

The Musidex's approach to tangible computing---a collection of links to to a collection of digital artifacts, presented physically---is easily adaptable.[^term]

[^term]: If you want a [tangible computing](https://en.wikipedia.org/wiki/Tangible_user_interface) fun rabbit hole to fall into, Spencer Chang's ["computing-infused ceramic explorations"](https://news.spencer.place/p/touching-computers) is one of my favorites, and a good inspirational starting point!

In the abstract, any collection of URLs (QR code or NFC or written) will do, in any form factor you find pleasing: a deck of cards! A mobile! A collection of fridge magnets! A poster for your wall! Some decoupaged dominos![^dunno] Assorted objects in an antique [curio cabinet or card catalog](https://en.wikipedia.org/wiki/Library_catalog)![^march]

Sticking with the Rolodex base, collections that could lend themselves well to the Musidex treatment:

- Mediadex: Movies/videos/tv shows, with links to their streaming service;
- Bookdex: Books, with links to their accompanying audiobook, or to your review of them, or with no link at all
- Ornitholodex: a collection of birds, with links to their birdcall or recently tracked migration patterns
- T-Rexdex: ...no idea, but it sounds cool!

[^dunno]: I dunno, man. I just work here.
[^march]: At a formative age I read Lousia May Alcott's *Little Men: Life at Plumfield with Jo's Boys*, and I will forever yearn for Dan's cabinet of collected naturalist curiosities.

[^space]: For example, there's the NFC card-based [Yoto](https://us.yotoplay.com/) system designed for kids. While Yoto has been an amazing way for me to interact with my nephews, through sending them "mixtape" cards(!), it wasn't a good solution for my own collection: audio is hosted in their proprietary database, and linking to the database requires  purchasing their proprietary NFC cards, both of which are non-starters.

    There are some open-source Yoto alternatives, which similarly use NFC cards to trigger playback; at some point, I purchased myself a [TODO]() kit. I haven't assembled it yet, and also, it doesn't quite fill the same niche as my Musidex, as it encourages a parallel rather than supplemental music listening process. Still cool, though! If I end up assembling it, I'll write about that here.

[^plural]: `index:indices::Musidex:Musidices`? `ex:exes::Musidex:Musidexes`? ¯\\\_(ツ)\_/¯

There's a lot of room in the world for other creative solutions to the "tangible curation of digital items" problem. While there are some commercial systems out there already, nothing I've found has been particularly impressive, or has been as utilitarian as my Musidex has turned out to be for me.[^space]

***Thanks to AF for being the producer of my first Musidex, by listening to my errant brainstorming and then seeking out and gifting the requisite components: Rolodex-shaped hole punch, Rolodex, and mini sticker printer. <3 ***

***The code and instructions I used to collect the album art and generate QR codes is at [github.com/hannahilea/musidex](https://github.com/hannahilea/musidex).***
