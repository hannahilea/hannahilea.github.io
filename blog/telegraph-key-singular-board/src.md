---
title: 'Telegraph Key(singular)board: Morse for the modern era'
type: project-write-up
tags: [hardware, houseplant-programming]
description: '.... .- ...- . / -- --- .-. ... . / .-- .. .-.. .-.. / - .-. .- ...- . .-.. / ... - --- .--.'
created: 2026-01-24
published: Thu, 24 Jan 2026 1:15:00 EST
---

I acquired a [telegraph key](https://en.wikipedia.org/wiki/Telegraph_key):[^swapfest]

[^swapfest]: Thanks, [Swapfest](https://web.mit.edu/w1mx/www/swapfest/swapfest-2025.08.pdf)!

![Photograph of telegraph key](./assets/original.png)

I turned it into a wireless Bluetooth keyboard by connecting it to an [Adafruit ItsyBitsy](https://www.adafruit.com/product/4481):[^saga]

[^saga]: I found this build to be satisfyingly fast and easy, because it used the same hardware and software components as various other projects I've done in the past few years. I wrote a bit about that process here: [_Learning to learn how to play with electronics_](../learn-to-learn-electronics/).

![Photograph of telegraph key attached to USB power bank](./assets/front.png)

![Photograph of back of telegraph key, showing attached microcontroller](./assets/back.png)

Never has it been more satisfying---or less private[^morse]---to type messages. Not since grade school have I been slower or had more spelling errors when typing messages.[^practice]

[^morse]: On the plus side, I suspect that most people around me don't know Morse code, which probably gives me a certain amount of privacy through ~~obsoletion~~ obfuscation....

[^practice]: Although I have not done so yet, the Key(singular)board can be used with any existing [typing training software](http://typerfast.com/), since as far as a computer is concerned it is a normal alphanumeric keyboard.

<div class="centered-children">
<iframe
    width="100%"
    height="500"
    src="https://www.youtube-nocookie.com/embed/6ZY907rQAJU"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>
</div>

![Photo of typed text, full of spelling errors, including "HEZ LLO WOGZ D".](./assets/hez-llo-wogz-d.jpg)

The Key(singular)board has two modes: "raw" and "alphanumeric". In raw mode, the telegraph key's state---pressed or unpressed---is segmented into a series of dot, dash, and space keystrokes. In alphanumeric mode, those dots and dashes are translated from Morse code into their corresponding alphanumeric character keystrokes.
As a user, the raw mode acts as training wheels to calibrate against how tap durations translate into dots, dashes, and inter-tap pauses.[^time]


[^time]: If you re-use my code, you may want to tune these hard-coded dash and dot duration thresholds to line up with your own typing speed. It would be nice to add a parameter (and a physical switch) to update this on the fly.

One of my favorite aspects of the Telegraph Key(singular)board has been other people's enthusiasm to give it a go. I added a quick "display incoming text" mode to [the flipdots board in my apartment](../clapping-music-for-flip-disc-displays/) to turn ~~tapping~~ typing into a spectator sport.[^experience]

[^experience]: While any keyboard can be used to update the display, using the Telegraph Key(singular)board really turns it into an Experience™. Also, there's quite a bit of clatter.

<div class="centered-children">
<iframe
    width="100%"
    height="500"
    src="https://www.youtube-nocookie.com/embed/0UiXtHy7H6g"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>
</div>

I am very, very pleased with how this project turned out, and how usable and portable my key(singular)board is. 

If I were cooler, I would have typed this blog post with it. Fortunately for this post's legibility, I did not do that. On the other hand, I'd probably be better at Morse if I had!

***Instructions for building your own Key(singular)board are [here](https://github.com/hannahilea/telegraph-key-singular-board).[^trivial] Let me know if you make one!***

[^trivial]: You do not _need_ to have a telegraph key---any button will do!---but the telegraph key form factor is actively pleasing.

    If you do acquire a telegraph key---or other vintage button---learn from my mistakes and clean the button's contacts before you start the project, so that you don't spend a stupid amount of time trouble-shooting the rest of your otherwise trivial circuit with a voltmeter because the wired button "isn't working". That was the most time-consuming and frustrating part of the project, and was ultimately "solved" in five seconds with a little rubbing alcohol and a Q-Tip.
