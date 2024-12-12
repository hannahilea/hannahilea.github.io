---
title: 'Sick Doots: Playing Trombone Champ with a slide whistle'
type: project-write-up
tags: [TODO]
description: 'TODO'
created: 2024-12-05
updated: 2024-12-05
published: Thu, 5 December 2024 15:54:52 GMT
---

Are you familiar with the video game [Trombone Champ](TODO)? If not, I am delighted be your first introduction to the best cursed game since the [Untitled Goose Game](TODO):

TODO-video of TC

When I first saw TC, my initial thought was HELL. YEAH. When I first played it, I realized that cool as it was, using a mouse (or trackpad) to control the trombone was just not putting me in the zone---I really needed to physically embody a trombone god, or at least, what I imagined how being such a god would feel.[^disclaimer]

[^disclaimer]: For the record, I am a flute/sax player and do not, nor have I ever, played a brass instrument. A disproportionate number of my friends do, though, from which I surmise that I am at heart a brass player---though this is neither the time nor place to delve further into *that*! 😅

How, I wondered, could I easily and cheaply---in both dollars and time---replicate the physical slide motion in order to play this game? I found a few other folks online who'd made 3D printed trombone champ controllers that looked like tiny trombones, but those didn't quite suit my needs. Enter: the humble slide whistle. 

After drawing [the rest of the fucking owl](TODO), I give you my entry in the Trombone Champ controller pantheon: wireless,[^wireless] easy to replicate, and delightfully slide-y:

[^wireless]: "Wireless" in the "is not physically tethered to the computer running the game" sense of the word, to be clear; their are quite visibly physical wires involved!

TODO-pic of mine

It's worth noting that this is one of those projects that I started, didn't touch for a year, and then picked up to finish recently---and in that time, Trombone Champ has released a Nintendo Switch variant and announced a pending virtual reality variant, both of which provide slidier control options for game play. At time of writing, I've seen controllers that are [3D printed](TODO) and [made from real trombones](TODO). Cool! There can be no such thing as too much Trombone Champ.[^bystanders] 

[^bystanders]: Bystanders, roommates, and pets may disagree.

## Design 

My basic design goals:
1. Relatively cheap, easy to build (for me)
    a. Corollary: Relatively cheap, easy to replicate by anyone else
2. Playable in/by a crowd, i.e., easy to share with a friend without sharing viruses

Starting from a (cheap!) slide whistle allowed me to sidestep designing and fabricating a controller body, plus was in the TC spirit of not taking itself too seriously.[^whistle] After perusing the [vast and lovely Adafruit tutorials](TODO) I decided to use an Adafruit Feather Express as my microcontroller, as it natively supports Bluetooth and there are a lot of existing well-documented projects built on it---and more importantly, built in Python/CircuitPython, which met the "easy to build (for me)" criteria on the software side.

[^whistle]: TODO - insert video of spike jones or something

On to sensor selection. I needed at least two inputs: a continuously varying 2-dimensional input to map to the y-axis (up/down) controll of the original mouse input, and a binary on/off input to map to the mouse-or-keyboard-button-push that triggers sound production in the game. 

The continuous sensor choice was relatively straight-forward: I picked out a couple lengths of slide potentiometer from Adafruit, with the plan of attaching the component to the slide whistle's body and coupling the slider knob to the slide's whistle. I had a few backup plans if that didn't work, but luckily the longer of the potentiometers was perfect.

The binary sensor choice was a bit more constrained. What would be REALLY nifty is if it was breath-controlled, and I considered using a cheap microphone and writing a noise gate for the input. However, goal 2 presented a bit of a reality check: I know from my early days learning flute just how gross it is to swap instruments around a group of people, and how annoying it is to have to clean the lip plate of a flute's head joint off with rubbing alcohol before passing it to someone else to play, and I would *never* hand my sax to someone else to play unless they swapped in their own mouthpiece and/or reed, and I couldn't picture a sanitary way of setting up a microphone on the slide whistle's mouthpiece in a way that would be both playable and would discourage putting one's mouth directly on/around the mouthpiece. SO. That was out.

There are of course other ways to measure breath, but (also in the spirit of goal 2) it didn't feel particularly easy or swappable to have to hook a user up to a physical respiration monitor of any sort. Perhaps as a future improvement! For now, I decided to go with a basic button. Alas!

The button I originally ordered didn't feel trivially clicky enough---it took too much finger movement to trigger it. Luckily we had a few other buttons lying around the house, so I picked the one that required the least amount of motion and strength to trigger. Using a button for this sensor is...fine? I don't love it, but it is perfectly serviceable. I do think something more breath-based would be nicer, though, and I think it's the weakest part of this controller, spiritually. :) 


## Hardware assembly 

So back where design goal 1 specified "easy (for me)", I cheated a bit: I am still getting my sea legs around electronics design and implementation, so knew that "just" assembling everything would NOT actually easy for me, but I included "easy to ask for assistance" under the "easy" umbrella. Which is to say Alex Ferguson is responsible for creating/designing this section of the project!

We (she) first stuck all our components in a breadboard and got the sensors hooked up to the Feather (microcontroller). 

The resultant circuit looks like this:

TODO-circuit diagram

