---
title: "***Clapping Music*** for one flip-disc display: Byte and variations"
rawtitle: "Clapping Music for one flip-disc display: Byte and variations"
tags: [project-writeup, electromechanical-display, raspberry-pi, music, programming, hardware, software, julia]
created: 2024-10-18
updated: 2024-10-18
---

In response to previous post [*Clapping Music* for two flip-disc displays](../clapping-music-for-flip-disc-displays/), a reader [commented](https://lobste.rs/s/70ipvr/blog_clapping_music_for_two_flip_disc)

> *I’d love to see a version played on a single board, with the two performers represented by the left and right sides of the board. It would more closely match the layout of a typical performance (two people standing side by side), and I think it would make it easier to see the phasing points.*

Great idea---let's do it!

<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/kva_p5HtEOg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

Quite pleasing. Thanks for the suggestion!

<div class="centered-children"><p>***</p></div>

The code changes to support this variation were fairly minimal, but in the process of implementing them I accidentally stumbled into a nice illustration of how commands are sent to the flip-disc board. Let's take a look!

## ~~Clapping~~ Anything Music

First, the minimal code changes to support the new playback mode. If you'll recall from the last post, our code that looked like this:

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

Pulling the "make a clap" phrases out into input arguments `clap_a` and `clap_b` fully decouples the performance from the flip-disc boards:
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
Now it can be used to perform *Clapping Music* with any two clap functions that you want: lights, sounds, motors, whatever you want.[^caveat] [^caveat2] 

[^caveat]: Clapper beware: if your "clap" function is blocking (i.e., if it waits until the clap sound has been played to return to the main function call), you won't get the desired dual-clap simultaneity. The simultaneity relies on calls to `clap_a()` and `clap_b()` triggering an external clap production and then returning immediately, before the sound has had a be produced. In the case of these flip dots displays, this works out fine: the clap functions send a serial command to the boards (which is fast!) and then returns without waiting for the display board to *have been* updated. The delay happens quickly relative to both the duration of sound production and the timescale of the full piece, so the two claps are perceived as happening simultaneously. While there is a slight delay, it is not one that matters on the timescale of the piece's default tempo.

[^caveat2]: Due to the previous caveat, if you do make your "smart" home play *Clapping Music*, you'll probably have to slow the piece down A LOT to allow for the production of each clap before moving on to the next. This sounds pretty entertaining---if perhaps a great way to accidentally break your door lock---and if you have a home you'd be willing to let me experiment on, let me know. MB, looking at you.... 

The default behavior is to print a comment to the command line, which gives a lovely realtime-captioned mashup of *Clapping Music* with [John Cage's *4'33"*](https://en.wikipedia.org/wiki/4%E2%80%B233%E2%80%B3):

![Animation of the letters "A" and "B" being typed in sequence](./assets/clapping.gif)

A transcription of the full performance is even less interesting:

```julia
julia> clapping_music()
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAA
BABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAA
BBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBAABABABABABABABBAABABABABABABABB
AABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABA
BABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABA
BABABABBABABABAABBABABABABABABAABBABABABABABABAABBABABABABABABAABBABABABABAB
ABAABBABABABABABABAABBABABABABABABAABBABABABABABABAABBABABABABABABAABBABABAB
ABABABAABBABABABABABABAABBABABABABABABAABBABABABABAABABABABBABABABAABABABABB
ABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABA
BABBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAA
BABABABBABABAABABABABABBAABBAABABABABABBAABBAABABABABABBAABBAABABABABABBAABB
AABABABABABBAABBAABABABABABBAABBAABABABABABBAABBAABABABABABBAABBAABABABABABB
AABBAABABABABABBAABBAABABABABABBAABBAABABABABABBAABBABAABBAABBABABABABAABBAA
BBABABABABAABBAABBABABABABAABBAABBABABABABAABBAABBABABABABAABBAABBABABABABAA
BBAABBABABABABAABBAABBABABABABAABBAABBABABABABAABBAABBABABABABAABBAABBABABAB
ABAABBAABBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABABABBAB
ABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABAABABABA
BBABABABAABABABABBABABABAABABABABBABABABAABABABABBABABABABABABABABABBAABABAB
ABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAAB
ABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABABBAABABABABABABAB
BAABABABABABABABBAABABAABBABABABABABABAABBABABABABABABAABBABABABABABABAABBAB
ABABABABABAABBABABABABABABAABBABABABABABABAABBABABABABABABAABBABABABABABABAA
BBABABABABABABAABBABABABABABABAABBABABABABABABAABBABABABABABAABABBAABBABAABB
AABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBAB
AABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAABBABAABBAABABBAA
BBABAABBAABABBAABBABAABBABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABAB
```

Anyway. 

To recreate the dual-board performance of the original post, we do 
```julia 
clap_a = () -> write_to_sink(sink_dots, rand(0x00:0x7F, 28))
clap_b = () -> write_to_sink(sink_digits, rand(0x00:0x7F, 2))

# Play it:
clapping_music(; clap_a, clap_b)
```

and the new single-board performance is generated with
```julia
function randomize_cols!(board_state, col_range) 
    board_state[col_range] .= rand(0x00:0x7F, length(col_range))
    return board_state
end

board_state = zeros(UInt8, 28)
clap_left!() = write_to_sink(sink_dots, randomize_cols!(board_state, 1:10))
clap_right!() = write_to_sink(sink_dots, randomize_cols!(board_state, 18:28))

# Play it:
clapping_music(; clap_a=clap_left!, clap_b=clap_right!)
```

You'll note that this single-board implementation involves keeping track of---and updating---the full display state of the board throughout the duration of the piece (via `board_state`). This is necessary because a single update of the display board updates *all* discs on the board, so we can't update just a few columns with each clap.[^think]  Instead, we send the complete desired state to the board each time we want the board to update.

[^think]: At least, I don't think that's possible given the current serial communication protocol specification; it's possible that *some* board configuration allows it, and I'm just not familiar with it. 

## Binary diversion

I didn't remember exactly how the "send update to boards" function worked---it had been awhile since I wrote it!---and my first guess, before going back to read the code, ended up not being what I intended BUT looking delightful anyway:[^code]

<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/8QKFRVNFEag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

As those of you familiar with counting [in binary](https://en.wikipedia.org/wiki/Binary_number) have likely recognized, in this variation, for each the right and left clappers, we are counting the number of claps that have been clapped thus far.

In these displays, one byte of data corresponds to one column of flip-disc board. Let's send bytes values 0 through 127 (i.e., 2<sup>7</sup>) one at a time, to illustrate:

```julia
for x in 0x00:0x7F
    write_to_sink(sink_dots, [x])
    sleep(0.1)
end
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/5Lf2V4NYVUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

For the fun of it, let's do all columns at the same time:
```julia
for x in 0x00:0x7F
    write_to_sink(sink_dots, fill(x, 28))
    sleep(0.2)
end
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eGSDterYIfg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

Given that knowledge, here's the most basic "flip only one disc at a time" Clapping Music---aka, "The Littlest Clap", as requested by AF:
```julia
board_state = zeros(UInt8, 28)

function clap_a!()
    board_state[14] = board_state[14] == 0 ? 1 : 0
    return write_to_sink(sink_dots, board_state)
end

function clap_b!()
    board_state[15] = board_state[15] == 0 ? 1 : 0
    return write_to_sink(sink_dots, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2, num_shifts=1)
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/gshXXb5DZN8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

<p></p>
### Playtime

Here are another few examples of flip-disc behavior, because I think they're fun.

#### Single column refresh rate

Flipping a whole column on and off, with a decreasing amount of time between "off" and "on":

```julia
for s in 0.1:-0.001:0.0
    clear(sink_dots)
    sleep(s)
    write_to_sink(sink_dots, fill(0x7F, 1))
    sleep(.1)
end
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ivAsLNm5KFw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

#### Shimmer

Flipping a whole array off and on, with no pause in between---i.e., the board updates are sent faster than they can be (mechanically) fulfilled: 

```julia
for _ in 1:30
    clear(sink_dots)
    write_to_sink(sink_dots, fill(0x7F, 10))
end
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ZjCYiz2F4Tw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


#### Multicolumn refresh rate

Flipping a set of counter columns on and off, again without enough time between requests for the board to fully update:

```julia
for x in 0x00:0x7F
    clear(sink_dots)
    sleep(0.2)
    write_to_sink(sink_dots, fill(x, 10))
end
```
<div class="centered-children">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rByTmhK6Zn8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>


<div class="centered-children"><p>***</p></div>

That's all for now!

**Code to generate all these examples lives [here](./video-script/run.jl). Have an idea for a cool demo but don't have access to flip-disc boards? Send me a snippet of code and I'll run it for you! **


[^code]: I neglected to keep track of the exact thing I tried (whoops!) but I was aiming for a full-column result akin to the Littlest Clapping variant, above. Here's an equivalent implementation:
    ```julia
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
