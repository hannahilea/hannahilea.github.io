---
title: 'Button-box timer'
type: project-write-up
tags: [hardware, houseplant-programming]
description: 'A simple box with one button and one job: reminding me to push that button.'
created: 2025-09-29
updated: 2025-09-29
published: Mon, 29 Sep 2025 22:35:58 EST
---

This weekend I built a little timer box to hang up next to my desk. It has one job: to gently remind me to be less sedentary, using colored LEDs to signal that its button has not been pressed recently. It lives far enough away from my seat that I cannot press it without standing up.

![Photo of brick wall with small cardboard box on it; box has single button and single green light glowing.](./assets/green.png)

I installed it today, and so far so good: it is unobtrusive enough that it isn't distracting, obvious enough that it reminded me to stand up on several different occasions, and pleasing to push. Also, it turns out that it feels nice to stretch semi-regularly. Who could have predicted?

![Same photo as before, but with yellow light illuminated](./assets/yellow.png)

I [wrote up the instructions](https://github.com/hannahilea/button-box-timer), if you want to make one yourself! 
It is a straight-forward electronics project so would make a good starter project for anyone relatively new to hardware. It runs on an [Adafruit Trinket M0](https://www.adafruit.com/product/3500) microcontroller, programmed in CircuitPython.

![Photo of electronics breadboard with various wires and buttons attached.](./assets/breadboard.jpeg)

The timer is easily customizable in both function and form.
As far as function goes, mine counts up---green to yellow to red---but perhaps you want yours to count down? It could just as easily be a reminder of when a minimum allowable amount of time has passed, e.g., to signal that it is now safe to take more motrin or to give the cat more treats.[^trick]

[^trick]: Trick question, the cat can _always_ be given more treats. (This message endorsed by Cosmo.)

![Animated gif of timer box's button being pushed and cycling through green, yellow, and red LEDs](./assets/timer.gif)

As far as form, mine uses a fun [arcade-style button](https://www.adafruit.com/product/3490) that I've had lying around for a while; yours could use whatever button or sensor you have---or something that catches your fancy upon [browsing](https://www.adafruit.com/category/235). I built it into a cardboard box, because that's what I had on hand. This timer would work just as nicely in a custom enclosure, a repurposed little tin, or some more sculptural element. Go wild! 

![Photo of electronics in open cardboard box](./assets/box-open.jpeg)

Or just use a little cardboard box that you've colored with a Sharpie.

![Close-up photo of timer box, with one button and three LEDs](./assets/box-closed.jpeg)


***Instructions for building your own button-box timer (including a component list and code) are [here](https://github.com/hannahilea/button-box-timer). Let me know if you make one!***
