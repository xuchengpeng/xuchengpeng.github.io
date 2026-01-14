---
title: "My Custom Org Agenda"
date: 2026-01-14T10:41:37+08:00
categories: ["Emacs"]
tags: ["Emacs", "Org"]
---

By setting the `org-agenda-custom-commands` variable, we can define our own agenda views that only include necessary information.
<!--more-->

For example, a daily agenda view with four blocks:
1. Important tasks with highest priority.
2. Today's tasks.
3. Next three day's tasks, exclude the finished tasks.
4. Upcoming fourteen day's tasks, exclude the finished tasks.

```emacs-lisp
(setq org-agenda-custom-commands
      '(("d" "Daily Agenda"
         ((tags-todo "+PRIORITY=\"A\""
                     ((org-agenda-overriding-header "Important tasks")))
          (agenda "" ((org-agenda-overriding-header "Today")
                      (org-agenda-span 1)
                      (org-deadline-warning-days 0)
                      (org-scheduled-past-days 0)))
          (agenda "" ((org-agenda-overriding-header "Next 3 days")
                      (org-agenda-start-on-weekday nil)
                      (org-agenda-start-day "+1d")
                      (org-agenda-span 3)
                      (org-deadline-warning-days 0)
                      (org-agenda-skip-function '(org-agenda-skip-entry-if 'todo 'done))))
          (agenda "" ((org-agenda-overriding-header "Upcoming 14 days")
                      (org-agenda-time-grid nil)
                      (org-agenda-start-on-weekday nil)
                      (org-agenda-start-day "+4d")
                      (org-agenda-span 14)
                      (org-agenda-show-all-dates nil)
                      (org-deadline-warning-days 0)
                      (org-agenda-skip-function '(org-agenda-skip-entry-if 'todo 'done))))))))
```
