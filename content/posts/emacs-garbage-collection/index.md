---
title: "Emacs Garbage Collection"
date: 2025-08-01T16:06:49+08:00
categories: ["Emacs"]
tags: ["Emacs"]
---

[gcmh](https://gitlab.com/koral/gcmh)(aka "Garbage Collection Magic Hack") is useful and easy to handle garbage collection for GNU Emacs.
<!--more-->

Enforce a sneaky Garbage Collection strategy to minimize GC interference with the activity. During normal use a high GC threshold is set. When idling GC is triggered and a low threshold is set.

A more detailed explanation of the rationale behind this can be found at [here](https://akrl.sdf.org/).
