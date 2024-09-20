# TODO_TITLE

A few weeks ago, [Recurser](@TODO) [ntiez](@TODO)[^ntiez]
 published [content-driven development](https://ntietz.com/blog/making-progress-with-content-driven-development), an excellent write-up of her approach to Doing Stuff in order to be able to Write About Doing Stuff™. Since first seeing that title, a rotating series of "___-driven development" phrases have not left my mind: I started with Spite-Driven Development (SDD), have currently been obsessed with Dopamine-Driven Development (DDD), and then shifted to a rapidly moment-by-moment characterization of my current task-and-motivation. Perhaps writing about it will help keep it in check, before it becomes my whole personality? We can only hope. (My current state, as I write this, is Muffin-Driven Development (MDD).[^MDD])

Sidebar: I've started using DDD and SDD in my various communities, and folks are running with it in a delightful way. I hope that XDDs become part of popular parlance, and to read about more XDDs in the near future. (Chaos-Driven Development, etc)

## What is a Driven Development, anyway?

If the *X*-Driven Development naming is a formal thing, I'm not aware of it---and in the spirit of "if you don't do a lit review, you can't feel so discouraged by prior art that you don't give it a try yourself!"[^litreview] 

Many software engineers (and possibly only software engineers?) are familiar with a process called Test-Driven Development (to be discussed shortly!), such that it is part of the gestalt [TODO: different word?] enough that we have an intuitive guess as to what a new -DD means: there's a reason ntiez's "Content-Driven Development" was so mentally sticky, and that I have said "Spite-Driven Development" to a number of software folks, with no additional definition, and been regaled with their own SDD experiences.

That said, there's no reason this needs to be a software engineering thing: in the same way that Test Driven Development could be applied to any number of other non-software domains[^TDDdomains] (FOO devising a rubric for your students' end-of-unit essays, recipes, fusebox, etc), there's no reason any other DD shouldn't bridge the engineering/non-engineering boundary.[^binaries]

[^binaries]: For another time: I pretty strongly believe that this isn't a real boundary, and that something something gatekeepy policing systems of power isms. Is the use of "boundary" here therefore a strawman argument on my part? Sure! Why not.

[^TDDdomains]: Okay okay, I would not take this *literally*---but it is possible to imagine what might happen if the test you are doing is broken without making it physically break, and therefore electrocuting yourself/using moldy fruit/FOO. The "understand what a failing case would look like so that you will know definitely that you have completed your task in a way that is NOT failing" point stands!

## TDD: The OG -Driven Development

The only formal framework with this naming convention that I'm aware of is *Test-Driven Development* (TDD). TDD is a well-known approach to software engineering [that was designed by FOO](TODO) to BAR. TDD defines both a specific approach to actually writing code (write a failing test, see that it fails, write the code to make the test pass, write the next failing test) and a general approach to software development that emphasizes testing *units of behavior* rather than units of code.[^TDDfeels] I've found that many engineers seem to have strong opinions about whether TDD is "good or not," which is a generalization that I don't think is particularly useful. 

[^TDDfeels]: This is a distinction that can be hard to learn, and while I do think it's important (and that TDD hate is often misdirected and comes after doing TDD wrong!), I'll leave you to read up on it elsewhere.

Early in my career, the company I worked at brought in a coach to give the engineering team a multi-day TDD workshop; at the time I was too junior to have Opinions™ around whether it was a useful overall development approach.[^junior] Now that I've experienced a bunch of different software development goals and contextual environments, I feel strongly that is extremely useful in the right contexts, and extremely not useful in others. 

[^junior]: Okay okay okay, I almost certainly had opinions, flavored by my typical cautious-optimism-slash-skepticism---I just didn't have the experience to back them up yet. And TBH I don't remember what they were, or if I'd agree with them now!

## Okay, so what does it mean to be a DD under this definition?

While I think it is funny to turn basically any noun into a DD (see also: Muffin-Driven Development!) I think the DDs that most resonate with me---those that will perhaps have staying power?---need to do at least one of the following:

1. Literally engage your efforts (i.e., development!), i.e. some action/unit of progress/etc must occur as a result of the framework, and/or
2. Literally motivate (i.e. drive!) the efforts. Just setting a scene isn't enough
3. Provide an operating scaffold for working through steps towards a goal, and/or
4. Provide a thought framework for reinterpreting a goal in a way that makes it achievable, and/or
5. Be specific enough to actually drive concrete, specific actions, and/or
6. Gets the practitioner into a flow-state: provides enough structure that "am i done with this current task?" and "how will i know if i am done with the current effort?" are easy to answer.

