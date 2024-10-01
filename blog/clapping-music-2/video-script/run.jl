# Generate content filmed for blog post
# TODO add manifest

using FlipBoard
shared_srl = open_srl_iff_available(; portname="/dev/ttyS0", baudrate=57600)
sink_dots = AZDotsSink(; address=0x00, serial_port=shared_srl)
sink_digits = AZDigitsSink(; address=0x01, serial_port=shared_srl)
sink_both = all_alphazeta_sink(shared_srl)

# 0. Recreate original version 
clap_a = () -> write_to_sink(sink_dots, rand(0x00:0x7F, 28))
clap_b = () -> write_to_sink(sink_digits, rand(0x00:0x7F, 2))
clapping_music(; clap_a, clap_b)

# 1. New full clapping music 
FlipBoard.all_dark(sink_both)

function rand_bytes_offset(count_zeros, count_bytes)
    return vcat(zeros(UInt8, count_zeros), rand(0x00:0x7F, count_bytes))
end

clap_a = () -> write_to_sink(sink_dots, rand_bytes_offset(14, 4))
clap_b = () -> write_to_sink(sink_dots, rand_bytes_offset(10, 4))
clapping_music(; clap_a, clap_b)


ma

#...abridged:
clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2)

# ...full:
clapping_music(; clap_a, clap_b, num_repeats)







# Let's look at byte---i.e., a column of the board---and watch it count up in bits:
for x in 0x00:0x7F
    FlipBoard.all_dark(sink_dots)
    sleep(0.1)
    set_rand_discs(sink_dots; num_discs=1, available_byte_indices=x:x)
    sleep(0.1)
end

# ...and now let's do the whole board, because it is cool (and so is the sweeping)
for x in 0x00:0x7F
    FlipBoard.all_dark(sink_dots)
    sleep(0.2)
    set_rand_discs(sink_dots; num_discs=28, available_byte_indices=x:x)
    sleep(0.2)
end

# One cool thing I discovered is that if you unset a disc before it has had to 
# properly flip, you'll still hear the very quiet solenoid noise. As more discs 
# are triggered, there is some breakthrough pixel visibility
for x in 0x00:0x7F
    FlipBoard.all_dark(sink_dots)
    sleep(0.2)
    set_rand_discs(sink_dots; num_discs=10, available_byte_indices=x:x)
end

# ...does the speed at which the unset happens affect the volume?
for s in 0.2:-0.01:0.0
    FlipBoard.all_dark(sink_dots)
    sleep(0.2)
    set_rand_discs(sink_dots; num_discs=1, available_byte_indices=0x7F:0x7F)
    sleep(s)
end

# ...and with no pauses at all! Single column, then block of columns: 
for s in 0.3:-0.01:0.0
    FlipBoard.all_dark(sink_dots)
    set_rand_discs(sink_dots; num_discs=1, available_byte_indices=0x7F:0x7F)
    sleep(s)
end

for s in 0.3:-0.01:0.0
    FlipBoard.all_dark(sink_dots)
    set_rand_discs(sink_dots; num_discs=10, available_byte_indices=0x7F:0x7F)
    sleep(s)
end

# OKAY. Let's play some claping music.
# clapping_music(; clap_a, clap_b, num_repeats=2)

# "THE LITTLEST CLAPPING HANDS" ...okay, didn't do what i expected BUT was okay!
FlipBoard.all_dark(sink_dots)
board_state = zeros(UInt8, 28)

function clap_a!()
    board_state[12:14] = mod1.(board_state[12:14] .+ 1, 256)
    return write_to_sink(sink, board_state)
end

function clap_b!()
    board_state[15:17] = mod1.(board_state[15:17] .+ 1, 256)
    return write_to_sink(sink, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2)


# "THE LITTLEST CLAPPING HANDS" for real? Close...
FlipBoard.all_dark(sink_dots)
board_state = zeros(UInt8, 28)

function clap_a!()
    board_state[14] = mod1.(board_state[14] .+ 1, 2)
    return write_to_sink(sink, board_state)
end

function clap_b!()
    board_state[15] = mod1.(board_state[15] .+ 1, 2)
    return write_to_sink(sink, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2)

# "THE LITTLEST CLAPPING HANDS" for really real? yes! (AF request)
FlipBoard.all_dark(sink_dots)
board_state = zeros(UInt8, 28)

function clap_a!()
    board_state[14] = board_state[14] == 0 ? 1 : 0
    return write_to_sink(sink, board_state)
end

function clap_b!()
    board_state[15] = board_state[15] == 0 ? 1 : 0
    return write_to_sink(sink, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2)

# "THE BIGGEST CLAPPING HANDS" - Gets iffy after 3 rows (val=7), good with val=3 and 1
FlipBoard.all_dark(sink_dots)
board_state = zeros(UInt8, 28)

function clap_a!()
    val = board_state[14] == 0 ? 3 : 0
    board_state[1:14] .= val
    return write_to_sink(sink, board_state)
end

function clap_b!()
    val = board_state[15] == 0 ? 3 : 0
    board_state[15:end] .= val
    return write_to_sink(sink, board_state)
end

clapping_music(; clap_a=clap_a!, clap_b=clap_b!, num_repeats=2, num_shifts=2)
