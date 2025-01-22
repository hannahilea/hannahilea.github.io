---
title: 'Setting up email notifications for new blog posts'
rawtitle: TODO-or-delete
type: TODO-e.g.-musing-project-write-up-tutorial-etc
tags: [meta, website, bodge]
description: 'TODO'
created: 2025-01-21
updated: 2025-01-21
published: Tue, 21 Jan 2025 12:00:41 EST
---

So, say you want to know when I've written new blog posts, but you don't want to have to manually check my site every few hours (or every day, or every week, or once a month). What do you do?[^iff]

[^iff]: If you already know the answer to this, then you aren't the intended audience for RSS portion of this post! Stick around for the how-to part, maybe?

One option: you could **subscribe to my RSS feed**! RSS is a really cool technology that is both (a) available to everyone, regardless of tech knowledge and (b) hidden behind a ` m Y s T e R i O u S ` acronym that likely makes it seem (to yon average layperson) like something Secret and Technical, meant only for Computers and the People Who Know Secret Computer Stuff.[^secret]

[^secret]: To be clear, I do not believe in Secret Computer Stuff, I believe the only thing standing between you and some Arcane Knowledge is having that knowledge explained in an intentionally accessible way, and that everyone is responsible for explaining their own shit.

A new option: you can **sign up for my mailing list**, such that you'll get an email when a new post is published!
<div class="centered-children">
<div class="blog-footer">
<a class="button" href="http://groups.google.com/group/hannahilea-blog-rss" target="_blank" rel="noreferrer noopener">Subscribe via email</a>
</div></div>

If all you want is to subscribe, you can stop reading here...but I'd encourage you to at least read the following section about RSS, so that you know what is available to you (and why it is neither mysterious nor challenging to use)! 

And if you have your own site, and want to set up a similar auto-email setup to mine---i.e., without paying for some external service---the last section is for you. 

## RSS: Really Simple Syndication / RDF Site Summary / Reader Subscribes Selectively

What does RSS stand for? Apparently both [Really Simple Syndication and RDF Site Summary](https://en.wikipedia.org/wiki/RSS)---but don't worry about that. The important thing is what it *is*, and what it is is a communication protocol used by content creators to share updates in a way that content aggregators can read them. 

In more basic terms: when someone adds new content to their website, they update a consistently-formatted menu of all things posted to their site. Because the formatting is consistent across the whole internet (!), other services can pay attention to those menus and check them for new content, and then let you (the reader) know about that content in a way that is convenient to you.

Basically, using an RSS feed is equivalent to having a facebook or bluesky or bikbok feed---but for the whole internet.

### Aggregators 

There are loads of services that make this possible: 

## Email subscription 

Right, so I started off by telling you that you could subscribe by email to this site, instead of via RSS. How did I set that up?

My needs:
- trivially easy setup
- no maintainence (after initial set-up)
- no cost
- fully automated (i.e., subscribers can self-serve subscribing and unsubscribing)
- easy to change in the future (i.e., i have access to the subscriber list so that i can easily move it elsehwere if my needs change)

There are [various services](https://buttondown.com/alternatives) that offer email subscriptions, but I didn't find one that met all of the above requirements, so decided to set up my own on top of a google group.

Using a google group meets the above needs, while adding a few limitations that I was willing to take on (at least for the time being):
- bought into the google ecosystem! yeah, this one is annoying, but i'm already bought in in other ways, so this isn't a new constraint
- requires subscribers to have a google account (i think) that they can sign up with *TODO: check this out 
    i'm okay with this one b/c i think the same set of folks who'd prefer an email subscription over the raw RSS feed probably also either use or are willing to use google services, and/or already have a burner gmail account setup. 

Having the group allows folks to add or remove themselves via the Google Groups interface, so that's that need sorted. What about the automation piece? I *could* manually send an email after each new post, but I really don't want to have to think about it.

### The automation pipeline 

I settled on using IFTTT to handle the automation piece for me. IFTTT does ____. 

IFTTT's free account allows users to make 2 free automations (cool, I just need the one!), and also has a limitation that it only checks for (and responds to) posts from RSS feeds once an hour. That's fine by me---most days I don't post anything, much less on a sub-hourly basis, and no one is going to look for breaking updates from this site (I hope!!). 

The other additional piece here was signing up with a new gmail account that would be used purely for sending notifications from IFTTT to the google group. While I could have used my normal email address for this, I don't love the idea of having anything sent automatically from my primary account. I don't mind it coming from this new account, which I wouldn't otherwise be using for any other purpose. 

### The specifics

Here are the steps I followed, and that you'll want to follow to recreate the same pipeline:
1. Signed up for a new gmail account
    1. ...and set that account to forward any incoming mail to my primary email (I don't expect anyone to use it, but if they do, I'd like to know about it!)
2. Signed up for an IFTTT account using that new gmail account 
3. In IFTTT, added an IFTTT automation with the following settings: TODO
4. Created a google group, then subscribed both my normal email and the new gmail account to it (I want to receive the same set of messages that my subscribers receive, so that I can see if there's anything wonky happening).
5. I set the permissions as follows, so that my new gmail account 

I considered having the automation email the whole post to subscribers, but decided against it for two reasons: (1) I don't want to have to think about how the content is formatted in an email, and whether it looks good, etc; and (2) more importantly, I often post stuff and then realize I have spelling or formatting errors that I need to fix. I'd rather not have those errors memorialized in the inboxes of any subscribers!





***Thanks to TODO.***
