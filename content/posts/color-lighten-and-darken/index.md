---
title: "Color Lighten and Darken"
date: 2025-08-28T13:07:17+08:00
categories: ["Emacs"]
tags: ["Emacs", "Themes"]
summary: "RGB color lighten and darken in catppuccin-themes."
---

```elisp
(defun catppuccin--hex-to-rgb (color)
  "Convert a hex COLOR string like \"#rrggbb\" to R, G, B."
  (cl-loop with div = (float (car (tty-color-standard-values "#ffffff")))
           for x in (tty-color-standard-values (downcase color))
           collect (/ x div)))

(defun catppuccin--rgb-to-hex (r g b)
  "Convert R, G, B to a hex color string."
  (format "#%02x%02x%02x" (* r 255) (* g 255) (* b 255)))

(defun catppuccin--blend (color1 color2 alpha)
  "Blends COLOR1 onto COLOR2 (hexidecimal strings) with ALPHA (a float between 0 and 1)."
  (apply #'catppuccin--rgb-to-hex
         (cl-loop for it in (catppuccin--hex-to-rgb color1)
                  for other in (catppuccin--hex-to-rgb color2)
                  collect (+ (* alpha it) (* (- 1 alpha) other)))))

(defun catppuccin-lighten (color value)
  "Lighten COLOR by VALUE% (0–100)."
  (let* ((factor (/ value 100.0)))
    (catppuccin--blend color "#ffffff" (- 1 factor))))

(defun catppuccin-darken (color value)
  "Darken COLOR by VALUE% (0–100)."
  (let* ((factor (/ value 100.0)))
    (catppuccin--blend color "#000000" (- 1 factor))))

(catppuccin-darken "#eff1f5" 5)
(catppuccin-lighten "#303446" 5)
```
