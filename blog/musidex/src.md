---
title: 'Musidex: Music '
type: Project write-up
tags: [houseplant-programming]
description: 'A physical music library for music lovers in the streaming era.'
created: 2026-02-03
published: Tue, 3 Feb 2026 20:10:28 EST
---

I listen to a lot of music, and I've been raised in a family that does a lot of active music listening and curation, but my ~~object permanance~~ recall is really bad.[^recall] The shift from my physical folios of CDs to those same CDs digitized in iMusic wasn't too bad: I could still pretty easily find my old favorite albums, and rediscover previous obsessions, by searching or sorting by play play count or release date. The shift from digital library to digital streaming library was brutal, though. Overnight I went from listening to a wide variety of music discovered at all ages of my life thus far to only listening to newer music. While I still kept a finger on the pulse of new releases by my favorite artists, and discovered and shared new music with friends and my family, anything from before I started using streaming services was all but forgotten.

[^recall]: To the point where if you ask me point blank what type of music I listen to, I may panic and not be able to come with any---despite an active history of seeking, curating, and recommending music to others, attending concerts, and playing music myself.

Several years ago I decided that I wanted a physical manifestation of my favorite albums. I wanted something tangible, and discoverable, that could be an analog reminder of the music I love. Something that other people could interact with physically. Enter: the humble Musidex!

My Musidex is a Rolodex full of albums. Each page includes the album art, basic metadata (album title, artist, release year), and a QR code that links to the album on a streaming platform.[^platform] 

![aowiejfaoweifj](jwiefj)

I added an NFC tag on the knob; I've set up a shortcut on my phone that when I touch my phone to the NFC tag, it auto-connects my phone to the living room speakers.

[^platform]:  The music streaming platform itself is immaterial, as QR codes are just URLs, so they can link to any streaming service of choice. Even better would be to link to some sort of centralized redirect site so that you could change streaming services with the flip of a switch when it turns out that the one you've bought into is actually actively subsidizing facism... Musidex v2!

I'll admit that what I *really* wanted was a jukebox---but none of the jukeboxes on Craigslist were in my budget, and even if they ahd been, they probably aren't within the space or weight limits of my apartment. This Musidex has been a fairly satisfying substitute, if a little less flashy!

## Exhibit A: The first Musidex

I built this one for myself. 

![Photo TODO](./assets/exhibit-a.png)

**Specification**

- TODO pages, one album per page (front and back)
- No album ordering---fully randomized
- Highly curated, with only one album per artist and some pages intentionally left blank to enable future additions
- A few included mix playlists, each on a shiny (instead of solid color) card
- Metadata printed on clear stickers; albums printed on regular paper and then glue-sticked down

**Challenges**

- Music curation and selection, given that I had to narrow it to one album per artist.

## Exhibit B: The second Musidex

I built this one for my dad.

![Photo TODO](./assets/exhibit-b.png)

**Specification**

- TODO pages, one album per page (front and back)
- Albums roughly sorted into five genres[^genres]

[^genres] Well, not genres so much as "classifications based on listening interest." 

- Highly curated, with only one album per artist and some pages intentionally left blank to enable future additions
- A few included mix playlists, each on a shiny (instead of solid color) card
- Metadata printed on clear stickers; albums printed on regular paper and then glued down

## Advice for future builders of Musidexes[^plural]

[^plural]: One Musidex, three Musidexes? Musidices? Musidex? At any rate, a group of them is a flock: a flock of Musidexes.

...myself included!

- Don't bother leaving blank pages. If you want to add more albums in the future, just add them then, and if the Musidex gets too full you can remove things. The work of assembly is hefty enough that you might as well end up with a full Musidex out of the deal.

- Hand-cutting the paper and manually punching the Rolodex-shaped holes takes a long time. It might be faster do do this part on a laser cutter, if making a bunch of pages.

- The separate album with metadata on a clear sticker (Exhibit A) looks slightly nicer than the single white sticker with both metadata and album art, I think, but (a) it is a lot more time consuming, (b) it is a bit less legible on darker paper colors, and (c) the gluing of the albums made the underlying cards warp a little bit.

- I wanted mine to look a certain way, but a much lighter-weight version could easily be made by using the default Rolodex cards instead of hand-cutting colorful new ones, and not bothering with album art, and hand-writing URLs (full or short) instead of generating QR codes. For that matter, the URL isn't necessarily that important, if you want it as a reminder of music you've liked, rather than a shortcut to listening to that music.

- Don't get too bogged down in the minutia (sorting order of albums, genre grouping, matching paper color to album color, etc). Easier said than done.

***Thanks to AF for being the producer of my first Musidex, by listening to my brainstorm and then seeking out and gifting me the necessary materials: Rolodex-shaped hole punch, Rolodex frame, and mini sticker printer. <3 ***

***The code and instructions I used to collect the album art and generate QR codes is at [github.com/hannahilea/musidex](https://github.com/hannahilea/musidex).***
