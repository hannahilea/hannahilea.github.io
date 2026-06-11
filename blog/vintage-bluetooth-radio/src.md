---
title: "Yesterday's static, today: A modern speaker for the vintage listener"
type: Project write-up
tags: [baseball-radio, dsp, now-with-more-static, hardware, audio]
description: 'Listening to modern baseball games through the static of the past, via a Bluetooth speaker with a laser-cut housing modeled off a vintage cathedral radio.'
created: 2026-06-11
published: Thu, 11 Jun 2026 09:58:58 EST
---

Project write-up time, this time for a gifted [houseplant ~~program~~ build](../houseplant-programming/)!

## What?

TODO-photo

A Bluetooth speaker in a housing modeled off a vintage Cathedral radio [todo-link], with a knob for adjusting the volume and another knob for adjusting the "vintage-ness"---namely, the amount of added static and filtering.

I've taken to calling it a "baseball radio" even though it is very generic and---other than in backstory---has nothing to do with either baseball or radio.

## Why?

My partner frequently listens to baseball games on the radio, often preferring that to watching a full broadcast. To listen to her hometown games she uses streaming sites to tune in.

I thought it would be fun to add a vintage flavor to her experience, so decided to build her a "vintage" Bluetooth speaker as a gift, so that she could listen to her baseball games in style.

## [Technically] How?

#### Outside

A wooden housing, designed in Cuttle.xyz from a vintage TODO and cut on the laser cutter in the maker space at my public library.[^thanks]

[^thanks]: Thanks, staff at the Hive! Thanks, local taxpayers of the greater Camberville area!

TODO-photos

#### Inside

An Adafruit FOO, with some other stuff attached. I modeled my approach off of TODO-CITE.

TODO-photos/schema?

#### Code

 Code based on FOO.

## [Literally] How?

With much logistical difficulty! After this project, I'm declaring a temporary moratorium on builds with a holiday gifting deadline.

**Physical challenges:** 

- TODO

**Technical challenges:** 

- TODO

## Next steps

For me, for now? None! I thought that I might continue to futz with it to get the processing how I wanted, but after I handed it over it turns out I was *done*. It works, it works _mostly_ as designed, and it is usable without my intervention. Good enough for giftable work!

If I wanted to improve on it or do something similar in the future, I'd definitely figure out what was going on in my code and make that nicer. I might also switch over to a different board---after it was way too late, a friend recommended using a Teensy, which apparently has a whole GUI system for setting up exactly the processing chain I struggled to implement in code [on a moving train, without ability to debug or play audio out loud].

**If you want to make one, go for it!** Caveat that in true houseplant programming form, I have spent no time cleaning up either to be more readable as a tutorial---what you see is what you get:

- The Cuttle.xyz CAD project for making the housing: [HERE](TODO)

- The repo where I documented my hardware set-up and saved my code: [HERE](TODO)

Or you could take the easier approach: take a regular bluetooth speaker, put it near a microwave, and run the microwave constantly. Bam. Static.

***Thanks to TODO.***
