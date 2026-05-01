# Matcha

Demo: https://khanaaaaaa.github.io/Matcha/

## What It Is

A retro-styled number merging game built for the browser. Slide tiles around a 4x4 grid and merge matching numbers together to reach 2048.

## Why I Made It

Made this for fun, my cousin was playing Talking Tom and remember one of the games I used to play when I was a child. Kind of random but I did want to try out making a webgame like this.

## How I Made It

Tech Stack: 
- HTML 
- CSS 
- JavaScript

Since, this is a simple project, I did not really struggle a lot. The grid has flat blocks that contains 16 values. The slide logic filters out empty tiles, merges matching neighbours, then pads the row back to 4. That same function handles all 4 directions by just flipping which indices get passed in.

## What I Learnt And What I Struggled With

The biggest struggle was getting the layout to behave. The ticker kept overflowing, the grid kept sitting outside the screen div, and there was a CSS selector typo that stopped one of the tile colours from ever showing up. Fixing all of that taught me a lot about how CSS containment actually works. Also commited with lots of spelling errors and had to revert that so learnt about GitHub in the process too.
