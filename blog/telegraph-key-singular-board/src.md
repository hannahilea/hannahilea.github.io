---
title: 'Telegraph Key(singular)board: Morse over Bluetooth for the modern era'
type: project-write-up
tags: [hardware, houseplant-programming]
description: '.... .- ...- . / -- --- .-. ... . / .-- .. .-.. .-.. / - .-. .- ...- . .-.. / ... - --- .--.'
created: 2026-01-22
published: Thu, 22 Jan 2026 22:00:00 EST
---

I acquired a [telegraph key](https://en.wikipedia.org/wiki/Telegraph_key) at [Swapfest](https://web.mit.edu/w1mx/www/swapfest/swapfest-2025.08.pdf).

![TODO: photo of plain key](./assets/key.png)

I turned it into a wireless bluetooth keyboard by connecting it to an [Adafruit TODO](TODO-link).

![TODO: photo of front](./assets/bt-front.png)

![TODO: photo of back](./assets/bt-back.png)

Never has it been more tactiley satisfying to send texts.[^privacy]

![TODO: photo of usage](./assets/sending-text-message.gif)

Never has it been less private to send texts.

![TODO: Video of message being typed; message isn't visible, but is audible to anyone who knows the Morse language](./assets/)

I have published the instructions and code [here](TODO), in case you want to make your own. You do not need to have a telegraph key---any one button will do: the circuit is trivial to construct.[^trivial]

![TODO: diagram of adafruit whatever wiring diagram](./assets/wireframe)

[^trivial] If you do acquire a telegraph key---or other vintage button---learn from my mistakes and clean the button's contacts before you start the project, so that you don't spend a stupid amount of time trouble-shooting the rest of your otherwise trivial circuit with a voltmeter because the wired button "isn't working". That was the most time-consuming and frustrating part of the project, and was ultimately "solved" in five seconds with a little rubbing alcohol and a qtip. 

My Key(singular)board has two modes: a regular typing mode and a "raw" mode, in which the dashes and dots are typed as detected, rather than being parsed into alphanumeric values. The raw mode acts as a useful tutorial for users getting comfortable with how fast or slow their dots, dashes, and pauses need to be.[^time]

![TODO: animated giph of typing raw mode and then non-raw mode](./assets/TODO)

[^time]: If you re-use my code, you may want to tune the hard-coded dash and dot time thresholds to line up with your own typing speed. It would be nice to add a parameter (and a physical switch) to update this on the fly. 

Because the Key(singular)board outputs letters as does any other typical computer keyboard, it can be used with any type-training software. For example, here I am ~~struggling~~ practicing my Morse with [TyperFast](https://www.typerfast.com/).[^rawraw]

![TODO: video of practing with typerfast](./assets/TODO)

[^rawraw]: I think I may want to add a _raw_-raw mode to the Key(singular)board so that I can practice on a site designed to teach Morse directly...

Telegraph keys are lovely and pleasing to use. One of my favorite aspects of this project has been other people's enthusiasm to try typing with it. I added a quick "live scroll text" mode to [the flipdots board in my apartment](../clapping-music-for-flip-disc-displays/); while any keyboard can be used to type to it, using the Telegraph Key(singular)board really turns it into an Experience™.[^experience]

[^experience]: By "experience" I mean "clatter"---but also, a spectator sport.

![TODO: animated giph of flipdots typing](./assets/TODO)

If I were cooler, I would have typed this blog post with my Key(singular)board. Fortunately for this post's legibility, I am not and did not.

***Instructions for building your own Key(singular)board (including a component list and code) are [here](https://github.com/hannahilea/TODO). Let me know if you make one!***