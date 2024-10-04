---
title: "TODO_TITLE"
tags: [music, programming, cuttle, cad, laser-cutter, julia]
created: 2024-10-04
updated: 2024-10-04
---

- Motivation
    - Didn't want to punch by hand! 
    - Also, have seen videos by FOO and BAR, took the "automate it?" as a challenge
    
- Disclaimer: not the only person to do some form of automated punch card generation. Intentionally didn't look this up before getting started, because it seemed like it would be fun and i didn't want to be discouraged.
    - Here are some other folks who've done similar (w/ differences)---e.g., seem to focus on the "auto punch" aspect, where i'm more interested in "quality check the input (and adjust/error if it won't work)" as well as the tactile part 

- Try it out! You'll need a music box to try out the result, but you don't need laser-cutter access. If you have one of the music box kits, it comes with a hole punch for making your own music, and you can print these SVGs and then punch them by hand.

- This is a prototype!
    - Wanted easiest way to try out the two primary cocmponents: 
        1. midi to hole coordinates (plus a bit of sanity-checking)
        2. hole coordinates to printable sheet 

What's cool about it?
- tactile!
- play your music forwards/backwards/upside down/ upside down and backwards

What was fun for me about it?
- Reaction from folks, contributions of arrangements
- Presentation response: cursed vanessa carlton etc
- Very easily extensible: originally built Cuttle SVG generation for one box, when i ordered another machine it was v easy to update existing code to support both boxes (feels good about initial implementation)


- Next steps (no promises):
  - Pull both steps together in single end-to-end site
  - Better pull in warnings about physical limitations and crank speed 
  - Take in [foo] as input (would be v cool!)
  - Hacky MIDI processing on my end could be replaced nicely with midi-to-csv, lol



***Thanks to Hive/(folks who contributed songs)/s.***
