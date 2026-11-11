---
title: "Here comes the sun[light]: An ambient Daylight Clock with time and space controls"
type: Project write-up
tags: [friendship-as-a-gateway-drug-to-electronics, long-held-grudge-against-the-1915-detroit-auto-lobby, hardware, data-viz, cad]
description: 'Project write-up for an analog clock with an edge-lit illumination of day vs night, for passive passage-of-date awareness...and clocking on sunshine.'
created: 2026-11-06
published: Fri, 06 Nov 2026 18:30:00 EST
header: '<style>
.blog {
  img {
    max-width: 80%;
    }
}
</style>'
---

I built a Daylight Clock!

![Photo of Daylight Clock on wall](./assets/clock.jpg)

This analog clock has a 24-hour period, with midnight at the bottom and noon at the top.
The lights around the circumference illuminate the current daylight span, based on the clock's home latitude and longitude.

I also built a time-and-space control box:

![Photo of clock on wall](./assets/final-installation.jpg)

![Photo of Daylight Clock's control box on wall](./assets/controller.jpg)

What does this controller do?

- The knob at the bottom controls time, in increments of one week per click.[^week]

    The time knob in action:

    <div class="centered-children">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/rGUv38x8ZD8?si=uUPTIuiyyHb9Ohc3"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    </div>

    The sudden ~~springs forward and falls back~~ daylight shifts are when Daylight Savings Time begins and ends.

- The toggle on the side switches enables the control box's time and space overrides; when this switch is off, the time knob controls the brightness of the edge lighting.[^brightness]

[^week]: Originally I was going to scan in increments of "day", but after playing with it, "day" felt too short and required too many turns to see a difference, or to have a true understanding of how much time had passed. After experimenting, "week" had the most pleasing connection between turning the knob and seeing a physical shift in daylight.

[^brightness]: Brightness is controlled by the time knob too, when the clock is in "explore time and space" mode:
    <div class="centered-children">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/4pLWioKD2AQ?si=MLPCKOr9BLnr7-y7"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    </div>

    The extreme contrast in all of these videos is because I turned the clock to full brightness for ~~drama~~ enhanced visibility, which resulted in some strange color autobalancing. The color in the photos is more representative.

- The vertical slider is a latitude selector, designed so that the world map---[Equal Earth projection](https://en.wikipedia.org/wiki/Equal_Earth_projection)!---lines up with the length of the slider.[^proud]

    The latitude slider in action:

[^proud]: I'm particularly proud of that bit!

<div class="centered-children">
<iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/nKmbyGPCDZY?si=_RCpJTRDCWF1RKE4"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
></iframe>
</div>

- The three-way "relative longitude" toggle at the top sets position within the current time zone---i.e., whether the daylight computation is based on the west, central, or east edge of the given timezone.[^lon]

    The longitude toggle in action:

    <div class="centered-children">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/WrzbMWeNBkU?si=2F_Pq_R39ufjGVeg"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    </div>

Based on the relative longitude video, is it possible that this entire project was a way for me to illustrate the time zone grudge I've held for years? Not intentionally, but....

The grudge: I grew up in Michigan, on the west edge of the Eastern Time Zone (US); I later moved to the eastern side of that same zone, where the sun rises and sets _a full hour earlier_.[^lobby] This is distressing in the summer---by rights, the sun ought to set _late_ in the summer!---and borders on criminal in the winter: the sun sets just after 4pm on the solstice. 😱


[^lon]: Because the clock hands are not connected to the electronics, there's no way for the clock hands to jump to a new time when a change in longitude crosses a time zone! Within a single time zone, however, there's no need for the clock hands to shift. The longitude toggle therefore sets the _relative_ longitude position within the clock's default time zone---west, central, east. This makes visible the daylight shift across those different locations for the same *time* of day.

[^lobby]: Until I wrote this blog post, I blamed Michigan's choice of belonging to the Eastern Time Zone solely on the Detroit auto lobby, but it turns out it was not _just_ the auto lobby, it was a bunch of other folks too. Amy Elliott Bragg's  2025 [_How Detroit got its late summer sunsets_](https://littledetroithistoryletter.substack.com/p/how-detroit-got-its-late-summer-sunsets) is fascinating, and I recommend reading the whole thing. Wikipedia has another (briefer, less fun) summary of [time in Michigan](https://en.wikipedia.org/wiki/Time_in_Michigan).

    Also, I no longer blame Michigan for joining the Eastern Time Zone, and I don't think Michigan should shift to Central time, I think Massachusetts should switch to [Atlantic Standard Time](https://en.wikipedia.org/wiki/Atlantic_Time_Zone#U.S._states_considering_a_change_to_Atlantic_Standard_Time). At our latitude, with ~9.5 hours of daylight on the shortest day, there's no excuse for a 4pm sunset.

## Envy-driven development (EDD):[^edd] cceckman's daylight-aware clock

My clock's provenance is wholly attributable to my friend Charles and _his_ very cool [daylight-aware clock](https://cceckman.com/writing/aclock/). In Charles's words:

[^edd]: EDD follows a grand tradition of other [driven developments](../driven-developments/)...

> I’ve always lived at middle latitudes of 35-40 degrees. I notice the change in daylight / nighttime hours across the course of a year; in the winter, ending work at a reasonable hour still feels like “working into the night”.
>
> </br></br>
>
> I wanted to have a little passive reminder about how much daylight I am / am not getting. Not one tied to my computer or phone – something more ambient. Naturally, a reminder of the passage of time is… a clock!

<div class="centered-children">
<figure>
<img src="./assets/cce-clock.png" alt="Photo of Charles's daylight-aware clock." />
<figcaption style="text-align:right;font-size:smaller">Charles Eckman's _Daylight-Aware Clock_</br><a href="https://cceckman.com/writing/aclock/">Photo credit: Charles Eckman</a>.</figcaption>
</figure>
</div>

When Charles started building his clock I was covetous, and knew I had to build my own.

We made a few different design choices---his time display is digital, mine analog; his daylight illuminates outward from the circumference of the clock, mine inward[^direction]---but we both put noon at the top,[^top] and I used his daylight calculation code wholesale. Also his pair programming assistance to sleuth out a mysterious failure mode![^bug] [^bug2]

[^top]: It seems like the convention is for standard 24-hour analog clocks to place [midnight at the top of the circle](https://en.wikipedia.org/wiki/24-hour_analog_dial) rather than at the bottom---but it felt more right to me for "day" to be the top half of this clock: with noon at the top of the clock, it feels like the hour hand tracks the sun's the progress across the sky. Which, it turns out in hindsight, follows the [Astronomical Clock](https://en.wikipedia.org/wiki/Astronomical_clock) convention! And there are [a lot](https://www.atlasobscura.com/lists/astronomical-clocks) of cool astronomical clocks out there...

[^direction]: I actually prefer the outward illumination of his to the inward illumination of mine, but when I started I didn't know where I was going to hang my clock, or whether there'd be enough space around it on the wall to have a nice effect. The inward illumination makes the result slightly more self-contained.

[^bug]: I thought maybe I'd mucked up something in my translation of his Rust to my CircuitPython, but the issue turned out to be due to the specifics of datetime handling in _Python_ vs CircuitPython; I'd gotten the translation correct, but applied CircuitPython's datetime incorrectly. An easy fix, once we found it. Programming: so fun. 🙄

[^bug2]: The real bug fixes are the friends we make along the way!

My clock's time-space control box was inspired by Charles's  nifty virtual [interactive daylight visualization](https://cceckman.com/writing/aclock/software/):

<div class="centered-children">
<figure>
<img src="./assets/cce-sim.gif" alt="Photo of Charles's visualization." />
<figcaption style="text-align:right;font-size:smaller">Charles Eckman's _Daylight-Aware Clock_ simulator visualization</br>[<a href="https://cceckman.com/writing/aclock/software/">Source</a>]</figcaption>
</figure>
</div>

## Physical design and construction: Clock body

The clock movement is an [off-the-shelf](https://www.amazon.com/Deevoka-Movement-24-Hour-Replacement-Repair/dp/B0BPQPPJ86/ref=sr_1_4?crid=2WACKC1NECWJQ) 24-hour movement. You can just *buy* these![^lunar]

[^lunar]: One can also theoretically purchase phase-of-the-moon 28-day movements (!), although I haven't managed it yet, as I've only seen factory-scale batches for sale and I'm not really interested in having 500 of them...

I designed the body of the clock and the body of the controller box in [Cuttle.xyz](../cuttle-obsession/), and cut the pieces on the laser-cutter at my local library's free maker space(!).[^theme] I designed the clock to have a circumference of exactly 48 neopixels on an  [Adafruit neopixel strip](https://www.adafruit.com/product/2541), so that the lights would subdivide nicely into the hours of the day.

[^theme]: If you've read any of my [other](../birduino/) [project](../vintage-bluetooth-speaker/) [write-ups](../cuttle-obsession/), you may notice a pattern here...

![Vectorized layout of clock housing.](./assets/cad-clock.png)

![Vectorized layout of clock housing.](./assets/cad-clock2.png)
_Cuttle design [here](https://cuttle.xyz/@hannahilea/24-hour-Daylight-Clock-Housing-1-of-2-SCEntzkZSNvZ)._

The outer decoration is from the astronomical face of the astronomical clock of the [Zytglogge](https://en.wikipedia.org/wiki/Zytglogge), in Bern, Switzerland. I digitized a photo of the Zytglogge, then cleaned it up and scaled it properly in Cuttle.

<div class="centered-children">
<figure>
<img src="./assets/Zytglogge_astronomical_clock_with_labels.png" alt="Photo of Zytglogge's astronomical clock with labels." />
<figcaption style="text-align:right;font-size:smaller">Astronomical clock from the Zytglogge tower in Bern, Switzerland.<br>Photo credit <a href="https://commons.wikimedia.org/wiki/File:Zytglogge_astronomical_clock_with_labels.png">Sandstein</a>, Public domain, via Wikimedia Commons.</figcaption>
</figure>
</div>

Painting was...an experience.

![Photo of decorated face during painting](./assets/paint-1.png)

![Photo of decorated face after painting](./assets/paint-2.png)

I used wood glue to make the press-fit connections permanent.

![Photo of clock parts before assembly](./assets/assembly0.png)

![Photo of clock parts mid-assembly](./assets/assembly1.png)

![Photo of clock parts during gluing](./assets/assembly2.png)

![Photo of clock parts after assembly](./assets/assembly3.png)

I painted the clock with acrylic paint, and attached the outer decorated ring with Blu Tack so that I can easily remove it and swap it for a different decoration.

![Photo of clock parts with blu tack for outer piece](./assets/assembly4.png)

## Physical design and construction: Controller box

I designed the controller box in Cuttle, too.

![Vectorized layout of control box.](./assets/cad-controls.png)
_Cuttle design [here](https://cuttle.xyz/@hannahilea/24-hour-Daylight-Clock-Control-box-1-of-2-IgA1LCVjOqzO)._

I used wood sealant on the front and acrylic paint on the sides.

![Photo of controller box pre-parts](./assets/box-1.png)

I failed to make the box deep enough to fit the ensuing tangle of wires crammed inside, so it doesn't sit completely flush against the wall. Ah well, can't win 'em all.

![Photo of controller box assembled and on wall](./assets/box-wall.jpg)

## Hardware design

The Daylight Clock runs off an [Adafruit Feather RP2040](https://www.adafruit.com/product/4884) microcontroller. The rest of the components are:

- A strand of 48 [neopixels](https://www.adafruit.com/product/2541),
- A [real-time clock (RTC) component](https://www.adafruit.com/product/3295) assembly, to maintain the current date and time even when the board isn't powered, so that I don't have to hand-set it every time I plug in the clock[^feather]
- A two-way toggle to enable/disable switch between "daylight based on current time" vs "daylight based on control box settings"
- A [linear potentiometer](https://cdn-shop.adafruit.com/product-files/4219/4219_C11375.pdf), i.e., the slider to control latitude
- A [rotary encoder](https://www.adafruit.com/product/377), i.e., the knob to control date
- A three-way toggle to switch between the different longitude locations (west, middle, east), and
- Three LEDs to show that current longitude selection.

[^feather]: The PR2040 doesn't have Internet or Bluetooth connectivity, so I can't :just: automatically grab the current time over an external connection. Thus, the RTC.

![Photo of electronics assembly](./assets/innards1.png)

![Photo of electronics assembly](./assets/innards3.png)

![Photo of electronics assembly](./assets/innards4.png)

The microcontroller and all components live in the control box, except for the neopixels around the clock face, which are connected to the microcontroller via some hand-braided wires and a few connectors.The connectors are so that I can easily change the distance between clock and control box, without doing any additional soldering. The neopixels are powered through the board, which plugs in via standard [wall wart](https://en.wikipedia.org/wiki/AC_adapter).

The [new-to-me aspects of this project](../learn-to-learn-electronics/) were the RTC and---less glamorously!---the crimped wire connectors.

## Software design

I programmed the Adafruit Feather with CircuitPython, relying heavily on the [`asyncio`](https://learn.adafruit.com/cooperative-multitasking-in-circuitpython-with-asyncio/concurrent-tasks) library. `asyncio` allowed me to separate monitoring the state of the input controllers---"has the slider position changed? the toggle toggled? the knob turned?"---from re-computing each neopixel's resultant color.

I ported the sunrise and sunset calculations from Charles's [Rust implementation](https://github.com/cceckman/aclock/blob/5547d8490151eafa77f33dc697cbb58ea0035c70/server/src/riseset.rs#L60) of the [NOAA](https://gml.noaa.gov/grad/solcalc/calcdetails.html) solar calculator.

I've made the code available [here](https://github.com/hannahilea/notebook-playground/tree/main/daylight-clock)---and standard [houseplant programming](../houseplant-programming/) caveats apply.

## Retrospective

This project took a lot of calendar time, and a disproportionate amount of mental space.

Challenges:

- Deciding what I wanted the clock frame to look like
- Deciding how I wanted to decorate the clock face
- Deciding how I wanted to decorate the outer ring around the clock's face
- Deciding that I was going to [:just-flag:](../just-flag/) use a cardboard box for the controller...and then doing that, and discovering that I hated it and wanted to cut something out of wood
- Purchasing pre-painted wood to speed up the cut/paint processes
- Discovering that the library policies had changed so I couldn't use their laser cutter on this wood
- Attempting to use a different maker space and/or hire a local shop to cut this wood for me
- Deciding to :just: use the default library wood and paint it myself afterwards
- A series of painting mishaps with the decorative face that resulted in an unusable mess after accidentally using an oil-based ink over some acrylic
- Recutting the face (...plus the wait time of signing up for a slot...)
- Discovering that I'd glued the clock sides upside down (luckily the sizing still fit backwards, and I didn't have to go re-cut everything again...)
- Discovering that I'd installed the neopixel strip backwards (counterclockwise instead of clockwise)

Thankfully the result looks really cool, and works as intended, and I love having it on the wall.

![Photo of full assembly on wall](./assets/all-wall.jpg)

## I bet you want to make one of your own now, yeah?

Go for it!

To get you started:

- [Cuttle design for clock housing](https://cuttle.xyz/@hannahilea/24-hour-Daylight-Clock-Housing-1-of-2-SCEntzkZSNvZ)
- [Cuttle design for control box](https://cuttle.xyz/@hannahilea/24-hour-Daylight-Clock-Control-box-1-of-2-IgA1LCVjOqzO)
- [Code](https://github.com/hannahilea/notebook-playground/tree/main/daylight-clock)

Feel free to ask if you are building one and need more guidance at any step; I didn't want to take the time (heh) to write a full tutorial, but I'm more than happy to assist retroactively.

Also, if you want to make one, but don't want to deal with quite so many electronics:

- You could skip the control box: The majority of the technical challenges I encountered---both design and implementation---came from the addition of the controls. A Daylight Clock sans control box would still be pretty cool.
- You could use one of the Adafruit Feathers that is WiFi-enabled, and get the time via request, so you could skip setting up the RTC component.
- If using a WiFi-enabled microcontroller, you could create a webpage-based control panel instead of the physical one, which would also be pretty cool!

***Thanks to Charles! Also AF, for build [emotional] support.***
