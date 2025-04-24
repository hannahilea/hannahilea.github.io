---
title: 'An ode to houseplant programming 🪴'
type: Musing
tags: [houseplant-programming]
description: 'Waxing poetic about a new descriptor for hyperlocal software development'
created: 2025-04-3
updated: 2025-04-3
published: Fri, 3 Apr 2025 15:19:51 EST
---

[Recurse Center (RC)](https://www.recurse.com/) peer [Ryan](https://rygoldstein.com) recently coined a phrase that I instantly fell in love with: *houseplant programming*.

In Ryan's words:

> [The tool I built] solves my idiosyncratic problems and may not address yours at all. That’s fine---take it as an ad to write tiny software just for yourself. Houseplant programming 🪴<sup>[2]</sup> !
> <br><br>
> <sup>[2]</sup> This isn’t an existing phrase as far as I know, but the closest I can think of is “barefoot developers” which a) is a little more granola than my vibe and b) is maybe tied up in some AI stuff. I guess this is [situated software](https://gwern.net/doc/technology/2004-03-30-shirky-situatedsoftware.html) but even smaller: I’m not building for dozens of users, I’m building for one user in particular.<br>
<span class="source">[[source]](https://rygoldstein.com/posts/introducing-mirror-darkly)</span>

Houseplant programming: tiny software just for yourself. *Perfection.*

At the risk of overexplaining and thus cheapening the analogy, I feel the need to wax poetic.🪴

<div class="centered-children">
<figure>
<img style="max-width:600px" src="./assets/larsson.jpg" alt="Painting of person with long hair watering many plants in a sunny window." />
<figcaption style="text-align:right;font-size:smaller"><a href="https://commons.wikimedia.org/wiki/File:Blomsterf%C3%B6nstret_av_Carl_Larsson_1894.jpg">Blomsterfönstret</a> by Carl Larsson, 1895. Public domain via Wikimedia Commons.</figcaption>
</figure>
</div>

## TODO-TITLE

TODO-add an example (here or later)


## Programmer as horticulturalist

Before we get to the self-reflective bit, here is a non-exhaustive list of parallels between houseplants and houseplant programs:

- **A happy home**: I love having both plants and homemade projects in my living space. Sharing a space with them reminds me of things that I like about the world and myself. Exhibit A: Some of my houseplants. Exhibit B: One of my houseplant programming installations.

<div class="centered-children">
TODO-images
<figure>
<img src="./assets/fig-a.jpg" alt="TODO" />
<figcaption style="text-align:right;font-size:smaller">Fig. A: One of my home's houseplant corrals.</figcaption>
</figure>

<figure>
<img src="./assets/fig-b.jpg" alt="TODO" />
<figcaption style="text-align:right;font-size:smaller">Fig. B: My home's flipdots installation, an example of houseplant programming.</figcaption>
</figure>
</div>

- **Longevity**: Like my plants, I love my little projects and I want them to thrive, and I baby them a little bit to get them started. But also, if they don't work out? It isn't a big deal, into ~~the great compost bin in the sky~~ Github they go, where a hard-won line or two may be ~~composted~~ recycled into a future project. 

- **Giftability**: It is delightful to ~~cultivate~~ program something for someone else, taking into account their ~~light~~ wifi configuration and willingness to ~~water regularly~~ debug future problems.

- **Pet toxicity**: Just like some plants, some projects are practically poisonous to my cat and---if the cat had her way---should be rehomed with a pet-free pal.

    <div class="centered-children">
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Un1VF6QwQ7E?si=TEJnxtiWZ5pBCiUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>

- **Propagation**: Clippings! I love to propagate my plants and share them with friends. Do you want a pilea or a spider plant or a nice philodendron? Let me know, I'll hook you up! Do you want to set up [your own pen plotter](../ly-drawbot-setup/) or make some quick and easy [screenshot memes](../meme-making/)? Awesome, I've written up my instructions and will do my best to set you up for success when you run/build/program your own self. 

  And also, once that plant/code has taken up residence in your home, it is no longer my responsibility. I'd love to hear about what you did to help it thrive, and if it starts looking sad I'll gladly help you think through what might help, but if it never thrives I'm probably not going to lose sleep over it. 

  Besides, once you've gotten as far as propogating the code/plant I've given you? You know about as much about the situation as I do---maybe more!---and now we can learn about the next steps together. Collaboration is one of my favorite aspects of both gardening and programming.

- **Universalization**: I don't necessarily care to engineer my houseplants to grow in every environment---and similarly, I don't feel a need to make my houseplant code fully generalizable! While I would love to know what you did to make a propogated plant flourish in your home, and if those are changes I could apply , I'll happily do so---but I am not necessarily going to do that work on my own, absent some larger goal.

- **Knowledge sharing**: I love reading about other people's houseplant projects. Do I want to take code cuttings for my own home? Occasionally! But mostly I just want to wander around and admire them, and hear about the woes encountered when figuring out how to help the code/plants thrive. I do not need to propogate someone's houseplant in my own home order to admire it, or just to learn from them that maybe I should consider a different watering scheme or fertilizer for my own existing plants. Same goes for their houseplant code. 

- **Capitalism**: One person's houseplants are another person's plant nursery. One person's houseplant code is another person's B2B SAAS product. Enough said.

- **Bugs**: Soil gnats. Where do they even come from?! It is unknowable. Similarly, smetimes my weather station shows me the icon for snow, even though it is currently April and the temperature isn't predicted to dip below 32. ¯\\\_(ツ)\_/¯ [^snowflake]

    TODO-image-snowflake

[^snowflake]: Okay, this one's not inherently specific to houseplant code! But the things I'm willing to do for my houseplants are different than the things I'd do for plants I was entrusted with professionally. Similarly, I am perfectly happy hacking together a janky working pipeline, waiting to see what breaks, and manually restarting a system that goes down. On a job? Nope, there'd probably be monitoring and tests and nice documentation for whoever needed to know how to provide care in my absence.

## When "It works on my machine" is the goal, not the excuse

Things I have found myself saying about my projects, almost apologetically:

- It works for me, but...
- It's held together with [string and electrical tape and visibly disorganized wires](../slide-whistle-trombone-champ-controller/)...
- I have to do [manual restarts after the power goes off](../clapping-music-for-flip-disc-displays/)...

In the world of houseplant programming[^potted] none of these statements are apology-worthy. In a workplace, about a project that is intended for productionization and mass dissemination? Sure, production-ready code---code that does a job, or provides the infrastructure for a job---needs to be some flavor of robust and tested and reliable. For a project that lives in my house and does what I need it to and periodically needs a little extra help? No biggie.

[^potted]: Should it be "houseplant programming" or "houseplant programming 🪴"? Unless Ryan weighs in definitively, I'll keep using the two interchangeably.

[Aditya Athalye](https://www.evalapply.org/) (another RC peer!) perfectly captures this vibe in the project description for his software project [`shite`](https://github.com/adityaathalye/shite?tab=readme-ov-file):

> `shite`'s job is to help me make my website: [https://evalapply.org](https://evalapply.org).
> Thus, `shite`'s scope, (mis)feature set, polish will always be production-grade, where production is "works on my machine(s)" :)
<span class="source">[[source]](https://github.com/adityaathalye/shite?tab=readme-ov-file)</span>

Strong "Everything I do is the attitude of an award winner because I have won an award" energy:

![Screenshot from Parks and Recreation, with text of the quote from just above this image](./assets/award.png)

Any code is production ready, if you redefine the scope of your production environment! 

## Not an idea, not yet a Platonic ideal

While I build software as a career, I also like to muck about with code in service of other goals. When sharing those other projects, it has taken me a long time be able to talk about what my code does do without adding a zillion caveats about what the code *does not* do.

Why? I think somewhere along the line I picked up the unhealthy---and false!---assumption that it wasn't worth sharing my code unless it was ready to be reused easily by whoever was able to access it---specifically, not sharing that code until it was "production ready," for some arbitrary and ever-growing version of "production" that I never *quite* fully defined for myself.[^perfectionism]

[^perfectionism]: If this is something you resonate with, I encourage you to look up "perfectionism" and some techniques for remedying it. Ditto "capitalism". 🙃

The ~~silliest~~ most insidious part of this polished-or-nothing approach is that I've never felt it towards other people's projects or code, only my own. I've loved hearing and reading about other people's ideas and attempts, regardless of whether the things they build could be reproduced or even if they resulted in any concrete output at all.

I've been actively working against this personal bias for several years now.
One thing that I've found really helps me is having clear, predefined terminology for my current phases of activity. Even if I then have to define those term for someone who isn't yet familiar with them, merely having the terms in the first place provides an emotional safety net.[^rebranding]
And thus, in the last year or so when presenting personal projects I've taken to saying that they're prototypes.

[^rebranding]: It may seem trite, but rebranding really has done wonders for my happiness---and therefore continued momentum---as a programmer. It feels bad to be monologing about a confusing situation, but [rubber ducking](TODO)? Great! I'm not necessarily thrilled to be slogging through cleaning up documentation, but I'm pretty happy to have [increased the bus factor](TODO)! 

The thing is, a lot of the personal projects I've built are *not* prototypes, even if they share a lot of the same characteristics of a prototype: they are a first-ish pass at bringing an idea to life, they *could* be turned into a more generalizable or generic Thing, they probably involve some context-specific configuration or defaults, and they're sometimes held together [with string and gluetack](../slide-whistle-trombone-champ-controller/).

While rebranding some of the projects I've built as "prototypes" has helped me feel better about sharing something not totally polished or fully documented with the world, I've also felt like the term somehow devalues what I've built. Sure, sometimes what I've built *is* a prototype! But sometimes, it's just a [weird little guy](https://www.patreon.com/posts/make-little-guys-112268885) of an idea, and doesn't need to be any more than what it already is. Just existing is enough,and I'm not necessarily interested in developing it into a less-weird less-little guy!

Thus: houseplant programming. Tiny software for just myself.

## Bouquet programming 💐

I'm going to spare us all a further brainstorm of plant/code parallels, with the exception of one spin-off term: bouquet programming 💐. 

I'm hereby defining bouquet programming as one-off code that is written for one specific user *to support one specific use-case*, in a non-recurring way. By definition, it needs no maintainance and is purely provided as documented proof of what once was living. Examples of bouquet programming: an analysis script in support of a one-time plot, a scrappy proof-of-concept or a [minimal reproducible example](https://en.wikipedia.org/wiki/Minimal_reproducible_example) written in service of a one-off use-case, etc. 

Bouquet programming is still worth writing home about (!) and sharing generously in the same ways as houseplant programming---or agricultural programming!---but is even *less* likely to work out-of-the-box than houseplant code, even if rerun by the same person who originally programmed it.

Examples of my own bouquet code: a script I used to scrape book cover images for generating miniature book covers, code run in service of helping a friend [prepare timelapse videos of her marbling process](../video-timelapses-with-ffmpeg/), etc.

While building bouquet projects, I still try to program with an eye towards future reproduction or generalization, while attempting to follow the [You Ain't Gonna Need It (YAGNI)](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) principle as much as possible.

[<img alt="Static Badge" src="https://img.shields.io/badge/&#x1F490;%20Bouquet%20-x?style=flat&label=Project%20type&color=1E1E1D">](https://www.hannahilea.com/blog/houseplant-programming)

Source: TODO-fix updated url
```
<a href="https://www.hannahilea.com/blog/houseplant-programming">
  <img alt="Static Badge" src="https://img.shields.io/badge/&#x1F490;%20Bouquet%20-x?style=flat&amp;label=Project%20type&amp;color=1E1E1D">
</a>
```

### Further reading

I quite enjoyed the sources Ryan cited in the original coinage, and encourage you to take a read. 

TODO-update these link texts
TODO-quote them
- [https://www.inkandswitch.com/local-first/](https://www.inkandswitch.com/local-first/ )
- [https://maggieappleton.com/home-cooked-software/](https://maggieappleton.com/home-cooked-software/)


I made myself a status badge for my houseplant repos. Feel free to use it!

[<img alt="Static Badge" src="https://img.shields.io/badge/%F0%9F%AA%B4%20Houseplant%20-x?style=flat&label=Project%20type&color=1E1E1D">](https://www.hannahilea.com/blog/houseplant-programming)

Source: TODO-fix updated url
```
<a href="https://www.hannahilea.com/blog/houseplant-programming">
  <img alt="Static Badge" src="https://img.shields.io/badge/%F0%9F%AA%B4%20Houseplant%20-x?style=flat&amp;label=Project%20type&amp;color=1E1E1D">
</a>
```

***Thanks to [Ryan](TODO) for the coinage and Alex for introducing me to strategies for recognizing and countering perfectionism.***

