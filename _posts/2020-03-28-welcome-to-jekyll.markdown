---
layout: post
title:  "Processing (p5.js) Sketches"
date:   2020-03-28 12:02:49 +0000
categories: p5
---

Here I am storing all p5 sketches. Hosting on github pages allows me to quickly visualize and/or share them through the web.

## Optical flow through webcam

In this sketch, the optical flow computed from the webcam is used to hit a ball with simple physics.

[Sketch](/p5sketch/CamSketch/)

## Epidemic Simulator

This is a simple toy model of exponential growth, inspired from what I saw elsewhere. But notably, 3Blue1Brown did an amazing video mimicking this simulation too.
Here We simply have every person as a randomly moving ball that when it collides when another can transmit its infected states. Lockedown and social distancing scenario are available, and the real-time build up of an histogram is shown to observe the potential flattening of the peak.

[Sketch](/p5sketch/CollisionsBox2D/)

## DLA

The diffusion-limited aggregation ([DLA]) at play. Although the random walks are drifting towards the center to speed-up the growth of the cluster, and some interactivity allows the user to click anywhere to seed new walkers spawning under the mouse.

[Sketch](/p5sketch/DLA/)


## Orbits

Very simple sketch, a ball orbiting around mouse position. Traces is shown with alternating colours.
Damping is on at the moment (hence ball is spiralling towards focus).

[Sketch](/p5sketch/OrbitalMouse/)


## Arrows

Some recursivity... 

[Sketch](/p5sketch/Arrows/)

[DLA][https://en.wikipedia.org/wiki/Diffusion-limited_aggregation]
