---
title: "Emacs Highlight Keywords With Overlays"
date: 2025-09-05T14:36:21+08:00
categories: ["Emacs"]
tags: ["Emacs"]
summary: "Use overlays to highlight a buffer’s keywords on the screen."
---

之前的文章介绍了[使用font-lock来高亮关键字](../emacs-highlight-keywords/)，可以优化为使用性能更好的[Overlays](https://www.gnu.org/s/emacs/manual/html_node/elisp/Overlays.html)特性来实现。

```emacs-lisp
(defvar +highlight-keywords
  '(("\\<\\(TODO\\|FIXME\\|BUG\\)\\>" error)
    ("\\<\\(NOTE\\|HACK\\|MAYBE\\)\\>" warning)))

(defun +highlight-keywords-refresh (beg end _)
  "Refresh keywords overlays between position BEG and END."
  (let ((case-fold-search nil)
        (re "\\(\\sw\\|\\s_\\)+"))
    (save-excursion
      (save-match-data
        (goto-char end)
        (and (looking-at-p re)
             (setq end (re-search-forward "\\_>")))
        (goto-char beg)
        (and (not (looking-at-p "\\_<"))
             (looking-at-p (concat "\\(" re "\\|\\_>\\)"))
             (setq beg (re-search-backward "\\_<")))
        (+highlight-keywords-remove beg end)
        (mapc (lambda (pattern)
                (let ((keyword (car pattern))
                      (face (cadr pattern)))
                  (goto-char beg)
                  (while (re-search-forward keyword end t)
                    (let ((ov (make-overlay (match-beginning 0) (match-end 0))))
                      (overlay-put ov 'face face)
                      (overlay-put ov 'keyword t)))))
              +highlight-keywords)))))

(defun +highlight-keywords-remove (beg end)
  "Remove keywords overlays between position BEG and END."
  (mapc (lambda (ov)
          (and (overlay-get ov 'keyword)
               (delete-overlay ov)))
        (overlays-in beg end)))

(defun +highlight-keywords-enable ()
  "Enable `+highlight-keywords-mode'."
  (+highlight-keywords-refresh (point-min) (point-max) nil)
  (add-hook 'after-change-functions #'+highlight-keywords-refresh nil t))

(defun +highlight-keywords-disable ()
  "Disable `+highlight-keywords-mode'."
  (+highlight-keywords-remove (point-min) (point-max))
  (remove-hook 'after-change-functions #'+highlight-keywords-refresh t))

(define-minor-mode +highlight-keywords-mode
  "Highlight keywords, like TODO, FIXME..."
  :global nil
  (if +highlight-keywords-mode
      (+highlight-keywords-enable)
    (+highlight-keywords-disable)))

(add-hook 'prog-mode-hook #'+highlight-keywords-mode)
```
