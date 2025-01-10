---
title: 'Slidey Doots: Slide whistle as Trombone Champ controller'
type: project-write-up
tags: [interactive, programming, gaming, hardware, doofy]
description: 'Write-up on making a wireless controller for the video game Trombone Champ out of a slide whistle'
created: 2025-1-09
updated: 2025-1-09
published: Fri, 10 January 2025 04:17:01 GMT
---

My initial response to the 2022 video game [Trombone Champ](https://www.trombonechamp.com/) was a simple HELL. YES. 

<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/9o-3brNQOns?si=kh8EYeq9a8eiRQqs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Upon playing it myself, I found that my joy in the game was blunted by the disconnect of controlling the trombone via computer trackpad. I yearned for the physical slidyness experienced by a true trombone god![^disclaimer] How, I wondered, could I easily and cheaply manifest a physical slide with which to control the game? Enter: the humble slide whistle. 

[^disclaimer]: For the record, I am a flute/sax player, not a brass player, so this is purely speculation on my part.

Here is my submission to the Trombone Champ DIY controller pantheon---(optionally) wireless, (relatively) easy to replicate, and (indisputably) slide-y:


![Animated image of Trombone Champ game being played by slide whistle](assets/ballgame-1.gif)

This project was co-built with Alex Ferguson, who managed the circuitry and assembly.

*NB: This is one of those projects that I started, didn't touch for a year, and then recently picked up to finish---and in that time, Trombone Champ released a Nintendo Switch variant and a virtual reality variant, both of which provide slidier control options for game play than those available when I started. I've also seen [3D printed controllers](https://www.reddit.com/r/trombonechamp/comments/xq54hn/comment/iq7g8i8/) as well as some [made from real trombones](https://www.youtube.com/watch?v=uzNMawGSed8). Excellent! The more Trombone Champ, the merrier.[^bystanders]*

[^bystanders]: Bystanders, roommates, and pets may disagree.

### Design

In addition to the non-negotiable slidyness, I had two requirements:

1. Must be relatively cheap and easy to build, and therefore relatively cheap and easy for anyone else to replicate.
2. Must not be gross when sharing amongst multiple players, i.e., should not involve players actually putting their mouths on the instrument[^brass]

[^brass]: Have you *seen* brass players clear the spit from their instruments?! It's gross, yo.

Based on the game's user inputs, the new controller needed to support two input parameters:

1. **Slide position / output pitch**, a continuous value that correlates to the slide position of a trombone. In the original game, this is controlled by the y-dimension of cursor movement (i.e., up/down but not side to side) from either a trackpad or a mouse.
2. **Playing sound vs not playing sound**, a binary value that simulates a musician blowing air through the trombone. In the original game, this is controlled by either clicking (and holding down) a mouse button or any arbitrary key on the keyboard. (If you trigger the "playing sound" state for too long, the in-game player runs out of air.)

Because Trombone Champ takes basic mouse input as its default controller, it was straightforward to set up the new controller as a mouse, and to interact with the game by sending its sensor commands to the computer packaged as mouse commands.

### Physical components

- **Microcontroller**: [Adafruit Feather Express](https://www.adafruit.com/product/4062), running a program written in CircuitPython (described below); attached to the whistle body, and powered by a basic external USB power brick.
- **Slide position sensor**: [linear slide potentiometer](https://www.adafruit.com/product/4219), attached to the whistle body with its knob coupled to the whistle slide with hot glue.
- **Breath on/off sensor**: basic momentary button, attached to the whistle body near the mouthpiece.

    The use of button for this control is...fine. It's not my top choice, and I'd love to replace it with something that feels more natural to play.
    
    What I'd *really* wanted is for this parameter to be breath-controlled, and I considered putting a cheap microphone on/in the whistle mouthpiece. However, Requirement 2 presented a reality check: as a musician, I know how gross it is to swap instruments around a group of people, and how annoying it is to have to clean a mouthpiece with rubbing alcohol before passing it along to someone else to play. I couldn't envision a sanitary way of setting up a microphone on the whistle in a way that would be both playable and wouldn't encourage putting one's mouth directly on/around the mouthpiece of the whistle. There are of course other ways to sense breath, but couldn't come up with something that met the design goals at the same time. To be left for a future improvement! 
    
    For now, I went with a basic button. I don't love it, but it is perfectly serviceable. I think something breath-based would be nicer, and I think this button is the weakest part of the controller, spiritually. :) 

### Assembly

We first hooked up the components in a breadboard, to test the overall circuitry. It worked!

<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/YGRgp6Z2gFY?si=B6oVh24c1DM2jR_2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Once we'd confirmed our circuit functionality, we attached the Feather and components to the whistle with a sophisticated combination of Blu Tack and embroidery thread---to keep the flat backs of the components stable on the round body of the whistle. 

We then did the requisite soldering, and topped the whole shebang off with some strategically placed electrical tape. Classy!

![Photo of slide whistle with some electronics attached, held in a pair of electronics Helping Hands](assets/progress-1.jpg)

Finally, we coupled the slide potentiometer's knob to the slide of the whistle with hot glue. Perhaps we'll make a cleaned-up version in the future.[^feelings] 

![Photo of completed slide whistle controller](assets/progress-3.jpg)

[^feelings]: Disclaimer on her behalf: Alex wanted to make it a much more professional, beautifully wired version of this controller, but I convinced her that it was a quasi-hacky prototype so string and electrical tape and visibly disorganized wires were totally fine for now. I take full responsibility for its current lack of polish!

Our circuit is slightly fancier than it needed to be, as the resistors we added in series with the button and slide potentiometer inadvertantly duplicated the pull-up resistors built into the Feather, which can be enabled in code (`button.pull = Pull.UP`). I didn't realize that until after we'd soldered in our external resistors, however. Ah well, no harm no foul!

## Programming 

I used [this Adafruit tutorial](https://learn.adafruit.com/ble-hid-keyboard-buttons-with-circuitpython/ble-keyboard-buttons) as a starting point for sending sensor inputs as HID mouse commands over Bluetooth. CircuitPython libraries for both HID and Bluetooth made this setup fairly straightforward.

The pseudocode for the run loop is something like this:
```
# Setup 
slide_potentiometer = connect_to_analog_pin(1)
button = connect_to_digital_pin(2)
hid = setup_mouse_controller()

def map_voltage_to_screen_min_max(v): 
    ...

# Run loop 
while True:
    y_previous = 0
    button_is_pressed = False
    
    ...wait to connect to bluetooth...

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

The full script is [here](https://github.com/hannahilea/slide-whistle-trombone-champ-controller/blob/main/code.py). There's some extra functionality in the actual implementation to disable sending mouse commands from the controller if the onboard Feather button has been pressed, but otherwise the pseudocode is basically it.

The trickiest part of the software implementation was something I didn't end up needing to write at all: because of how we'd put the Feather in the breadboard, our connection between the input pins and the sensors was tenuous at best, which lead to a voltage jump in the potentiometer while the button was pressed. At the time we didn't realize that the cause was the breadboard/Feather connection, so I thought I was going to have to program around it, and spent a fair amount of time thinking about how I might do that (definitely doable, just an annoying exercise in bookkeeping!). Then as soon as we soldered everything together we discovered that the jump was gone, and figured out that the breadboard connection had been tenuous. Huzzah!

## Bring on the doots! 

Once the Feather is connected to the external power, it automatically broadcasts itself as an available Bluetooth peripheral that can be connected to via any computer. 

If you move the slide back and forth now, the mouse travels up and down the screen. Once you open Trombone Champ (e.g., via Steam), you'll be good to play!

First, a little warm up:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/6XEAdTrbz-Y?si=tGdmMPXLZWzWpgj_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

And now let's really get into it! 

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/WTBGyS3Lx18?si=ORa5NRcX_1GndPz7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

I find the slide whistle controller significantly more fun to play, and more fun to watch others play, than the default mouse controls. Additionally, you can get up and move around as the music moves you.[^moves]

It's still tricky to play the game well. Of our several playtesters, our resident trumpet player (Alex) picked up the slide controller much more quickly than either our flute-playing friend or I did, but we all struggled. As compared to a real trombone, the slide whistle has a significantly smaller range of motion, AND there are more discrete slide positions required (one per chromatic note!) as compared to a real trombone. That said, it's no harder to play than the default mouse or trackpad!

[^moves]: Both for musicality moves and wincing moves!

Of course, you don't need to have Trombone Champ open for the controller to function---you can also, e.g., scroll a website that way. Did we do this? Absolutely. :joy:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BGke6a0LoaE?si=KIGE497RJ9ZR3Wn1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Discussion

This was a relatively easy project, all things considered---I chalk that up to a relatively small scope of the task and the existence of Adafruit tutorials.[^adafruit] I thought it was going to be a much bigger lift, but once I realized that I could "just" treat the controller as a mouse input, everything fell into place nicely.

One side benefit of this particular project is that now that I know how we built *this* Bluetooth HID via CircuitPython and external sensors, I've been able to pattern-map onto other projects, and basically handle the electronics and hardware pieces by myself. I'm learning! :D It feels good. 

Future work, if I decide to spend more time on this project:

- Making a slightly more nicely-packaged version of the whistle+electronics
- Adding an "auto-tune" mode that snaps the slide movements to discrete pitches, which would make it easier to play intelligible tunes with less practice (but might be less fun...?)
- Diagnosing and fixing the slight lag that shows up occasionally, which I suspect is related to the controller being connected over Bluetooth. 
- Building a MIDI mode that sends out MIDI commands instead of mouse movements---which has been inadvertantly assumed/requested by other folks throwing out their own cool "what if you did ___" follow-up ideas---so that the controller can be used as a MIDI slide whistle.

Do you have follow-up ideas? Do you know me IRL and want to play some doots? Let me know!

[^adafruit]: I have spent *so* much time perusing Adafruit tutorials this year. Truly one of the great knowledge repositories of our time.


***The code for this controller---including set-up instructions---is available [on GitHub](https://github.com/hannahilea/slide-whistle-trombone-champ-controller). Thanks to MC and SS for playtesting, WT for putting up with us playtesting, and [Holy Wow Studios](https://www.holywowstudios.com/) for creating this ~~cursed~~ delightful game.***
