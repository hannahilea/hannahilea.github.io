- [ ] TODO: how does cuttle brand themselves? with .xyz? 

# Obsessed with Cuttle: Parametric CAD for prototyping, producing, and procrastinating

One of my primary creative outlets this year has been playing with my local library's CNC laser cutter.

One of the first things I did at the start of my professional sabbatical was sign up to be trained on the  CNC laser cutter[^cutters] at my library's makerspace. The [Epilog Zing](TODO) is the first CNC (i.e., computer-programmable) shop tool I've gotten comfortable and fluent with: while I've worked with plenty of manual shop tools for wood and metal, I've never previously bridged the programming/shop divide.[^attempt] Unsurprisingly it is SO. MUCH. FUN.

[^cutters]: Technically my makerspace has two laser cutters, an [Epilog Zing](LINK) and a [Glowforge](LINK), and while I've trained to use both, I prefer the Zing. I'll save the reasoning---and my Zing workflow---for another post.

[^attempt]: I had one aborted attempt many years ago, where I got trained to use a very large (and very cool!) CNC laser cutter for working with sheet metal. Lack of materials, lack of transport for acquiring materials, and lack of initiative for solving either issue proved prohibitive, so I never ended up using it. Now that I feel comfortable with the desktop-sized CNC cutter, I feel a lot more empowered (and motivated) to try the large-format CNC again.

There is a vast and inspiring community of makers in this space who learn generously by sharing their project designs. While getting comfortable cutting and engraving basic shapes out of various of materials (wood, acrylic, cardstock), I used those. I quickly realized, however, that my joy in 


 I wasn't having much fun interested in cutting anything that I hadn't designed (or at least modified) myself---even if those files designed were patterned off of existing projects.

I don't remember exactly how I stumbled across [Cuttle.xyz](http://cuttle.xyz), but it was through some combination of searching "web-based" and "CAD" and "laser cutter." Cuttle provides a powerful design system and a very shallow learning curve, along with a commendable set of tutorials, pre-existing templates, and an active [Discord channel](TODO) in which something something something.

Since then I have been addicted.

## Show, don't tell

Right, so what have I made with it? The following only include projects I've designed myself (or at least, have significantly changed from their original design); I'm not including pre-existing Cuttle templates that I've printed (e.g., [this one](TODO), which makes a particularly fun/extensible gift). 

#### Bookends!
TODO-motivate

https://cuttle.xyz/@hannahilea/Bookends-eBHfPdCNGTIH

[link](https://cuttle.xyz/@hannahilea/Bookends-eBHfPdCNGTIH)

<iframe style="width: 640px; height: 360px; overflow: hidden; border: 5px solid black" frameborder="0" src="https://cuttle.xyz/@hannahilea/Bookends-eBHfPdCNGTIH"></iframe>

#### A cover for a set of doorbell chimes!
TODO

#### Punch cards for music boxes!
TODO

#### Pattern studies!
TODO

#### A card holder for my nibling's Yoto cards
TODO

Sidebar: are you a parent with a penchant for music curation? Or with friends who like to make playlists? Yoto is super awesome; my niblings love theirs, and I love that I can send them custom mixes. (Do not ask their parents if they love that I can send them custom mixes, seeing as the recent mix was a set of songs from a beloved and HIGHLY repetitive cartoon about trucks). 

#### A handful of calibration tools
Most of these were in support of some other project, either public or non, but they were a good way to explore Cuttle's [repeat modifiers with custom per-repeat transformations](TODO):
TODO

#### Weaving cartoon!
TODO

#### A poem!
TODO
RC intro, etc. It took me awhile to get comfortable calling what I was doing with Cuttle "programming", which in hindsight is ridiculous, but at the time felt bad. Imposter system, amirite? Graphical programming is still programming. ANYWAY. Early in my [batch at the Recurse Center](TODO-new blog post?), [creative coding session](TODO-new blog post creative coding)


#### Discussion

I think taht my overall favorite thing about playing around with Cuttle and the laser cutter is that I've been able to scale my ambitions as I learn more about how to make/use both tools. I'll make a separate post with my current end-to-end workflow, but as far as the Cuttle piece is concerned, Cuttle is a very powerful design system with a very shallow learning curve. Something something usual creative skills of programming (iteration, etc), but a different way of thinking about building out a system. (Flag awesome video tutorial on person building out box template) Similar frustrations, similar wins, something something. 

Also, it remains to be seen whether Cuttle is my gateway drug to using the historically professional CAD software. For now, it has met my needs, and I've been able to either design around any software limitations [1] or avoid larger version control reproducibility issues by prototyping only a portion of the system in Cuttle, keeping the non-CAD pieces in a different (and checked in) ecosystem[2], and assuming that I'll rebuild the Cuttle piece in a different language if I truly want to make the design more robust and user-friendly. The development team is friendly, supportive, and actively plugging away, and with any luck these limitations are a symptom of early-stage software development (a focus on rapid iteration rather than optimization and long-term exportability/reproducibility). 


[1] Sometimes large numbers of objects causes my session to choke! Truly the bounds of the project? Maybe my understandings of the abstractions need tweaking? So far not worth asking for help, and easier to just design around and approach in different ways, but the Cuttle Discord is active and supportive, and when I've asked for help their I've gotten it, so until further notice assume that this is not a fundamental limitation of the software!
[2] Lack of incremental and introspectable version control, or at least, import/export serialization that would enable use of external version control systems (i.e., git). 

---
### Footnotes

<footnotes/>

--- 
- created: 2024-09-24
- last updated: 2024-09-24
- tags: project-writeup, cuttle, cad, programming