The following (brainstormed!) list therefore meets this criteria:
   - ntietz's publishing-driven development
   - Dopamine-driven development: if i do X, i will be given (attention/recognition/praise)
   - Spite-driven development: they said i couldn't do it, but i did it! [TODO: tiktok meme link] I am doing this to prove them wrong.
   - Panic-driven development and/or chaos-driven development: I need to do *something*, so i've done *something*. 
   - Insomnia-driven development (credit CCEckman)[TODO link]
   - Hammock-driven development: I will do the minimum of what needs doing to get me to the point where I can be in a hammock
    - Speedrun-driven development: I learned a new skill! Pairs nicely with D{opamine}DD and/or S{pite}DD.
    - Checkbox-driven development: Basically another flavor of DDD, but one where the tasks are known up front so can be written down and then checked off. See also: to do lists, pull request [punch lists](TODO).  
 
These do not (although you could probably convince me, if you gave a better description than my intuitive understanding!):
- Doomscroll-driven development: Doomscrolling takes time, but also, no intentional tasks have been accomplished (unless, of course, you have an active goal of "read X headlines" or "spend X hours being distracted)
- Calm-driven development doesn't count, as no resultant action is encouraged by "calm". Chaos-driven development, on the other hand, counts, as long as "chaos" is what is powering the resultant action

Like TDD, there's a time and a place for each approach; DDs can be used simultaneously. If *X* is driving your development, you are practicing *X*DD. 

## FAQs

Q: Ooh, I have a great idea for a DD! What now?
A: Bring it to life by using it! Or write it up in a blog post of your own (and share the link with me, please!)

Q: From the title, I was lead to believe that this post would focus on Spite-Driven Development---what gives?
A: Yeah, that's what I thought too, before writing it. Turns out I had a lot of other stuff to say first, and think that the phrase "Spite-Driven Development" actually is fairly intuitive---if you've never built something purely because someone else was a hater, keep an eye out for your opportunity to do so! :) [TODO: quote RC Chris here?] 

Q: Okay, but I have a job to do. What about, like, Paycheck-Driven Development? Or Healthcare-Driven Development?
A: Those are totally fine DDs if they work for you! Personally, I don't find they meet the "specific enough to drive my actions" criteria, despite being one of many general motivations.

Q: It seems like an awful lot of these overlap. Or like you'd use multiple at once.
A: That isn't a question, but you're totally right. I am often powered by both DDD and TDD! I contain multitudes. So do you.

Q: I have a really cool idea for one: String-Theory Driven Development! But the acronym has...other connotations. What gives?
A: That's on you, friend. I have confidence that you can use a trusty thesaurus to find an alternate name. Or don't! Own it!

## A short brianstorm of DDs
- PDD: Procrastination-driven development. This is a dangerous one if unrecognized, but also a highly productive one that (if part of an OSS community or a larger tech org) exchanges apparent productivv praise at the expense of personal progress towards whatever is being procrastinatted from. If wielded strategically, it can be used to make progress towards two separate goals, by avoiding one in service of the other and then switching back as the next task up becomes less desirable.
- TrDD: Troll-driven development.
- LDD: Love-driven development (or GDD---gift-driven)
- DDD: Dopamine-driven development. Umbrella term, a bit. Differs depending on the person and task---for me, can come from the praise of sharing it (i.e., overlaps with Maddie's content-driven development). Related DDs: Checklist-Driven Development, Carrot-Driven Development.
- Speedrun-driven development. You've learned a new skill! Congrats! Now you apply it as quickly as possible to everything you can pattern match against. (How have I done this/seen this done? A winning change to a repository configuration; a pattern in which clicks were caused in audio due to erroneously jumping params; learning a new part of a large and complex system, and then going in and fixing as many [now] low-hanging bugs as touch it.  


[^MDD]: I chose a time to make muffins[^recipe] that cut a liiiiiiittle too close to my time to attend the weekly Publication Accountabilibuddies[^hi] writing session I frequent, such that I am only now coming down from the adrenaline of only barely getting them in the oven in time. The next step is to write enough before the timer goes off that I feel good with the progress I've made. The step after that? Eat muffins. 

[^hi]: Shoutout to my regular co-writing buddies [cceckman]() and [piya]()!

[^recipe]: This recipe (in muffin format) is phenomenal. Sub whole oats for coconut if you want to flashback to midwest autumns as you consume them.

[^ntietz]: All of her writing is excellent, I recommend checking out other posts!

[^litreview]: ...this requires a whole therapy session unto itself, I now realize...



--- 
- created: 2024-09-20
- last updated: 2024-09-20
- tags: musings, brainstorm, techspeak
