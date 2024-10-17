---
title: "***Clapping Music*** for flip-discs continued: Byte and variations"
rawtitle: "Clapping Music for flip-discs continued: Byte and variations"
tags: [project-writeup, electromechanical-display, raspberry-pi, music, programming, hardware, software, julia]
created: 2024-10-14
updated: 2024-10-14
---

In response to previous post [*Clapping Music* for two flip-disc displays](../clapping-music-for-flip-disc-displays/), a reader [commented](https://lobste.rs/s/70ipvr/blog_clapping_music_for_two_flip_disc)

> *I’d love to see a version played on a single board, with the two performers represented by the left and right sides of the board. It would more closely match the layout of a typical performance (two people standing side by side), and I think it would make it easier to see the phasing points.*

Great idea---let's do it!

[TODO-video-1]

Yep, quite pleasing. Thanks for the suggestion!

<p style="text-align:center">***</p>

The code changes required to support this performance were fairly minimal, but in the process of implementing them I accidentally stumbled into a nice illustration of how commands are sent to the boards. Let's take a look!

## Clap refactor

First, the minimal code changes to support this new playback mode. If you'll recall, we started with some code that looked like this:

```julia
function clapping_music(sink_dots, sink_digits; pause=0.15,
                        clap_pattern=Bool[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                        num_repeats=12, num_shifts=length(clap_pattern) + 1,
                        num_dots_to_set=28, num_digits_to_set=2)
    i_pattern_shift = 0
    for _ in 1:num_shifts
        for _ in 1:num_repeats, i_pattern in eachindex(clap_pattern)
            clap_pattern[i_pattern] &&
                write_to_sink(sink_dots, rand(0x00:0x7F, num_dots_to_set))
            clap_pattern[mod1(i_pattern + i_pattern_shift, length(clap_pattern))] &&
                write_to_sink(sink_digits, rand(0x00:0x7F, num_digits_to_set))
            sleep(pause)
        end
        i_pattern_shift += 1
    end
end
```

I moved the "make a clap" phrases (the first two lines of the inner for-loop) into input arguments:
```julia
function clapping_music(; clap_a=() -> print("A"), clap_b=() -> print("B"),
                        pause=0.15, clap_pattern=Bool[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                        num_repeats=12, num_shifts=length(clap_pattern))
    i_pattern_shift = 0
    for _ in 0:num_shifts
        for _ in 1:num_repeats, i_pattern in eachindex(clap_pattern)
            clap_pattern[i_pattern] && clap_a()
            clap_pattern[mod1(i_pattern + i_pattern_shift, length(clap_pattern))] && clap_b()
            sleep(pause)
        end
        i_pattern_shift += 1
    end
end
```
This slight refactor fully decouples the implementation of `clapping_music` from the flip-disc boards---now you can play *Clapping Music* with any two clap functions that you want![^caveat] Your "claps" could trigger the playback of a cowbell sound or trigger a light to blink. You could even send one clap command to trigger a doorbell and another to flip an automated door lock, and make your home play clapping music![^caveat2] 

The default behavior is to print a comment to the command line, which gives a lovely realtime-captioned mashup of *Clapping Music* with [John Cage's *4'33"*](https://en.wikipedia.org/wiki/4%E2%80%B233%E2%80%B3):

[TODO-video-2]

A post-hoc recap of that performance is even less interesting:
```
AABBABABABABABABA [...] 
```

*Back to the mission.* To recreate the dual-board performance of the original post with this new refactoring, we can do 
```julia 
clap_a = () -> write_to_sink(sink_dots, rand(0x00:0x7F, 28))
clap_b = () -> write_to_sink(sink_digits, rand(0x00:0x7F, 2))

# Play it:
clapping_music(; clap_a, clap_b)
```
...I'm not including a video of it here, you'll have to take my word that it's identical.

Running the newly proposed variant is now trivially easy:
```julia
board_state = zeros(UInt8, 28)
function randomize_cols!(board_state, col_range) 
    board_state[col_range] = rand(0x00:0x7F, length(col_range))
    return board_state
end

board_state = zeros(UInt8, 28)
clap_left!() = write_to_sink(sink_dots, randomize_cols!(board_state, 1:10))
clap_right!() = write_to_sink(sink_dots, randomize_cols!(board_state, 18:28))

# Play it:
clapping_music(; clap_a=clap_left!, clap_b=clap_right!)
```

[TODO-video-1abridged]
(Here's an abridged version; the full version is at the top of this page.)

You'll note that in this performance variant, we keep track of---and update---the full state of the board. This is necessary because of the split clap function definitions: a single update message to the board updates *all* discs on the board, so in order to not overwrite the "a" clap with the "b" clap, we need to update the board (via `write_to_sink`) with the entire state of the updated board; we can't just update a few pixels or columns at a time.[^think]

[^think]: At least, I don't think that's possible given the current serial communication protocol specification; it's possible that *some* board configuration allows it, and I'm just not familiar with that setting. 

[^caveat]: Clapper beware: if your "clap" function is blocking (i.e., if it waits until the clap sound has been played to return to the main function call), you won't get the desired dual-clap simultaneity. The simultaneity relies on calls to `clap_a()` and `clap_b()` triggering an external clap production and then returning immediately, before the sound has had a be produced. In the case of these flip dots displays, this works out fine: the clap functions send a serial command to the boards (which is fast!) and then returns without waiting for the display board to *have been* updated. The delay happens quickly relative to both the duration of sound production and the timescale of the full piece, so the two claps are perceived as happening simultaneously. (While there is a slight delay, it is not one that matters on the timescale of the piece's BPM.)

[^caveat2]: Due to the previous caveat, if you do make your "smart" home play *Clapping Music*, you'll probably have to slow the piece down A LOT to allow for the production of each clap before moving on to the next. This sounds pretty entertaining---if perhaps a great way to accidentally break your door lock---and if you have a home you'd be willing to let me experiment on, let me know.:) 

## In which I ruin the illusion that I implemented the variant perfectly the first time I tried it

It had been quite awhile since I set up the original library to send specific update commands to the displays, so I didn't remember exactly how it worked---my first guess, before going back to read the code, ended up being very wrong AND looking very cool. 

Basically, what I thought the `write_to_sink` command was doing was setting a boolean state (white/black) for each disk, and therefore the value of a single disk would flip that disk.  I thought I was incrementing the boolean value of three discs for each clapper A (indices 12, 13, 14) and B (indices 15, 16, 17), such that each clap would flip the disc from black to white.[^code]

[^code]: I neglected to keep track of the exact thing I tried (whoops!) but here's an equivalent implementation:
```
board_state = zeros(UInt8, 28)
function clap_a!()
    board_state[12:14] = mod1.(board_state[12:14] .+ 1, 256)
    return write_to_sink(sink_dots, board_state)
end
function clap_b!()
    board_state[15:17] = mod1.(board_state[15:17] .+ 1, 256)
    return write_to_sink(sink_dots, board_state)
end
clapping_music(; clap_a=clap_a!, clap_b=clap_b!)
```

Here's what that yielded:
[TODO-video-8]

<img style="border: none;" src="/assets/img/emojis/surprise-pikachu.png" alt="Surprise pikachu"/>

What is going on?! Why does it look so cool? Why---as those of you familiar with counting in binary have likely recognized---am I counting the total number of claps that've been clapped over the course of the song, instead of setting a whole block of discs to random values? 

Well, if I'd remembered how I'd implemented the `write_to_sink` function, I'd have known that each of those indices I was updating was a whole *column* of the board. With that information 



## What does a byte look like on this flip-disc display? 

In these displays, one byte of data corresponds to one column of flip-disc board (see how each column contains 8 discs? BOOM, a byte!). Let's send the values 1 through 64, one at a time, and see what happens:

[TODO-gif of flipdigits counting up with number counts if possible]

Cool, look familiar? If you have ever done any math or programming, you'll likely notice that we're counting in binary. For the fun of it, here is the equivalent counting-in-binary with fingers:

TODO-gif-finger-counting

There are 28 columns in this board, and therefore to fill in the first dot for each row in the board, we need to send 28 bytes with value 1:

[TODO-do it]

The scheme is identical on the flip-digits display, except that one byte maps to one character. It's harder to see the pattern here, as the individual segments that get flipped aren't in a neat column, but it exists. As in the disc board, byte value 0 maps to all 

[TODO-gif of flipdigits counting up THEN all set to 1]

One other implementation fact is relevant here: something something we must send bytes up to and including the last column we want to set---we can't just target a middle column and leave its preceding columns untouched.^[help] We don't, however, have to update all columns on the board---any remaining columns are left in their previous update state, regardless of whether that was on or off (white or black, flipped or unflipped). 

This means that we have to be strategic about where our given claps are drawn on the board. One approach is to keep track of board state outside of the clapping, capture that state in each of the clap functions, and let the clap update its own subset of discs and then redraw the full world. This is the approach I used at first.

Because I wanted each of my claps to own their own contiguous span of columns, I could avoid keeping track of state and instead make sure to always assign the the right-most set of columns to the clap_a function, such that when clap_b is called it doesn't overwrite clap_a's columns. This is the approach I use now. It's a nice approach, but won't be sufficient when the next person invariable proposes the board be divided up like a chess board, with clap_a given the black squares and clap_b given the white.[^dare]

[^dare]: Go on, I dare you.

[^help]: At least, this is my understanding of the spec from having read it ages ago; if you know otherwise, do speak up.

### Theme and variations

With the knowledge above, I had some fun playing with cool variations. Here they are:

{
    AF requested "the littlest clap!"
```julia
clap_a = 
clap_b = 
```
TODO-VID
}

{
    Title:
```julia
clap_a = 
clap_b = 
```
TODO-VID
}

{
    Title:
```julia
clap_a = 
clap_b = 
```
TODO-VID
}
...

What next? Stay tuned!

**Code that generated these video examples lives [here](TODO).**