I then did the software implementation described in the following section to make sure that I was able to convert the sensor input to Bluetooth "mouse" output. Once we were satisfied with the behavior, we (Alex) attached the Feather and components to the slide whistle with a fun combination of hot glue, embroidery thread, and gluetack (to keep the flat backs of e.g. the potentiometer stable on the round body of the whistle), and then did the requisite soldering between those components.

Disclaimer on her behalf: Alex wanted to make a much more professional, beautifully wired version of this controller, but I was adamant that because it was a quasi-hacky prototype, string and electrical tape and visible disorganized wires were totally par for the course, and if it looks messy? It's because it is, and that's okay. She was eventually swayed, but clearly still has some Feelings™ about it. :D 

## Software 

I used [this](TODO) tutorial as a starting point for writing CircuitPython that would map the sensor inputs to mouse outputs, and then send those via Bluetooth. Luckily there are nice CircuitPython libraries for both Bluetooth and HID (TODO) interactions, which made this fairly simple.

The pseudocode for the run loop is something like this:
```
# Setup 
slide_potentiometer = connect_to_analog_pin(1)
button = connect_to_digital_pin(2)
hid = setup_mouse_controller()

def map_voltage_to_screen_min_max(): 
    ...

# run loop 
while True:
    y_previous = 0
    button_is_pressed = False
    
    ...try to connect to bluetooth...

    while bluetooth_connected():
        # Handle slide behavior
        slide_voltage = slide_potentiometer.get_voltage()
        y_now = map_voltage_to_screen_min_max(slide_voltage)

        # The library expects a *relative* mouse movement, not an absolute one
        hid.send_mouse_y_update(y_previous - y_now)
        y_previous = y_now

        # Handle click behavior 
        button_state = button.get_value() # Returns true/false 
        if button_state != button_is_pressed:
            if button_state:
                hid.send_mouse_left_button_down()
            else:
                hid.send_mouse_left_button_up()
            button_is_pressed = button_state

```
There's some extra stuff in there where I disable sending commands from the controller if the reset button onboard the Feather has been pressed, but otherwise, other than some additonal setup, it's basically that!

The full script is [here](TODO). I'm new to organization of this type of microcontroller project, and still looking for ways to do it nicely---especially for future larger-scoped projects---so if you have feelings about good practices in this space, please let me know.

The hardest part of the software implementation was something I didn't end up needing to write at all: because of how we'd put the Feather in the breadboard, our connection between the input pins and the sensors was tenuous at best, which lead to a voltage jump in the potentiometer while the button was pressed. At the time we didn't realize that the cause was the breadboard/Feather connection, so I thought I was going to have to program around it, and spent a fair amount of time thinking about how I might do that (definitely doable, just an annoying exercise in bookkeeping!). Then as soon as we soldered everything together we discovered that the jump was gone, and figured out that the breadboard connection had been tenuous. Huzzah!

## All together now! 

Once the controller was set up, connecting it to play Trombone Champ was trivially easy:
1. From computer, look for (and connect to) bluetooth device "Trombone Champ Controller"
2. Open TC via Steam 
3. ...that's it. If you move the slide back and forth, the mouse goes up and down on the screen. (Of course, you don't need to have TC open for the controller to function---you can also, e.g., scroll a website that way. Did we do this? Absolutely. :joy:)

- It's fun. :D And super goofy. And tbh, it isn't that much harder than working with the mouse 
- Immediately discovered a shorting issue on the button, fixed with electrical tape 
- Hard to play! Our brass player (trumpet, so button-based) picked it up much more quickly than either I or our other flute-playing friend did
    - Smaller range of motion than a trombone slide AND more discrete positions required than a trombone 
- Have to reset the controller to map to the y-range of the screen; might be annoying if switching screens, as it is, a pain to first set the trombone slide to its lowest position and THEN set the bottom of the screen....

TODO-video of ppl playing it??

## Discussion

This was a relatively easy and painless project, all things considered---I chalk that up to a relatively small scope of the task and the existence of Adafruit tutorials.[^adafruit] I thought it was going to be a much bigger lift, but once I realized that I could "just" treat the controller as a mouse input, everything fell into place nicely.

One side benefit of this particular project is that now that I know how we built *this* Bluetooth HID via CircuitPython and external sensors, I've been able to pattern-map onto other projects, and basically handle the electronics and hardware pieces by myself. I'm learning! :D It feels good. 

In terms of next steps:
- I could build a slightly nicer-packaged version of the whistle+electronics---but I probably won't! :D
- I want to make some nice settings for automatically handling the slide-position-to-screen-mapping, since doing it manually each time the player changes is annoying
- It would be cool to build a MIDI mode that sends out MIDI commands instead of mouse movements---which has been inadvertantly assumed/requested by other folks throwing out their own cool "what if you did ___" follow-up ideas. 
- I'd like to add an "'easier' mode" that locks slide movements to set pitch increments, so that note jumps are discrete rather than continuous. Trombone Champ, now with 100% more autotune!

Do you have ideas? Do you know me irl and want to make some doots? Let me know!

[^adafruit]: I have spent *so* much time perusing Adafruit tutorials this year, they truly hold a wealth of knowledge.

TODO-video: using the controller to scroll up and down a website


***Thanks to MC and SS for playtesting, WT for putting up with us playtesting, and the good [Trombone Champ folks](TODO) for their delightful game. TODO-link to repo***
