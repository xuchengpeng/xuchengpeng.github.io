---
title: "JetBrainsMono With Slashed Zero"
date: 2025-10-16T12:50:23+08:00
categories: ["Themes"]
tags: ["Themes"]
summary: "With OpenType Feature Freezer, freeze slashed zero with JetBrainsMono font."
---

```shell
pip install opentype-feature-freezer
find ./ -name "*.ttf" | xargs -I {} pyftfeatfreeze -f 'zero' {} {}
```
