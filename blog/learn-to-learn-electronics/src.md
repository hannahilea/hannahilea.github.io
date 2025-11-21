---
title: 'Learning to learn how to play with electronics'
type: Musing
tags: [hardware, electronics, learning, learning-to-learn, getting-unstuck-while-learning-to-learn, why-the-expletive-is-this-circuit-not-working, microcontroller-is-mistaek]
description: 'A journey of a thousand doofy hardware projects starts with a single Adafruit blink'
created: 2025-11-20
published: Thu, 20 Nov 2025 23:58:00 EST
---

_Over the past few years I've finally learned how to build hardware and electronics projects in earnest, and am having fun doing so---after too many years of frustration and struggles in getting started even *learning how to learn* those skills._
_Here are some thoughts around what I've learned from this journey. They were initially written in response to a peer's query, and are only lightly edited from that initial brain dump. I may turn them into a cleaner narrative in the future, I may not! Something something better a scrappy post than no post? ¯\\\_(ツ)\_\/¯_

_The initial writing of this list was time-boxed; I have a lot of additional thoughts and caveats for basically every single point here, but I am not allowing myself to add them or I'd __never__ be able to hit publish and move on to something else. If you, fair reader, have a question about any specific point, ask and I'll elucidate!_

---

## Background

* Before getting into hardware, I had a basic software engineering skill set, general interest in wanting to understand ✨ anything ✨ about building my own hardware projects, and lots of frustration around not knowing how to scale my ambitions to a learning process that would actually help me...learn.

  * Why frustration? Over the years I'd taken various stabs at trying to work with electronics and never really gotten far enough to be able to feel like I was making progress or having fun. E.g., various of one-off tutorials or "components kits" etc, which were good in their own ways but did not help me learn how to learn. And---unlike when learning various programming things---I did not find the internet to be a particularly useful assistant. It was (and is!) full of seas of tutorials and project write-ups and explanations that didn't quite meet me at my current skill state. Not the least of which is that I didn't have the skills to effectively assess a useful vs a half-baked explanation. Intimidating *and* unhelpful!

* Hardware is a weird beast, if you're mostly used to software---the debugging process is similar in approach but wildly different in terms of implementation/predictability. 
  
  * More on this some other time, perhaps, but unlike software, you can't save some functional state and just jump back to it at any moment....you have to wire stuff, and sometimes (often 🙃) it is those literal wired connections that are failing---for a variety of reasons that may be straight-forward but take time to internalize.[^debugging]

  * My intuition around what will take the most time in a hardware project has been WILDLY off. I am still figuring out how to calibrate my expectations.

[^debugging]: I have a whole mental "how to problem solve my electronics problem" map that I hope to write as a future post.

