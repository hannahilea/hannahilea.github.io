---
title: 'Personal public transit display on an Adafruit MagTag'
type: Project write-up
tags: [hardware, mbta, public-transit, houseplant-programming]
description: 'Have MBTA transit API, will travel. Well, will know when to travel, at least.'
created: 2026-11-11
published: Wed, 11 Nov 2026 14:45:00 EST
---

I live at the nexus of a bunch of awesome public transit routes, and we use many of them on a regular basis, so I built us a little display for next to the door:

![TODO-Photo](..)

It's pretty basic: an [Adafruit MagTag](https://www.adafruit.com/product/4800) powered by a little [LiPo battery](https://www.adafruit.com/product/1570), plus a pleasing---albeit not actually necessary!---button picked up at [Swapfest](https://w1mx.mit.edu/flea-at-mit/).[^swapfest]

[^swapfest]: This leaves me with only `one gazillion _- 1_` items from Swapfest awaiting a project...progress!

When the Big Button™---or any of the on-board buttons!---is pushed, the board wakes up, connects to my home WiFi, requests per-route timing from the MBTA's API, and then updates the display with the next few departure times for each route. 

![TODO-gif-or-video](..)

Every 30s thereafter, it requests updated timing from the MBTA and redraws the screen. After several minutes, it displays a "sleeping" screen and goes to sleep.

![TODO-photo-hibernating](TODO)

If the button is pressed any time during the wake period, more time is added before hibernation.

The initial startup-from-hibernation isn't instantaneous but that hasn't been a problem: when in a hurry---e.g., we planned for a specific bus, and want to know if it is truly showing up outside in 2min!---we can put shoes on while it updates. When not in a hurry, waiting 20s for it to wake up is still better than pulling out a phone, spending that same 20s searching for the relevant info, and then getting distracted into doing More Phone Things.

I chose a MagTag for this project because I wanted to make something functional quickly and relatively cheaply, without faffing about with learning too many new components: the MagTag has WiFi, display, and buttons all built in. Because the display is E-Ink, it doesn't draw power except when the screen is actively being redrawn, which is great---given our current usage patterns, we recharge the MagTag via a portable USB battery pack once every few weeks.[^needs]

[^needs]: We decided we didn't need an always-on-and-always-updating display because most of the time we _aren't_ planning our next departure; an on-demand-(with-short-term-updating) display better meets our needs anyway.

***

My code is [here](https://github.com/hannahilea/notebook-playground/tree/main/magtag-mbta-display). To set up your own:

- *If you're Boston-based (i.e., also use the MBTA):* Follow the set-up instructions in that [`README.md`](https://github.com/hannahilea/notebook-playground/blob/main/magtag-mbta-display/README.md), which will walk you through configuring the MagTag to connect to your WiFi and set up your chosen list of MBTA routes.

- *If you don't live in Boston:* Sorry, slightly more work for you! You can still start from that code, but you'll almost certainly need to adapt. Your local transit system likely has an API service of its own;[^leads] once you've found it, you'll likely need to update the JSON-parsing part of the `code.py` script to pull the relevant timing info from the API responses.

[^leads]: One possible breadcrumb is the [Transit](https://transitapp.com/en/region) app's [API](https://api-doc.transitapp.com/v4.html#description/introduction), although I haven't poked at that myself. My assumption is that if a transit organization is available via Transit, it has _some_ API of its own.

***Thanks to the MBTA for providing an awesome API, and Adafruit for providing the easy-to-play-with MagTag. No thanks to the drivers of the Green Line's Union Square terminus, who often leave several minutes before the promised departure time, without care for the unwitting wannabe-riders at the entrance end of the platform. We would have made a run for it, if only we'd known.[^known]***

[^known]: Shame on us for trusting the departure board, I guess.
