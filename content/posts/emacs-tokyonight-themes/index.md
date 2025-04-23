---
title: "Emacs tokyonight-themes"
date: "2024-02-01"
categories: ["Emacs"]
tags: ["Emacs", "Themes"]
summary: A clean dark Visual Studio Code theme that celebrates the lights of Downtown Tokyo at night.
---

> A clean dark Visual Studio Code theme that celebrates the lights of Downtown [Tokyo at night](https://www.google.com/search?q=tokyo+night&newwindow=1&sxsrf=ACYBGNRiOGCstG_Xohb8CgG5UGwBRpMIQg:1571032079139&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiayIfIhpvlAhUGmuAKHbfRDaIQ_AUIEigB&biw=1280&bih=666&dpr=2).

Tokyo Night theme was firstly published as a plugin for Visual Studio Code, now it has many [other ports](https://github.com/enkia/tokyo-night-vscode-theme#other-ports).

So I want to make it for [GNU Emacs](https://www.gnu.org/software/emacs/), [here it is](https://github.com/xuchengpeng/tokyonight-themes). The theme templates were taken from [modus-themes](https://github.com/protesilaos/modus-themes), and the color palettes were taken from [tokyonight.nvim](https://github.com/folke/tokyonight.nvim), these two themes are very popular and awesome with GNU Emacs or [Neovim](https://github.com/neovim/neovim).

This theme has four color palettes, as same sa tokyonight.nvim. I have add support with some popular packages which I often use with GNU Emacs, like Corfu, vertico, orderless, dired, diff-hl, hl-todo, multiple-cursors, symbol-overlay, vundo and so on.

If you like it, clone the theme, and add support for your plugins into the theme code. Also, you can use theme colors in code with `tokyonight-themes-with-colors`.

For example, add support for git-gutter-fr package.

```emacs-lisp
(tokyonight-themes-with-colors
  (custom-set-faces
    `(git-gutter-fr:added ((,c :foreground ,green)))
    `(git-gutter-fr:deleted ((,c :foreground ,red)))
    `(git-gutter-fr:modified ((,c :foreground ,yellow)))))
```

Evaluate the code with a function after loading tokyonight-themes.

If you want to change the color palettes, we have a option for palette overrides. Customize `tokyonight-<style>-palette-overrides` before you load the tokyonight-themes, style is an choice with storm, moon, night or day.

For example, change the blue and cyan color for tokyonight-day-theme.

```emacs-lisp
(setq tokyonight-day-palette-overrides
      '((blue . "#2e7de9")
        (cyan . "#007197")))
```
