---
title: 'Text of the wild: Push notifications from your BirdNET-Pi'
type: Tutorial
tags: [birb-creeping, houseplant-programming, passive-acoustic-monitoring, birdnet-pi]
description: 'TODO'
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

The good BirdNET-Pi folks have made this trivially straightforward to set up, thanks to an [apprise](https://github.com/caronc/apprise) integration. Apprise is a library that enables us-as-users to send notifications via the service of our choice. Apprise [supports a huge number of notification services](https://github.com/caronc/apprise#supported-notifications)---you may be familiar with some subset of TODO,TODO,TODO---from which I decided to use [ntfy](https://ntfy.sh/).[^choice]

[^choice]: This choice was due to a number of factors: source (open), price (free), sign-up (none), features (the ones I wanted, lol), access (not linked to proprietary device or app, subscribable from my phone), recommendations (from Recurse Center peers), difficulty to configure (none).

ntfy is a publication/subscription (pub-sub) service. You (or anyone else) publishes a message to the ntfy stream of your choice, and then anyone (or you) subscribed to that stream can read that message. 

For example, you can do this right now:
1. Go to https://ntfy.sh/app in your browser, no need to sign in
2. "+Subscribe to topic" with topic "big-old-string-of-text-that-is-likely-somewhat-unique"
3. In your terminal, post a message to that thread, e.g.,
```
curl -d "Hellooooooooo " ntfy.sh/big-old-string-of-text-that-is-likely-somewhat-unique
```
4. ...see it come in! 
5. Note the security/privacy situation around these messages, namely, there is none. :D

![TODO](./assets/ntnf-demo.gif)

ntfy is an incredibly powerful service for folks with some basic non-private notification needs.

Something worth being very clear about up front: _The free version of ntfy has no privacy._ Any message you post to it can be viewed by anyone. It is not likely that these messages will specifically be linked to you, unless you share the URL, but you should not post anything to it that you are not comfortable being fully public. For my case, the messages posted are only ever specific bird detections; while someone could theoretically use this information to be creepy, I don't think they would be able to learn more from the notification stream than they'd already be able to find out elsewhere.[^privacy] While it is possible to pay for a private version of ntfy, or host it yourself, that is beyond the scope of this tutorial and I can't speak to its details.

[^privacy]: TODO: that link from slack

### Set-up instructions

To use ntfy with BirdNET-Pi, we will therefore choose a unique-enough channel, tell BirdNET-Pi to post to that channel (via its UI set-up screen), and then subscribe to that stream through the application of your choosing: the default web application (if you want desktop notifications about your birds), an application on your phone (if you want push notifications from your birds), or some other service (if you want to do something fancier). You can subscribe as many devices as you like to listen to your ntfy BirdNET-PI feed. Everyone in the household can be a part of the fun![^fun]

[^fun]: Fun or "fun", you decide. Or they decide. :D

This process is straightforward---let's step through it!

1. Choose a unique-enough channel name. I'd recommend generating a universally unique identifier (UUID), which you can generate [here](https://www.uuidgenerator.net/version4). It should look something like "1cb879d7-2c2e-40a4-8c3b-c5343babd810".
    - The goal here is choosing a channel name that no one else is likely to be posting to, so that you don't get THEIR notifications in addition to your own. Also the more obscure it is, the less likely it is that someone else will guess it and know to associate it with you, specifically. (If that association would be a problem, then you may want to reconsider using ntfy as your BirdNET-Pi text solution---take a look at the other services supported by apprise and choose one with a privacy approach that matches your needs.)
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


***Thanks to friend S, for setting up their first BirdNET-Pi and encouraging me to create this follow-up!***
