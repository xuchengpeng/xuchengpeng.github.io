---
title: "Hugo partialCached"
date: 2025-08-08T15:18:14+08:00
categories: ["Themes"]
tags: ["Hugo"]
summary: "Allows for caching of partials that do not need to be re-rendered on every invocation."
---

Executes the given template and caches the result, optionally passing context. If the contains a return statement, returns the given value, else returns the rendered output.

The `partialCached` function can offer significant performance gains for complex templates that don’t need to be re-rendered on every invocation.

Here is the simplest usage:

```html
{{ partialCached "footer.html" . }}
```

Pass additional arguments to `partialCached` to create variants of the cached partial. For example, if you have a complex partial that should be identical when rendered for pages within the same section, use a variant based on section so that the partial is only rendered once per section:

```html
{{ partialCached "footer.html" . .Section }}
```
