# Generate content filmed for blog post
# TODO add manifest

using FlipBoard
shared_srl = open_srl_iff_available(; portname="/dev/ttyS0", baudrate=57600)
sink_dots = AZDotsSink(; address=0x00, serial_port=shared_srl)
sink_digits = AZDigitsSink(; address=0x01, serial_port=shared_srl)
sink_both = all_alphazeta_sink(shared_srl)

# 0. Recreate original version (sanity check!)(no video)
clap_a = () -> write_to_sink(sink_dots, rand(0x00:0x7F, 28))
clap_b = () -> write_to_sink(sink_digits, rand(0x00:0x7F, 2))
clapping_music(; clap_a, clap_b, num_repeats=2, num_shifts=4)

# ...helper functions for repeated setting/clearing of board
board_state = zeros(UInt8, 28)
reset!() = write_to_sink(sink_dots, board_state .*= 0)

# 1. New full clapping music
board_state = zeros(UInt8, 28)
function randomize_cols!(board_state, col_range) 
    board_state[col_range] = rand(0x00:0x7F, length(col_range))
    return board_state
end

board_state = zeros(UInt8, 28)
clap_left!() = write_to_sink(sink_dots, randomize_cols!(board_state, 1:10))
clap_right!() = write_to_sink(sink_dots, randomize_cols!(board_state, 18:28))

# Play it (full): 
# [TODO-video-1]
clapping_music(; clap_a=clap_left!, clap_b=clap_right)

#...abridged:
# [TODO-video-1abridged]
reset!()
clapping_music(; clap_a=clap_left!, clap_b=clap_right!, num_repeats=2)

#2. Default behavior: just printout
# [TODO-video-2]
clapping_music(; num_repeats=1)

#2b. Results to be copied in for default behavior
# [TODO-video-2]
clapping_music(; pause=0)

# 3. Incrementing byte
# helper_function
# Let's look at byte---i.e., a column of the board---and watch it count up in bits:
# [TODO-video-3]
for x in 0x00:0x7F
    write_to_sink(sink_dots, [x])
    sleep(0.1)
end

# ...and now let's do the whole board, because it is cool (and so is the sweeping)
# [TODO-video-4]
for x in 0x00:0x7F
    write_to_sink(sink_dots, fill(x, 28))
    sleep(0.2)
end

# One cool thing I discovered is that if you unset a disc before it has had to 
# properly flip, you'll still hear the very quiet solenoid noise. As more discs 
# are triggered, there is some breakthrough pixel visibility
# [TODO-video-5]
for x in 0x00:0x7F
    clear(sink_dots)
    sleep(0.2)
    write_to_sink(sink_dots, fill(x, 10))
end

# Make it shimmer!
# [TODO-video-6]
for _ in 1:30
    clear(sink_dots)
    write_to_sink(sink_dots, fill(0x7F, 10))
end

# ...does the speed at which the unset happens affect the volume?
# [TODO-video-7]
for s in 0.1:-0.001:0.0
    clear(sink_dots)
    sleep(s)
    write_to_sink(sink_dots, fill(0x7F, 1))
    sleep(.1)
end

# OKAY. Let's play some claping music variations

# ...this was the first one I did, by mistake. Counting instead of clapping!
# [TODO-video-8]
clear(sink_dots)
board_state = zeros(UInt8, 28)

function clap_a!()
    board_state[12:14] = mod1.(board_state[12:14] .+ 1, 256)
    return write_to_sink(sink_dots, board_state)
end

function clap_b!()
    board_state[15:17] = mod1.(board_state[15:17] .+ 1, 256)
    return write_to_sink(sink_dots, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2, num_shifts=1)

# "THE LITTLEST CLAPPING HANDS" for really real? yes! (AF request)
# Not going to video, but is cute
clear(sink_dots)
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
