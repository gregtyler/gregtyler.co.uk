---
layout: post.njk
title: Deciding to build a Game Boy emulator in Rust
date: 2024-10-11
tags:
  - Emulation
summary: With no experience of making emulators or using the Rust programming language, why I decided to make a Game Boy emulator in Rust
---

I recently decided to attempt building a Game Boy emulator in Rust, which is a bit of a left-field idea because I've never made an emulator before and I've never used Rust before. So I want to start this series by talking about why I started doing this.

## Why start this project

This project is a bit of a gamble, and it came together through an alignment of things that interest me, and skills that I want to develop. It was also—to be perfectly honest—a bit of a spur of the moment thing. The idea captured me one morning, and that afternoon I was rendering things from a ROM to a screen.

A key lesson here was that I was effectively able to come up with a prototype quickly, and once I'd proved I could render something I gained the confidence that this was a feasible project. I have a lot of project ideas, most of which don't make it past the ideation stage, so an early prototype is hugely valuable to me.

### Low-level code

One of my first motivations for this project was the ability to learn about working with low-level code. The closest I've come to this before is writing things that directly interact with TCP protocols, and I've always been interested in what you can do with minimal abstraction.

I knew that emulation was heavily focussed on this: old gaming systems had a limited number of supported operations that games could make use of, and the addressing system to do so is very minimal in order to keep form factor and cartridge size small.

I also knew that Rust was a great language for low-level code, with its focus on memory management. It would let me really focus on writing explicit code, and not give me some of the cheap outs that I could get away with in more abstracted languages.

An example of this that I quickly identified was that numeric types require you to define a size in bits, so an `i8`-type variable can only store 8 bits. If you try to add or multiply beyond this limit, Rust will raise overflow errors. As well as forcing me to think more carefully about the variables I use, this also helps to properly emulate older systems which had hardware-enforced limits.

### Interest in game development and emulation

My introduction to programming—the start of my career—was in game development, via an early version of [GameMaker](https://gamemaker.io/). I found the limitless potential of programming games fascinating, delighted to make simple platformers and thrilled when I could render things in 3D.

My career took me towards web development, which is a completely different medium: almost everything is done on-demand (a user interacting with a page, a request from another server, a cron job) rather than in a continuously-running loop. Graphics on the web are vastly simpler, mostly handled by the browser through excellently maintained standards.

But the itch for game development, and its different ways of thinking, has always stuck with me as a hobby.

I've also long been interested in the history of game development, and particularly with the obscure loopholes developers had to go through to get the most out of the tiny amount of memory they had: stories like bushes and clouds sharing sprites in Super Mario Bros, or how Street Fighter stored bits of a character's animations in other characters' sprite sheets.

I hoped that building an emulator would give me more appreciation for the history of game development and the "bare bones" nature that my predecessors worked on.

### Learning new languages

I like learning new programming languages. It's interesting personally and it's helpful to know what's available for me and my colleagues to use. I've never used Rust, I've heard good things, and this is a good excuse.

I was particularly interested in using Rust because it takes me out of my comfort zone in a few ways: proper memory management, lifetimes, no built-in renderer. It also seems like a natural fit for an emulator: it's designed for high performance, low memory usage, and gives good access to internals. But it's still got a more friendly standard library than C.

One of the challenges of trying to learn a new language is that you don't get much of a chance to get to grips with its features. The first thing I made with Go basically just called AWS APIs and ran an external program on the command line: hardly a tour of Go's greatest features. I'm hopeful that an emulator will give me plenty of opportunities to see how Rust really works.

---

I'm excited to start this project: I'm passionate about the outcome, it will be an interesting challenge, and I'm confident I'll get something out of it.

Next up, I'll be stepping away from Rust to build a small emulator in JavaScript. That will teach me the basics of emulation so I can port to Rust and start building something more complex.
