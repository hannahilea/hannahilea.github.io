---
title: 'Text of the wild: Set up phone notifications for your BirdNET-Pi'
type: Tutorial
tags: [birb-creeping, houseplant-programming, passive-acoustic-monitoring, birdnet-pi]
description: 'Tutorial for configuring your BirdNET-Pi installation to use ntfy to send your phone push notifications whenever a rare-to-you bird starts yelling'
created: 2026-05-21
published: Thu, 21 May 2026 19:40:41 EST
---

<br>
<div class="alert" style="background:#e8ebf5; padding: .5em;">
<summary class="alert-heading">Previous posts in the BirdNET-Pi series:

- [Intro to BirdNET-Pi: Eavesdropping on my feathered (and how you can, too!)](../birdnet-intro/)
- [Set up a BirdNET-Pi on a Raspberry Pi Zero 2 W](../birdnet-setup)

🐦‍⬛</summary>
</div>

Now that you've set up your BirdNET-Pi, perhaps you want to get texts whenever a new bird ~~enters the ring~~ yells in your yard?

![TODO](./assets/TODO-photo-of-text)

The BirdNET-Pi folks have made this trivially straightforward to set up, thanks to an [apprise](https://github.com/caronc/apprise) integration. Apprise is a piece of code that acts as a switchboard among a huge number of [notification services](https://github.com/caronc/apprise#supported-notifications), so that notifications can be sent to the service of one's choice: TODO,TODO,TODO.

I wanted to receive notifications on my phone whenever a new-to-my-yard bird starting making noise, so from these notification services I decided to use [ntfy](https://ntfy.sh/). This was due to a number of factors: source (open), price (free), sign-up (none), access (not linked to a proprietary device or application; subscribable from my phone; not linked to a single account, so that my spouse can also receive the same notifications), recommendations (from [Recurse Center](https://www.recurse.com/) peers whose approach to software tend to line up with my own), and difficulty to configure (none). If you have different notification needs, you may want to use a different service than ntfy, but your set up on the BirdNET-Pi-side will be roughly the same.

[ntfy](https://ntfy.sh) (pronounced "notify", apparently!) is a [publish-subscribe (pub/sub)](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) service. That means that publishers (in our case, the BirdNET-PI) publish messages to a ntfy topic (e.g., `ntfy.sh/my-fun-topic`), and then anyone who subscribes to that stream (you! your cat! your neighbors, if you tell them about it!) can read those messages.

For example, you can do this right now:
1. Go to https://ntfy.sh/app in your browser, no need to sign in
2. "+Subscribe to topic" with topic "big-old-string-of-text-that-is-likely-somewhat-unique"
3. In your terminal, post a message to that thread, e.g.,
```
curl -d "Hellooooooooo " ntfy.sh/big-old-string-of-text-that-is-likely-somewhat-unique
```
4. See it show up in the browser!

![TODO](./assets/ntnf-demo.gif)

5. Realize that anyone else who subscribed or subscribes to this topic will _also_ see this message, and recognize the privacy situation around these messages---namely, none. 😅

While ntfy is an incredibly powerful service for folks with some basic non-private notification needs---like ours, for these birds!---it is important to know that _the free version of ntfy has no privacy._ Any message you post to it can be viewed by anyone. It is not likely that these messages will specifically be linked to you, unless you share the URL, but you should not post anything to it that you are not comfortable being fully public.

If you decide this doesn't fit your needs, it is possible to pay for a private version of ntfy, or host it yourself, which would ameliorate the privacy concern. I've never done it myself, but it seems reasonable!
The messages we'll be posting from BirdNET-Pi will only include specific bird names, not locations or addresses or personal contact info. While someone could theoretically use that information to be creepy, I've decided that I don't think someone would be able to learn more from my public bird notification topic than they'd already be able to find out elsewhere.[^privacy] Well, if there was one particularly rare bird that was migrating through a particularly narrow region, and you noticed it show up on my topic at a certain time, you might be able to triangulate where I live---but not any more precisely than with other data that is already public, for better or worse.[^worse]

[^privacy]: TODO: that link from slack

[^worse]: Worse. DEFINITELY worse.

### Set-up instructions

To use ntfy with BirdNET-Pi, choose a unique-ish topic name, tell BirdNET-Pi to post to that ntfy topic (via its website settings page), and then subscribe to that stream through the application of your choosing: the default web application (if you want desktop notifications about your birds), an application on your phone (if you want push notifications from your birds), or some other service.

This process is straightforward---let's step through it!

1. Choose a unique-enough channel name. I'd recommend generating a universally unique identifier (UUID), which you can generate [here](https://www.uuidgenerator.net/version4) or choose [here](https://everyuuid.com/). It should look something like "1cb879d7-2c2e-40a4-8c3b-c5343babd810".
    - The goal here is choosing a channel name that no one else is likely to be posting to, so that you don't get _their_ notifications in addition to your own. Also the more obscure it is, the less likely it is that anyone who randomly stumbles across it will know to associate it with you, specifically. Nothing is stopping you from making something more human-readable, but keep the obscurity concern in mind if you do. I intentionally do not use `hannahilea-birdnet-notifications`. :)
2. In the BirdNET-PI advanced settings page, TODO. Set the message as
    ```
    1cb879d7-2c2e-40a4-8c3b-c5343babd810
    ```
    and hit save.
    ![TODO](TODO-screenshot)

3. Test that this subscription is configured correctly, via subscribing to your new channel via the [web app](https://ntfy.sh/app). (You do not have to sign in or make an account to do this).
    ![TODO](TODO-screenshot)

    From BirdNET-Pi, hit "send a test message". You should see it show up in the browser.

    If not, double-check that you are sending to the correct message by sending a message from your terminal:
    ```
    curl FOO BAR <your id>
    ```

4. Time to subscribe to these notifications from your phone!

    1. Download the relevant application:

        - I use an iPhone, so I use the [TODO](todo) app.

        - If you are on a different device, you'll have to follow their steps for set-up, although I suspect your choices will be similar to mine.

    2. Configure it by doing TODO

That's it! Go forth and be notified! You will likely want to go back to step 2 and tune your notification settings, as you decide you want more or fewer words from your birds.

Astute readers will notice that even though they are now being notified when they are away from home, they cannot see their BirdNET-Pi website unless they're on their local home network. Woe! What is a fellow to do when they receive note that a kestrel was detected, but have no way to investigate?!

...luckily there *is* a way, short of rushing home as quickly as possible: viewing your installation from anywhere in the world via tailscale. Ensure you've followed [the steps to install tailscale in the set-up guide](TODO), and then add the link to your BirdNet-PI as a web bookmark on your phone. Then, if you get a notification of something Exciting™, you can simply (1) turn on Tailscale on your phone (if it isn't always running!) and then (2) view your BirdNET-PI page at its tailscale link.


***Thanks to SM, for setting up their first BirdNET-Pi and encouraging me to document this next step!***