* The thing that gave me enough technical support to get started with electronics projects in earnest was having a safety-net resource---someone(s) who could say "yes you are on the right path" and "huh, that IS weird, here's how I'd debug it" and "hrm, that seems a little ambitious as a starting point, but if you do just this sub-part, that seems doable!"[^doable] For me that initial safety-net resource was my now-spouse, and it has grown to include a former-housemate friend and the [Recurse Center (RC)](https://www.recurse.com/) community at large.

[^doable]: [Doable, eh?](https://www.youtube.com/watch?v=aR5AU3azhyc&t=242s) No but really, having someone to say "no you don't have to worry about electrocuting yourself by doing that. Really. It's fine." is _invaluable_.

* Another important piece for me has been gaining intuition around how other people approach projects, what types of components they use, what they treat as easy and hard, what items they build themselves vs purchase, etc. For this, I have found Instagram really useful---I follow a bunch of maker people. Ditto the RSS feeds of maker blogs.[^makers]

[^makers]: Stay tuned for an upcoming assemblage of makers who inspire me, perhaps?

* There are lots of ways to connect components to microcontrollers: breadboards, soldering to wires, soldering to prototyping boards, designing a custom PCB. Each is fiddly in its own way. That's okay! Recognize that most tutorials will gloss right over the "connect components to microcontroller" part, and so you'll need to get comfortable planning extra time for it until you're practiced in whichever approaches you prefer. Currently, I use breadboards and then solder to prototyping boards.

  * I recognize that there is an implicit shopping list associated with hardware projects, and for beginners it won't necessarily be clear what is worth purchasing. To start with, buy as little as possible---try to borrow tools from friends or try them out at your local makerspace.[^tools]
  
[^tools]: I'll attempt a write-up of my basics tools as a follow-up post.


## Meta-strategies

* I've found it REALLY helpful to take careful notes while I'm doing anything with electronics---because then I don't have to start from scratch the next time I want to do something similar---in 6 days, 6 months, whatever---and also because it helps me figure out how to explain to someone else what I've done when I'm asking them for help. Yes, this can be true for software work, but it has been extra important for hardware projects.

* I've had good luck live-blogging my experience in RC's Zulip. This has been helpful for things like "solidarity" and "motivation", but also for actual problem solving.
Selfishly, I love it when other people live-blog their experiences as well. If you need a tiny reason to push you towards learning generously by writing your notes "publicly"---in a blog, in the RC Zulip, etc---instead of in a private doc, feel free to use "Hannah will probably read it and feel happy"!
  * _NB: Obviously the RC Zulip is specific to other folks in the RC community, but if you don't have a community or website to write to yet, consider using something like [TinyLogger](https://www.tinylogger.com/) for documenting your learning process._

## Getting started

_Disclaimer: the following is primarily geared towards learning to make projects like the ones I like, namely, some amount of hardware, some amount of software, probably some doofy un-serious end-goal. If you want to learn low-level electronic circuit stuff, the following may not be quite what you want._

* For getting started, growing your skillset, and really learning, **it's [Adafruit](https://www.adafruit.com/) all the way down.** 

* Start in the learning/tutorial section of the [Adafruit](https://learn.adafruit.com/search?q=music) website and search for things you find interesting: music, sports, wearables, gaming, whatever. Click on any project that even slightly catches your eye, skim the first page of its write-up. If you don't understand most of what's being discussed, that's okay. Skim it anyway, then move on and skim another project. By the time you've skimmed a handful of projects, you'll start recognizing terms that show up regularly. Look those up, write down what they mean in that "scratch notes" document you're keeping. We're going for osmosis here, not total comprehension.

* Squint at these projects through a lens of how they can be adapted to things you are curious about. At the time I'm writing this list, there's a bunch of halloween stuff. I have no interest in making spooky props...but I would actually like to learn how to control large outdoor displays, so [this tutorial](https://learn.adafruit.com/dancing-inflatables-make-your-holiday-display-move) on "Make your Holiday Display Move" is still interesting to me. Skim it!

* Pick one Adafruit microcontroller board to play with. Anything you learn on one of these boards WILL be transferable to any other Adafruit board...and then, likely, to other types of microcontrollers.

  * The [Adafruit Feathers](https://www.adafruit.com/product/4062) are great, although you'll need to purchase sensors and inputs separately, and you'll probably need to do some soldering. This is the flavor of board I first got comfortable with, and I really really like it.

  * The [Circuit Playground Express](https://www.adafruit.com/product/3333) is also great, both because Adafruit (and the internet at large) has a lot of good documentation on how to hook it up to different types of sensors (digital! analog! button! temperature! etc), and because it has various capabilities built in so you can get a feel for working with those inputs/outputs in code without having to first wire them up. Also, you can use [alligator clips](https://www.adafruit.com/product/5592) to connect components to them, rather than needing to solder, if you aren't ready to take on soldering as a skill.[^stock] 

[^stock]: The Circuit Playground Express occasionally goes out of stock, but they update their stock frequently, so sign up to be  notified if that's the case.

* If you use an Adafruit board, you can program it in [CircuitPython](https://circuitpython.org/), which is basically Python with a set of hardware-tailored libraries that make working with Adafruit boards straightforward. If you are used to Python in any capacity, this is a great way to start thinking conceptually about how to talk with the various inputs/outputs on your board. Once you're comfortable with the board/inputs, you can shift to some lower-level language if you want, but also, you don't have to! I've gotten relatively far with CircuitPython for my current projects.

## Skill building

* The "hello-world" of hardware is "make light blink". 

* Add skills one at a time, and don't try to do it all at once---unless you are following a well-written tutorial that includes all the steps. 

* In general, I've intentionally attempted no more than ~1 new hardware component type per project, especially if I'm using a board that I haven't tried before. This "slow" build has really helped me gain confidence in learning _how to learn_ about each new board, each new component, and each new software library for interfacing with the components.

* Learning how to work with each of the following hardware components, in roughly this order, has helped unlock a world confidence and competence both:

  - Digital inputs, e.g., buttons---toggle buttons, momentary buttons, etc.

  - Digital outputs, e.g., an LED: from code, turn light on! Turn light off! Etc.

  - Analog inputs, e.g., potentiometers---which can take the form of knobs or sliders or touch sensors, or any number of other sensors, like temperature or humidity or....  Go to Adafruit and search "potentiometer"!

  - Neopixels! Turn lights on, make lights turn colors. This is my latest component skill, I am very pleased about it.

  I have not yet tackled batteries! Or relays, or motors, or sound, or a whole bunch of other stuff that is on my list. One thing at a time! 

* Similarly, it has been useful to intentionally and slowly build on software concepts for interacting with the components. I followed [an Adafruit tutorial](https://learn.adafruit.com/ble-hid-keyboard-buttons-with-circuitpython/ble-keyboard-buttons) to use an Adafruit Feather as a bluetooth keyboard/mouse, and it has unlocked a huge amount of project potential and gotten a lot of use for various projects.[^various] Once you can connect your board to your computer as a "generic input" then you can use any sort of sensor to trigger any sort of on-computer task you want.

[^various]: This [trombone slide whistle](../slide-whistle-trombone-champ-controller/), but I've also used it to build several related projects that I haven't written up yet, including drum bongos and a telegraph key(singular)board. 

* Browse the Adafruit store, especially the components section, and pick one thing that looks REALLY FUN to you. Then figure out how to do the most basic thing with it! They'll often link to a tutorial page from a product page. 

* If you are ordering parts for a specific project? Add on one or two cheap fun-looking components, just for the fun of it. They'll become inspiration for a future project---ou never know when you'll find a use for that satisfyingly clicky toggle button![^uhoh]

[^uhoh]: You may also end up with a treasure box of assorted components. You could do worse for yourself!

* Even if you are working through this slow-ish and steady-ish regimen for projects you design yourself, you can still tackle larger kits that involve More Stuff™ all at once; I've found that those help practice similar critical thinking skills, even though I don't necessarily learn transferable hardware skills from them.

  * E.g., I assembled a [kit for a pen plotter](../ly-drawbot-setup/), which was really fun; even though it involved servos and motors, though, I don't feel like I understand how to fit those into my own projects, because I didn't actually think through how to assemble them: I just followed the instructions for how to connect them to other pre-programmed parts. 

  * There are a bunch of cool kits out there; if these are your speed, great. I find them really cool, and love the meditative aspect of soldering stuff together. I have found them to be a fun activity but not necessarily a great learning tool for me. Still, the fun is the point, and getting practice handling components and doing soldering is still worthwhile, so I'd recommend 'em if you're even remotely interested. 

## Pep talk

* Playing with electronics and building hardware projects is _so fun_. I highly recommend it!! 

* Understanding how hardware projects are constructed is satisfying, even if you aren't making them yourself.

* Soldering is really fun!

* Knowing what microcontroller to use can feel overwhelming. If you get yourself comfortable with just a single board---e.g., one of those Adafruit ones---this will start feeling less overwhelming.

* Even "basic" stuff---one button, etc---is satisfying to build and play with. Monkey brain loves hitting button!! Button make light go! 

* Once you start to get the hang of it, you'll feel seriously empowered. For example, here's a relatively basic project I was able to throw together recently, which I would not have been able to do easily even a year ago: [Button-box timer](../button-box-timer/).

* In my experience, some combination of the microcontrollers themselves, the programming environments created for them, and the documentation for both have gotten way better over time. If you attempted electronics previously and gave up in frustration, it's worth trying again today: there's a lot more (and a lot better) documentation out there now than there used to be.

* There is _so_ much documentation out there for "getting started with hardware" / "learning to do electronics", etc, and it can be intimidating---not least of which because there are some pretty big leaps in assumption about what a "beginner" already knows. This post included! Don't let this discourage you. :)

***Thanks to AV for the prompt and the "post-it-as-it-is" encouragement, DL for the "lists are great" encouragement, AF for being my electronics safety-net along the way, and Adafruit for building out a phenomenal non-gimmicky ecosystem that _works_.***
