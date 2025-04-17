---
title: 'An ode to houseplant programming 🪴'
type: Musing
tags: [houseplant-programming]
description: 'Waxing poetic about a new descriptor for hyperlocal software development'
created: 2025-04-3
updated: 2025-04-3
published: Fri, 3 Apr 2025 15:19:51 EST
---

[Recurse Center](TODO) peer [Ryan](https://rygoldstein.com) recently coined a phrase that I instantly fell in love with: *houseplant programming*.

In Ryan's words:

> [The tool I built] solves my idiosyncratic problems and may not address yours at all. That’s fine---take it as an prompt to write tiny software just for yourself. Houseplant programming 🪴<sup>[2]</sup>!

> <sup>[2]</sup> This isn’t an existing phrase as far as I know, but the closest I can think of is “barefoot developers” which a) is a little more granola than my vibe and b) is maybe tied up in some AI stuff. I guess this is [situated software](https://gwern.net/doc/technology/2004-03-30-shirky-situatedsoftware.html) but even smaller: I’m not building for dozens of users, I’m building for one user in particular.

> [[source]](https://rygoldstein.com/posts/introducing-mirror-darkly)

Houseplant programming: Tiny software just for yourself. *Perfection.*

At the risk of overexplaining and thus cheapening the analogy, I feel the need to wax poetic.



## Branding: Perfectionism's placebo

I develop software as a career, but I also like to muck about with code in service of other goals.

It took me a long time to get to the point where I could recognize the value in what I was doing, rather than add caveats all over the place for what my code *did not* do, rather than what it did do.

Why? I think somewhere along the line I picked up an unhealthy---and false!---assumption that it wasn't worth sharing my code unless that code was ready to be used easily by whoever was able to access it---specifically, that it was "production ready" for some arbitrary and ever-growing version of "production" that was never *quite* fully defined in my head.[^perfectionism]

[^perfectionism]: If this is something you also struggle with, I encourage you to look up the term "perfectionism" and some of the techniques to combat it. Ditto "capitalism". 🙃

The ~~silliest~~ most insidious part of this polished-or-nothing assumption is that I never felt it towards other people's projects or code: I love hearing about and reading about other people's ideas and approaches, regardless of whether the the things they build can be easily reproduced, or even if they result in any output at all. They often don't! It's the journey that I find interesting.

What changed? Time and practice and therefore self-confidence, mostly. But also being around various communities of creative people who reflected back at me the same enthusiastic curiosity about my projects, and who asked to hear more for the sake of hearing more, rather than for the sake of receiving some perfectly polished artifact that could be dropped into their own work. And to be honest, I am still actively combatting it in myself.

One thing that I've found really helps me, is nice, concise terminology for what it is I've created. Even if I then have to define that term for someone who isn't yet familiar with it, having the term in the first place gives me a little safety net in which I can feel safer and more confident in what I'm sharing or asking for help towards. 

It may seem trite, but a good rebranding really has done wonders for my happiness---and therefore continued momentum---as a programmer. It feels bad to be TODO monologing about my current stuck point? I'm rubber ducking! I'm not necessarily thrilled to be slogging through cleaning up documentation, but I'm pretty happy to have increased the bus factor! And thus, when presenting personal projects I've taken to saying that they're prototypes.  

Prototyping is a thing that makes sense to many folks in the field---it involves a first pass at trying to build something, and the output *won't* be optimized, might be hacked together with glue and dreams, and possibly even "only works on my machine". But it's proof that it is worth spending more time on something, or NOT worth spending more time on something! And that holds a lot of value in and of itself. As the kids say, fail fast.

## Not a prototype, not yet a Platonic ideal

While rebranding some of the projects I've built as "prototypes" has helped me feel better about sharing something half-baked with the world, it also has felt like the term somehow devalues what I've built. Sure, sometimes I do build prototypes! But sometimes, I build a [weird little guy](TODO) of an idea, and it doesn't need to be any more than what it already is. Just existing is enough for me, and being able to share it with other folks is an added bonus. I'm not interested in developing it into a less-weird guy!

The thing is, a lot of the personal projects I've built are *not* prototypes, even if they share a lot of the same characteristics of a prototype: they are a first-ish pass at bringing an idea to life, they could be turned into a more generalizable or generic Thing, they probably involve some context-specific configuration or defaults, and they probably can't just be used by someone else without that person knowing which parts are hopes and dreams vs 

However. I don't ever intend to turn them into something else! They serve the need they were built to serve, and I am going to move on to something else, and maybe I'll come back to them in the future, but also, maybe I won't. I don't expect more of them than they are, and I don't owe them more development time! 

Thus: houseplant programming. Tiny software for just myself.

## Another title

The "houseplant" terminology feels so deeply *right* because my personal programming projects really *are* just like houseplants:

- Like my plants, I love them and I want them to thrive, and I baby them a little bit until they do. But also, if they don't work out? It isn't a big deal, into ~~the great compost bin in the sky~~ Github they go, where a hard-won line or two may be recycled into a future project. 

- I love having plants/projects-that-I-made living in my home passively. Sharing a space with them reminds me of things that I like about myself. Exhibit A: Plants. Exhibit B: Houseplant projects.

[TODO-image plants]
[TODO-image projects]

- Sometimes they are poisonous to my cat and need to be moved out of range or rehomed with a pal.[^cat] 
[^cat]: The plant, not the cat!! I'm not a monster.

- Like a houseplant, once I've figured out how to get the code operational  code is operational it is  is probably doing Just Fine. If you moved it to a new location, 

- Houseplant code that is happy in my home might be happy in yours---or it might require a little tuning, or it might die outright. Why? Well, I'd likely have a hunch---maybe I know that I keep my home at a different temperature than your, or that your window is sunnier---but it wouldn't necessarily be a quick fix. 

- Clippings! I love to propogate my plants and share them with friends. Do you want a pilea or a spider plant or a nice philodendron? Let me know, I'll hook you up! Do you want to set up [your own FlipDots board](?) or [BirdNet-Pi](TODO)? Awesome, I'll write up my instructions and do my best to set you up for success when running it yourself. BUT ALSO, once that plant has taken up residence in YOUR home, it is no longer my problem. I'd love to hear about what you did to help it thrive, or if it just thrived with no adjustments, and if it starts looking sad I'll gladly give you a little thought about what might be going wrong (try giving it less water / try installing a particular dependency with `sudo`) BUT it is no longer my problem. If it never thrives, I'm not going to lose sleep over it, or figure out how to make it thrive.

- I don't necessarily care to make my houseplant fully generalizable? I would love to know what you did to make it live in your home, and if those are changes I could pull back into my main project easily, I'd happily do so. If they aren't, however, I'm not going to be bothered about it. I'll happily link to YOUR instructions, however! And I'd love to know how you ended up solving your problems/propagating your offspring/etc!

- One person's houseplants are another person's business model. (One person's houseplant code is another person's B2B SAAS production code.) 

- Sometimes a happy houseplant up and withers one day with no apparent reason. Sometimes my weather station shows me the icon for snow, even though it is currently April and the temperature isn't predicted to dip below 32. ¯\\\_(ツ)\_/¯

TODO-image-snowflake

- The things I'm willing to do for my houseplants are different than the things I'd do for plants I was entrusted with professionally. I am perfectly happy hacking together a working code pipeline, waiting to see what breaks, manually restarting a system that goes down. On a job? Nope, there'd be monitoring and tests and nice documentation for whoever needed to know how to provide care in my absence.

- Sometimes it is time for a houseplant to move on, and go live in another home (or in the big greenhouse in the sky), and that's okay. Easy come, easy go! I will remember the good times. No big sunsetting/maintenance/documentation of end-of-life necessary.

## When "It works on my machine" is the goal, not the excuse

Here's the thing: if you are clear about the production environment you've built for, any code can be production ready simply by rescoping your definition of production!

Professional code: "it works on my machine" - an excuse given when "it" isn't working on other machines; is generally a bad thing, and an excuse given to explain that something about the state of the system must assumed rather than specified, indicates more work needs to be done.

Houseplant code: "it works on my machine" - great! you got it working! cool! congrats! that is, specifically, the goal!

I think the analogy is also charming because it directly subverts the "it works on my machine" catchphrase that is an excuse known to not hold water and FOO indicate that more needs to be done to make it not JUST work on one's own machine. 

It turns what was formerly an excuse---"it [only] works on my machine [:(]"---into a badge of honor: "[i made it] work on my machine [!]".

Things I have found myself saying about past projects, apologetically: 

- It works for me, but...
- It's held together with sticky tack/tape/zip ties/etc 
- When it fails, I have to manually restart it

The thing is, none of these statements are anything to apologize for in the context of houseplant programming! In a workplace, about a project that is intended for productionization and mass dissemination? Absolutely. For a project that lives in my house and works when I need it to? Cool! Badge of honor!

The thing is, when other people tell me about their projects and say any of those phrases, I instinctually counter with "eh, doesn't matter!"/"still cool"/"yeah, but it WORKS". Telling myself that my programs are houseplants lets me give myself this same grace. 

[Aditya Athalye](https://www.evalapply.org/) (another RC peer!) perfectly captures this vibe in one of their project's descriptions:

> [Project]'s job is to help me make my website: https://evalapply.org Thus, [project]'s scope, (mis)feature set, polish will always be production-grade, where production is "works on my machine(s)" :)

([source](https://github.com/adityaathalye/shite?tab=readme-ov-file))

Strong "I have won an award, thus everything I do is the attitude of an award winner" energy:

TODO-IMG

## Sharing is caring 

Just because a plant is a houseplant doesn't mean it can only ever grow in the one home it started in. It could be gifted to a friend! It could be propogated, such that its offspring can go live in many homes! Some of those new stewards could propogate it further, into even more homes! You could even start selling its offspring commercially, with or without your services as gardener! Perhaps you have found yourself starting a plant nursery? Or maybe it just lives in its happy little pot on your happy little shelf, making you happy whenever you notice it, and giving you Oxygen in exchange for the CO2 you breathe on it? 

Just because a program is a houseplant program doesn't mean it can only ever run in the one home you built it in. You could adapt it for a friend! Its code could be shared publicly, such that it could be run by other users! Some of those new users could fork it and adapt it further, such that it is used by even more programmers! You could even start selling it commercially, with or without a promise of continued maintainence! Perhpas you have found yourself starting a commercial B2B service? Or maybe it just lives in its happy little code sandbox on your computer, source code forever private, making you happy whenever you notice it, and doing its little task for you whenever you have asked it to?

Just because a program is a houseplant doesn't mean it can only ever live in one house. 

I tend to write my houseplants with an eye towards propogation: I will offer you the opportunity to grow the same houseplant in your own environment by 

I also tend to write my houseplants these days with an eye towards sharing my own lessons in houseplant gardening: I will tell you about the plants that failed to thrive, the soil that had bugs, the way I discovered that this one lil buddy really hates direct sunlight. 

Also, I don't care if no one ever takes me up on these offers! The joy is in the possibility. 

Reading about other people's houseplant programs is one of my favorite genres of tech writing---I find it accessible and delightful, and it teaches my inner programming voice new phrases to fall back on when stuck, and it gives me fun topics of conversations for friends and future friends. 

The Recurse Center calls this type of propagation "learning generously".


## Status badges for houseplant projects

If you've landed on this page, it may be by way of a repo status badge on one of my repos:

TODO-make badge 

When I use this status, it indicates that "this project is (or at one point was) in production *in my home*" i.e. "it works(/ed) on my computer" i.e. "you may need to make some changes, but you know that it DID work in at least one context, so if it doesn't work in your context you can probably figure out how to solve that if you figure out the source of differences between the two contexts." Could it be used in a more performance-critical/professional context? Possibly! Does it have the niceties of a robust and production-ready codebase? Maybe! Is it under active development/maintainence? Maybe, but probably not more than on an as-needed ("I noticed it stopped working, I should fix it") basis!



## Other people's houseplants

I love reading about other people's houseplant projects. Do I want to take cuttings for my own home? Occasionally! But mostly I just want to wander around and admire them---and hear about the woes encountered when figuring out how to help them thrive. I do not need to steal someone's houseplant in order to admire it, or to learn from them that maybe I should consider a different watering scheme or fertilizer for my own. 


## Bouquet-programming

Spin-off term: bouquet programming. Code that is written for one specific user to support one specific usecase, non-recurring, so by definition needs no maintainence. E.g.: a data-science script, code used in service of building an irl one-off present, etc. 

Still worth sharing generously in the same ways as hosueplant programming, but even *less* likely to just work out-of-the-box on one's one machine, even if one was the person who built it! (I try to write with an eye towards bouquets that I can regenerate as needed, but without doing the unnecessary work of generalization---following the YAGNI principle.)

Examples:  


## Emoji addendum

I love the variety of plants that show up in different systems' `:potted-plant:` emoji. Taken all together, they make for quite the home jungle! (See [emojipedia](https://emojipedia.org/potted-plant#designs) for the provinence of each specific plant.)

TODO-make little garden of plant emojis

BADGE INFO

[<img alt="Static Badge" src="https://img.shields.io/badge/%F0%9F%AA%B4%20Houseplant%20(production)-x?style=flat&label=Project%20type&color=1E1E1D">](https://www.hannahilea.com/blog)


https://shields.io/badges
https://project-types.github.io/ 
https://github.com/badges/awesome-badges
https://www.repostatus.org/

### Related resources

- https://www.inkandswitch.com/local-first/ 
- https://maggieappleton.com/home-cooked-software/

***Thanks to [Ryan](TODO) for the coinage, Alex for the intro to perfectionism recognition and combatting, and everyone at the [Recurse Center](TODO) for sharing gardening tips, tricks, and joy.***

