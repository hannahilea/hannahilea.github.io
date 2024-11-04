--- 
title: "Dopamine-driven development (DDD), spite-driven development (SDD), and other DDs"
tags: musings, brainstorm, techspeak
created: 2024-09-20
updated: 2024-09-20
---

A few weeks ago, [Recurser](https://www.recurse.com/about) friend Nicole Tietz-Sokolskaya
published [Making progress on side projects with content-driven development](https://ntietz.com/blog/making-progress-with-content-driven-development), an excellent write-up about Doing Stuff in order to be able to Share About Having Done Stuff™. You should read it!

Unfortunately for me, her denomination of "Content-driven development" tripped some switch in my brain, and since then a rotating slate of "X-driven development" variations have taken over. I started with obsessing over spite-driven development (SDD), am currently on a dopamine-driven development (DDD) kick, and have (today) shifted to a rapidly changing moment-by-moment characterization of my actions: feed-the-cat-driven development (FCDD)! Coffee-shop-driven development (CSDD)! Beat-the-rain-home-driven development (BRHDD)!  Perhaps writing about it will help me keep the situation in check, before it becomes my whole personality?[^personality] We can only hope. In the meantime, I am writing this post following muffin-driven development (MDD).[^MDD] 

## What is a "driven development", anyway?

Many software engineers (and possibly *only* software engineers?) are familiar with a process called  [*test-driven development* (TDD)](https://en.wikipedia.org/wiki/Test-driven_development). TDD is the OG "driven development": it defines both a specific approach to writing code (write a failing test, see that it fails, write the code to make the test pass, write the next failing test, repeat ad nauseam) and a general approach to software development that emphasizes testing *units of behavior* rather than units of code.[^TDDfeels]

TDD is part of the gestalt; there's a reason Nicole's "content-driven development" was so mentally sticky, and that when I have said "spite-driven development" to a number of software folks, I have immediately been regaled with their own relevant experiences, no additional explanation necessary.

As far as I'm aware, the "*X*-driven development" pattern isn't a widespread naming approach. There are at least a couple less prevalent software engineering practices pattern-matched on TDD in definition and naming, but nothing sweeping.

Also, there's no reason this needs to be a software engineering thing: in the same way that test-driven development can be applied to any number of other non-software domains (devising a rubric for your students' end-of-unit essays; picking a metric with which to evaluate your microbiology experiment; etc)[^TDDdomains], there's no reason any other DD shouldn't also bridge the nominal engineering/non-engineering boundary.

[^TDDfeels]: I've found that many engineers seem to have strong opinions about whether TDD is "good or not," which is a generalization that I don't think is particularly useful. I also think TDD hate is often misdirected and comes after not following the actual practices! Early in my career, the company I worked at brought in a coach to give the engineering team a multi-day TDD workshop. At the time I was too junior to have strong opinions about it; now that I've experienced a bunch of different software development goals and contextual environments, I feel strongly that is extremely useful in the right contexts, and extremely not useful in others.

## Proposed "driven development" criteria

While it's fun to turn basically any noun into a DD (see also: muffin-driven development!), I think the DDs that most resonate with me (and feel like actual techniques) meet at least some of the following requirements:

1. Leads to (and/or actively motivates) effort on the part of the practitioner, i.e. some action/unit of progress/etc must occur as a result of the technique that would not occur absent it, and/or
2. Provide a thought framework for reinterpreting a goal in a way that makes it achievable, and/or
3. Provides an operating scaffold for working through steps towards that goal.

In short, "*X*-driven development" must aid the practitioner in making desired progress towards some goal, by means of *X*. If *X* is driving your development, you are practicing *X*DD. 

Like TDD, there's a time and a place for each approach, and multiple DDs can be used simultaneously. 

## X-driven development examples

Some DDs I've identified as using most often myself, in no particular order:

#### Dopamine-driven development (DDD)

If you accomplish a task in a particular way, you will be given some combination of attention, recognition, and/or praise; if you break it down further into specific subtasks, you'll maximize the amount or type of praise per unit of work. DDD is a super-technique that overlaps with many niche driven-developments; for example, Nicole's content-driven development can be a subtype of dopamine-driven development.

#### Checkbox-driven development (ChDD)
Another flavor of DDD, but one where the tasks are known relatively well up front so that they can be written down ahead of time and then checked off systematically. ChDD encourages breaking tasks down into stupidly small units, so that progress through the list feels smooth and positively reinforcing. See also: [First things first: Make a list](../make-a-list).

#### Procrastination-driven development (PDD)
This is a dangerous one if unrecognized, as it is a variation of DDD that runs counter to the most important task on your task list. If wielded strategically, however, it can be used to make progress towards two separate goals, by avoiding one in service of the other and then switching back as the next task up becomes less desirable. For example, instead of doing my laundry, I am stalling by editing this post.

#### Spite-driven development (SDD)

Need I define this one? Everyone I've mentioned it to has their own example of it; I've love to just list those here, but they were discussed confidentially SO ask your friends about this. They will surely have their own examples.

The overarching theme is one of 

> They said that I couldn't do it, so I went and did it
>
> -- Connor Price

and/or "I am doing this to prove them (the great them) wrong", and/or "they said not to do it this way so I did it this way", and/or "I warned you that this will go badly and you said to do it anyway" , and/or ... you get the picture. 

If you have never experienced SDD, congrats, you must be exceptionally forgiving (or exceptionally disengaged, in a probably good way!). Also, consider giving it a go sometime, it can be pretty fun! 

If you realize that you're practicing SDD regularly, you may want to consider an attitude readjustment or a job and/or community change.

#### Speedrun-driven development (SrDD)
You've learned a new skill! Congrats! Now you apply it as quickly as possible to everything you can pattern match against. 

SrDD is a subtype of DDD, and can pair nicely with SDD on occasion. For example, I once spent a Certain Amount of Time (on the order of days) investigating how a particular type of audio artifact (click) was being introduced by one of my team's algorithms; it took me a while to understand the underlying pattern, but once I did I was able to solve a bunch of similar  bugs (both filed and un-filed) in a relatively short period of time. Whew. Exhilarating! 

#### Swear-driven development (SwDD)
Welp, the deadline is tomorrow, regardless of how long you gave yourself to work on it. Better cut some scope, cut some expectations, and use the power of pure adrenaline---and some well-timed expletives---to Get. It. Done. Also encountered if you have limited time booked on a piece of equipment, and need to (random crazy example) cut a certain number of pieces on the laser cutter in a too-short amount of time. (Can pair nicely with content-driven development, if the task involves some flavor of presentation.) If wielded adeptly, can stem from initial anti-patterns such as hanger-driven development,  and under-the-thumb-of-capitalism-driven development.

#### Dancing-driven development (DDD)
You're feeling sluggish about working on a fairly mundane and repetitive task, but you put on a jam and now you can't help but power through it. Often involves head-bobbing and chair dancing; can be counter-productive if the music is too good, so an effective practitioner must balance the chosen music against the current task.

#### Service-driven development (SrvDD)
Someone in your community needs or wants something, and you know how to make it happen for them! For me, this often shows up when making a present or acting as tech support. When used as the target of PDD, SrvDD can be a double-edged sword. (Alternative name: love-driven development (LDD).)

<div class="centered-children"><p>***</p></div>

...and those are my big ones! I've found it useful to classify my motivations like this; it has been helping me provide a sanity-check about the goal of a given task, as well as help me recognize when I've unintentionally gone off-task. I've also found that DD terminology does a nice job of succinctly communicating my current state to others. It'll be interesting to see if I feel like using the terminology longer term, or if it's just a short-term meme. 

I've started using DDD and SDD conversationally, and folks in my circles have run with it in delightful ways---both by sharing their own examples of spite-driven development (it's the one that seems to stand out!!) and by coining new "driven development" techniques. Keep 'em coming! 


## FAQs

**Q:** *Ooh, I have a great idea for a DD! What now?*</br>
**A:** Bring it to life by using it! And/or write it up in a blog post of your own (and share the link with me, please)!


**Q:** *Okay, but I have a job to do. What about, like, paycheck-driven development? Or healthcare-driven development?*</br>
**A:** Those are great DDs if they work for you! Personally I find that I usually need a more specific technique to drive my efforts on an minute-by-minute basis, but it's all context dependent. 


**Q:** *It seems like an awful lot of these overlap, or maybe are even exactly the same, with a different name. Or like you'd use multiple at once.*</br>
**A:** That isn't a question, but you're totally right. For example, I am often powered by both DDD and TDD, with an occasional background smattering of SDD! I contain multitudes. You probably do too.

**Q:** *I have a really cool idea for one: string-theory driven development! But the acronym is...not ideal. What gives?*</br>
**A:** That's on you, friend. I have confidence that you can use a trusty thesaurus to find an alternate name. Or don't, and own it!

[^personality]: Get-it-out-of-my-brain-driven development (GIOMBDD)

[^MDD]: I chose a time to make [muffins](https://smittenkitchen.com/2020/10/morning-glory-breakfast-cake) that cut a liiiiiiittle too close to the Publication Accountabilibuddies session I frequent, such that I am only now coming off the adrenaline of getting them in the oven in time. The next step is to write as much as possible before the oven timer goes off. How will I know I'm done? There will be words on my page AND a muffin to consume. Muffin-driven development!

[^TDDdomains]: Okay okay, I would not necessarily take TDD *literally* in many domains---but it is certainly possible to think through the "what-ifs" to understand what a failing case would look like, and then what a successful case looks like. And it seems like (from the [TDD wikipedia page](https://en.wikipedia.org/wiki/Test-driven_development)) this cross-domain adoption is something that folks already do. Good!




