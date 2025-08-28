---
title: "Color Lighten and Darken"
date: 2025-08-28T13:07:17+08:00
categories: ["Emacs"]
tags: ["Emacs", "Themes"]
summary: "RGB color lighten and darken in catppuccin-themes."
---

```elisp
(defun catppuccin--hex-to-rgb (color)
  "Convert a hex COLOR string like \"#rrggbb\" to a list of three integers."
  (mapcar (lambda (i) (string-to-number (substring color i (+ i 2)) 16))
          '(1 3 5)))

(defun catppuccin--rgb-to-hex (r g b)
  "Convert R, G, B integers to a hex color string."
  (format "#%02x%02x%02x" r g b))

(defun catppuccin-lighten (color value)
  "Lighten COLOR by VALUE% (0–100)."
  (let* ((factor (/ value 100.0)))
    (apply #'catppuccin--rgb-to-hex
           (mapcar (lambda (v)
                     (round (min 255 (+ (* (- 255 v) factor) v))))
                   (catppuccin--hex-to-rgb color)))))

(defun catppuccin-darken (color value)
  "Darken COLOR by VALUE% (0–100)."
  (let* ((factor (/ value 100.0)))
    (apply #'catppuccin--rgb-to-hex
           (mapcar (lambda (v)
                     (floor (* (- 1 factor) v)))
                   (catppuccin--hex-to-rgb color)))))

(catppuccin-darken "#eff1f5" 5)
(catppuccin-lighten "#303446" 5)
```
