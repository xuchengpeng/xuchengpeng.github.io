---
title: "Emacs中记笔记"
date: "2025-03-19"
categories: ["Emacs"]
tags: ["Emacs", "Denote", "Org"]
summary: Denote is a simple note-taking tool for Emacs. It is based on the idea that notes should follow a predictable and descriptive file-naming scheme. The file name must offer a clear indication of what the note is about, without reference to any other metadata. Denote basically streamlines the creation of such files while providing facilities to link between them.
---

以前在Emacs中记笔记主要使用Org mode配置Capture模板，将笔记记录在指定的文件中，这种方式很简陋，慢慢的指定的文件内容会很臃肿，笔记管理上没有实现文件分类管理等，而且也会拖慢Agenda的速度。

```emacs-lisp
(setq org-default-notes-file (expand-file-name "notes.org" org-directory)
      org-capture-templates
      `(("n" "Notes" entry
         (file+headline "notes.org" "Notes")
         "* %u %?\n%i\n%a")
        ("j" "Journal" entry
         (file+olp+datetree ,(expand-file-name "journal.org" org-directory))
         "* %U %?\%i\n%a")))
```

> Denote is a simple note-taking tool for Emacs. It is based on the idea that notes should follow a predictable and descriptive file-naming scheme. The file name must offer a clear indication of what the note is about, without reference to any other metadata. Denote basically streamlines the creation of such files while providing facilities to link between them.

[Denote](https://github.com/protesilaos/denote)是Protesilaos Stavrou大佬开发的一个记笔记的工具，它没有额外其他依赖，支持所有的文件类型，创建笔记的时候可以灵活的进行管理，后续的搜索功能也很方便。

安装完Denote后，配置 `denote-directory` 指定笔记存放的目录，直接运行 `denote` 命令，默认会提示输入标题，再提示输入关键字，最后就会在笔记目录下创建格式如 `DATE--TITLE__KEYWORDS.EXT` 的笔记文件。

可以通过配置 `denote-file-type` 设定笔记文件的类型，默认是org，或者在 `denote-prompts` 中增加 `file-type` ，这样在每次创建笔记时都可以单独指定类型，直接运行 `denote-type` 或 `denote-create-note-using-type` 也有一样的效果。

如果想要对笔记进行分类分目录管理，在 `denote-prompts` 中增加 `subdirectory` ，创建笔记的时候会提示进行目录的选择，包含 `denote-directory` 目录和它所有的子目录，子目录需要自己提前创建，Denote不会自己创建子目录；也可以直接运行 `denote-subdirectory` 或 `denote-create-note-in-subdirectory` 来选择子文件夹新建笔记。

以下是使用Denote的简单配置，更高级的功能大佬的[使用文档](https://protesilaos.com/emacs/denote)里面写的非常详细，待继续发掘。

```emacs-lisp
(use-package denote
  :ensure t
  :hook (dired-mode . denote-dired-mode)
  :init
  (defun +denote-find ()
    "Find in denote directory."
    (interactive)
    (require 'denote)
    (consult-fd denote-directory nil))

  (defun +denote-grep ()
    "Grep in denote directory."
    (interactive)
    (require 'denote)
    (consult-ripgrep denote-directory nil))

  (defvar-keymap +denote-map
    :doc "Denote map."
    "n" #'denote
    "s" #'denote-subdirectory
    "t" #'denote-type
    "d" #'denote-sort-dired
    "l" #'denote-link
    "L" #'denote-add-links
    "b" #'denote-backlinks
    "r" #'denote-rename-file
    "R" #'denote-rename-file-using-front-matter
    "f" #'+denote-find
    "g" #'+denote-grep)
  (keymap-global-set "C-c n" +denote-map)
  :config
  (setq denote-directory "~/note/")
  (denote-rename-buffer-mode 1))
```

这里的笔记文件查找和内容搜索我直接简单封装了两个函数，还可以直接使用大佬提供的[consult-denote](https://github.com/protesilaos/consult-denote)包。
