---
title: "DIY Modus Themes"
date: 2025-07-01T10:23:09+08:00
categories: ["Emacs"]
tags: ["Emacs", "Themes"]
---

Each Modus theme specifies a color palette that declares named color values and semantic color mappings. Both of those subsets can be overridden, thus refashioning the theme. Overrides are either shared, by being stored in the user option `modus-themes-common-palette-overrides`, or they are specific to the theme they name. In the latter case, the naming scheme of each palette variable is `THEME-NAME-palette-overrides`.
<!--more-->

## Make mode line borderless

```emacs-lisp
;; Remove the border
(setq modus-themes-common-palette-overrides
      '((border-mode-line-active unspecified)
        (border-mode-line-inactive unspecified)))

;; Or make border color same as background color
(setq modus-themes-common-palette-overrides
      '((border-mode-line-active bg-mode-line-active)
        (border-mode-line-inactive bg-mode-line-inactive)))
```

## Make fringe invisible

```emacs-lisp
(setq modus-themes-common-palette-overrides
      '((fringe unspecified)))
```

## Make line number less intense

```emacs-lisp
(setq modus-themes-common-palette-overrides
      '((fg-line-number-inactive fg-dim)
        (fg-line-number-active fg-main)
        (bg-line-number-inactive unspecified)
        (bg-line-number-active unspecified)))
```
