---
title: "Org Mode Archiving"
date: "2025-02-18"
categories: ["Emacs"]
tags: ["Emacs", "Org"]
---

When a project represented by a (sub)tree is finished, you may want to move the tree out of the way and to stop it from contributing to the agenda. Archiving is important to keep your working files compact and global searches like the construction of agenda views fast.
<!--more-->

The most common archiving action is to move a project tree to another file, the archive file. Type `C-c C-x C-a` to evaluate `org-archive-subtree-default`, archive the current entry using the command specified in the variable `org-archive-default-command`. The default command is `org-archive-subtree` to archive the subtree starting at point position to the location given by `org-archive-location`. The default archive location is a file in the same directory as the current file, with the name derived by appending `_archive` to the current file name. You can also choose what heading to file archived items under, with the possibility to add them to a datetree in a file. For information and examples on how to specify the file and the heading, see the documentation string of the variable `org-archive-location`.

If you want to just switch off certain subtrees without moving them to a different file for agenda views, you can use the `ARCHIVE` tag. A headline that is marked with the `ARCHIVE` tag stays at its location in the outline tree.

The archived (sub)trees will not be shown in agenda views by default, type `v a` or `v A` to toggle archived (sub)trees.
