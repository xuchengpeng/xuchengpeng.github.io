---
title: "Convert Fonts to Different Formats"
date: 2025-11-04T14:42:17+08:00
categories: ["Themes"]
tags: ["Themes", "TX-02", "Berkeley Mono"]
summary: fontTools is a family of libraries and utilities for manipulating fonts in Python.
---

[fontTools](https://github.com/fonttools/fonttools) is a family of libraries and utilities for manipulating fonts in Python.

```bash
$ pip install fonttools[woff]
$ python
>>> from fontTools.ttLib import TTFont
>>> f = TTFont("TX-02-Regular.ttf")
>>> f.flavor="woff"
>>> f.save("TX-02-Regular.woff")
>>> f.flavor="woff2"
>>> f.save("TX-02-Regular.woff2")
```
