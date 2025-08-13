---
title: "Generating sitemap in Emacs"
date: "2024-12-27"
categories: ["Emacs"]
tags: ["Emacs"]
---

使用Emacs导出博客时，可以导出Sitemap文件，可以很方便的生成最近的文章信息或者归档列表。
<!--more-->

通过配置Sitemap导出时的参数，定制化的生成不同形式的Sitemap文件。

## :sitemap-filename

导出的文件名，默认为 `sitemap.org` ，对应导出 `sitemap.html` 文件。

## :sitemap-title

标题，默认为文件名称。

## :sitemap-format-entry

这个选项用于配置每个条目生成的格式，这个选项是一个函数，包含3个参数：文件或目录名、样式和当前项目。函数返回一个字符串，默认情况下生成每个文件的链接，使用文件标题作为链接描述。可以使用 `org-publish-find-date`, `org-publish-find-title`, `org-publish-find-property` 获取附加信息来定制生成的样式。

```emacs-lisp
(defun +org-publish-org-sitemap-format-entry (entry style project)
(cond ((not (directory-name-p entry))
        (format "%s - [[file:%s][%s]]"
                (format-time-string "%Y-%m-%d" (org-publish-find-date entry project))
                entry
                (org-publish-find-title entry project)))
        ((eq style 'tree)
        ;; Return only last subdir.
        (file-name-nondirectory (directory-file-name entry)))
        (t entry)))
```

## :sitemap-function

用于生成Sitemap文件的函数，默认情况下，生成指定标题的Sitemap文件，并把所有条目以list的方式添加到文件中。也可以将所有的list转换为subtree。

```emacs-lisp
(defun +org-publish-org-sitemap (title list)
"Sitemap generation function."
(concat "#+TITLE: " title "\n"
        "#+OPTIONS: toc:nil\n\n"
        (org-list-to-subtree list)))
```

## :sitemap-sortfiles

默认设置为 `alphabetically` ，按字母排序；还可以设置为 `chronologically` 或 `anti-chronologically` 按照日期或者日期逆序排序，日期通过 `org-publish-find-date` 获取。
