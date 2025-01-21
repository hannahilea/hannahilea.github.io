---
title: 'Realtime video to timelapse with FFmpeg'
type: Task documentation
tags: [ffmpeg, instructions, editing, task]
description: 'Task documentation for converting videos to trimmed timelapse videos'
created: 2025-01-21
updated: 2025-01-21
published: Tue, 21 Jan 2025 11:40:00 EST
---

An artist friend took videos of her art creation process and asked for assistance converting them into per-artwork timelapse recordings. Let's document the steps for my future self!

#### Task

- Trim videos to region(s) with activity---one timelapse per resultant artwork
- Speed up 4x
- Remove audio 
- Within a single recording, remove subsection(s) with no activity

For the given recordings, finding the cut points for the first and last steps could easily be done manually.[^test]

[^test]: If the recordings were longer (or if there were more of them), I'd probably automate that step---I considered it here, because it would be fun, and then decided that it failed xkcd's [Is It Worth the Time](https://xkcd.com/1205/) test:
[![](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/)

#### Prerequisite

Install commandline video editing tool [FFmpeg](https://www.ffmpeg.org/).

#### Steps

After viewing a recording and making note of the timestamps around a specific artwork's creation (in this example, 00:25:16 to 00:42:34):

```
# Trim into new file, remove audio
ffmpeg -i INPUT.mp4 -ss 00:25:16 -to 00:42:34 -c:v copy -c:a copy -an ARTWORK_A.mp4

# Speed it up into a 4x timelapse, update framerate=60fps, rotate 90 degrees
ffmpeg -i ARTWORK_A.mp4 -vf "setpts=PTS/4,fps=60,transpose=2" ARTWORK_A_4x.mp4

# Trim out region with inactivity (00:03:39 to 00:04:17)
ffmpeg -i ARTWORK_A_4x.mp4 -vf  "select='not(between(t,219,257))',setpts=N/FRAME_RATE/TB" ARTWORK_A_4x_trimmed.mp4
```

- This recording happened to be filmed vertically but needed to be flipped to horizontal; if that flip isn't necessary, exclude the `transpose=2` argument from the second processing step. (For whatever reason, doing this transpose is realllllly slow. Wasn't worth investigating here, but be warned.)

- The region with inactivity was found manually (within ARTWORK_A_4x.mp4), and then converted into seconds. It could alternatively be found and excluded as part of the first step.

- Note that these steps generate intermediate videos `ARTWORK_A.mp4` and `ARTWORK_A_4x.mp4` as well as output video `ARTWORK_A_4x_trimmed.mp4`. That was intentional, to give the friend the different types of output for other use-cases. If those intermediate videos aren't desired, the various steps can be combined.  
