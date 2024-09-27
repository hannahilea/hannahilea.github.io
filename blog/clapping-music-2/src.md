# ***Clapping Music*** for flip-discs continued: Byte and variations

In response to [*Clapping Music* for two flip-disc displays](../clapping-music-for-flip-disc-displays/), a reader [commented](https://lobste.rs/s/70ipvr/blog_clapping_music_for_two_flip_disc)

> *I’d love to see a version played on a single board, with the two performers represented by the left and right sides of the board. It would more closely match the layout of a typical performance (two people standing side by side), and I think it would make it easier to see the phasing points.*

Great idea---let's do it!

[TODO-video]

Yep, quite pleasing. Thanks for the suggestion!

<p style="text-align:center">***</p>

The code changes required to support this performance were fairly minimal, and in the process of implementing them I accidentally stumbled into a nice illustration of how commands are sent to the boards. Let's take a look!

## I <3 Julia

First, the minimal code changes to support this new playback mode are a nice example of how easy it is to refactor Julia to be more generic. 

If you'll recall, we started with some code that looked like this:

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

I pulled out the "make a clap" piece (the first two lines in the inner for-loop) into their own arguments:

```julia
function clapping_music(; clap_a=() -> print("A"), clap_b=() -> print("B"),
                        pause=0.15, clap_pattern=Bool[1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                        num_repeats=12, num_shifts=length(clap_pattern) + 1)
    i_pattern_shift = 0
    for _ in 1:num_shifts
        for _ in 1:num_repeats, i_pattern in eachindex(clap_pattern)
            clap_pattern[i_pattern] && clap_a()
            clap_pattern[mod1(i_pattern + i_pattern_shift, length(clap_pattern))] &&
                clap_b()
            sleep(pause)
        end
        i_pattern_shift += 1
    end
end
```
This fully decouples a performance of `clapping_music` from the flip-disc boards---now you can play *Clapping Music* with any two clap functions that you want![^caveat] Your "claps" could trigger the playback of a cowbell sound or trigger a light to blink. You could even send one clap command to trigger a doorbell and another to flip an automated door lock, and make your home play clapping music![^caveat2] 

The default behavior is to print a comment to the command line, which gives a lovely realtime-captioned[^caption] mashup of *Clapping Music* with [John Cage's *4'33'*](https://en.wikipedia.org/wiki/4%E2%80%B233%E2%80%B3):

TODO-video 

A post-hoc recap of that performance is even less interesting:
```
AABBABABABABABABA [...] 
```

[^caption]: This opens up a whole awesome can of worms re: realtime audio visualization, but that's for another time! 

BACK TO OUR MISSION. To recreate the performance of the original post with this new refactoring, we call 
```julia 
clap_a = () -> write_to_sink(sink_dots, rand(0x00:0x7F, num_dots_to_set))
clap_b = () -> write_to_sink(sink_digits, rand(0x00:0x7F, num_digits_to_set))

# Play it:
clapping_music(; clap_a, clap_b)
```

Setting up the newly proposed rendition is now trivially easy:
```julia
board_state = zeros(UInt8, 28)
num_cols = 10

function clap_a!()
    board_state[1:num_cols] = board_state[1:num_cols] .+ rand(0x00:0x7F, num_cols)
    return write_to_sink(sink, board_state)
end

function clap_b!()
    board_state[(end - num_cols + 1):end] = board_state[(end - num_cols + 1):end] .+ rand(0x00:0x7F, num_cols)
    return write_to_sink(sink, board_state)
end

# Play it:
clapping_music(; clap_a=clap_a!, clap_b=clap_b!)
```

You'll note that in this new variant, we keep track of---and update---the full state of the board. TODO-EXPLAIN OR DON'T DO THIS IF IT ISN"T NECESSARY

[^caveat]: Clapper beware: if your "clap" function is blocking (i.e., if it waits until the clap sound has been played to return to the main function call), you won't get the desired dual-clap synchronicity. The synchronicity relies on calls to `clap_a()` and `clap_b()` triggering an external clap production but then returning immediately, before the sound has a chance to happen. In the case of the flip dots displays used here, this works out fine: the clap functions send a serial command to the boards (which is fast!) and then returns without waiting for the display board to *have been* update. Because this delay happens quickly relative to both the duration of sound production and the timescale of the full piece, the two claps appear to happen simultaneously and on a beat. (There is, of course, a slight delay---but not one that matters on the timescale of the piece's BPM.)

[^caveat2]: Due to the previous caveat, if you do make your "smart" home play *Clapping Music*, you'll probably have to slow the piece down A LOT to allow for the production of each clap before moving on to the next. This sounds pretty entertaining---if perhaps a great way to accidentally break your door...---and if you have a home you'd be willing to let me experiment on, let me know. :) 

## A cool whoops

It had been quite awhile since I set up the original library to send specific disc-on/disc-off commands to the displays, so I didn't remember exactly how to do it---my first guess, before going back to read the code, ended up being very wrong AND looking very cool AND providing an excellent demonstration of how information is sent to the boards in the first place. 

These are the claps I sent
```
clap_a() TODO
```
and this is what it looks like:

TODO-video. 

<img style="border: none;" src="/assets/img/emojis/surprise-pikachu.png" alt="Surprise pikachu"/>

What is going on?! Why does it look so cool? Why am I inadvertently counting the total number of claps that've been clapped, instead of setting a whole block of discs to random values? 

Even though solving this for the originally intended clap patterns was straight-forward, the reason for these something something ones is cool, and illustrates the underlying organization of the serial command.

### What does a byte look like on a flip-disc display? 

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

---
### Footnotes

<footnotes/>

--- 
- created: 2024-09-27
- last updated: 2024-09-27
- tags: project-writeup, electromechanical-display, raspberry-pi, music, programming, hardware, software, julia

