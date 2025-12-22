---
title: "Publishing Org-mode files to HTML"
date: 2019-12-01T15:43:32+08:00
categories: ["Emacs"]
tags: ["Emacs", "Org", "HTML"]
summary: This is a guide to describe how to publish Org mode files to HTML.
---

> Emacs is the best editor in the world.

This is a guide to describe how to publish Org mode files to HTML.

## Basics

Create your blog files and css files.

{{< details summary="Example of file directory structure" open=true >}}
```shell
~/blog/org/
   |- css/
   |  `- worg.css
   |- img/
   |- index.org
   `- remember.org
```
{{< /details >}}

## Publishing the org project

{{< details summary="Example configuration of `org-publish-project-alist`" open=true >}}
```emacs-lisp
(setq org-publish-project-alist
      '(;; Publish the posts
        ("blog-notes"
         :base-directory "~/blog/org"
         :base-extension "org"
         :publishing-directory "~/blog/public"
         :recursive t
         :publishing-function org-html-publish-to-html
         :headline-levels 4
         :section-numbers nil
         :with-author nil
         :with-creator nil
         :with-email nil
         :with-timestamps nil
         :auto-preamble t
         ; :auto-postamble nil
         :html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/worg.css\"/>"
         :html-head-include-default-style nil
         ; :html-head-include-scripts nil
         ; :html-preamble nil
         ; :html-postamble nil
         :html-link-home "index.html"
         :html-link-up "sitemap.html"
         :html-metadata-timestamp-format "%Y-%m-%d %H:%M"
         :htmlized-source t
         :auto-sitemap t
         :sitemap-filename "sitemap.org"
         :sitemap-title "Sitemap")

        ;; For static files that should remain untouched
        ("blog-static"
         :base-directory "~/blog/org"
         :base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf\\|mp3\\|ogg\\|swf\\|eot\\|svg\\|woff\\|woff2\\|ttf"
         :publishing-directory "~/blog/public"
         :recursive t
         :publishing-function org-publish-attachment)

        ;; Combine the two previous components in a single one
        ("blog" :components ("blog-notes" "blog-static"))))
```
{{< /details >}}

Then run `org-publish-project` to generate html files to `~/blog/public` folder.

## Update

- 2025-12-22 Publish with [build-site.el](https://github.com/xuchengpeng/org-blog/blob/main/build-site.el).
- 2025-10-28 Export woff2 files.
- 2025-09-24 Render math with MathJax 4.
- 2025-07-29 Search with [Fuse.js](https://www.fusejs.io/).
- 2025-03-08 Insert post-meta for blog post.
- 2025-02-14 Don't use babel during export.
- 2025-02-13 Change date style of post list.
- 2025-02-05 Remove default meta description and keywords, customize meta tags in post files.
- 2025-01-27 Include chinese characters while generating stable IDs.
- 2025-01-08 Export checkbox with html type.
- 2025-01-07 Publish head, header and footer from HTML assets.
- 2025-01-06 Export the CSS selectors only.
- 2025-01-03 Prefer HTML5 semantic elements, export txt files.
- 2024-12-31 Remove preview contents, generate posts page automatically.
- 2024-12-27 Export with stable IDs and preview contents automatically.
- 2024-12-25 Add default meta description and keywords, export webmanifest files.
- 2024-02-18 Export ico files.
- 2023-12-28 Export with HTML5 and toc by default, customize headline-levels.
- 2023-12-27 Add head, header and footer options.
- 2023-05-22 Put all org publish configurations in [init-org.el](https://github.com/xuchengpeng/.emacs.d/blob/main/lisp/init-org.el).

## Other Org mode blogs

- https://taingram.org/blog/org-mode-blog.html
- https://ogbe.net/blog/emacs_org_static_site
- https://bastibe.de/
- https://writepermission.com/

{{< details summary="More examples" >}}
- https://orgmode.org/worg/org-blog-wiki.html
- https://www.danliden.com/posts/20211203-this-site.html
- https://www.faijdherbe.net/org-publish.html
- https://systemcrafters.net/publishing-websites-with-org-mode/building-the-site/
- https://miikanissi.com/blog/website-with-emacs/
- https://www.leonrische.me/pages/org_html_export.html
- https://pank.eu/blog/blog-setup.html
- https://kennyballou.com/blog/2022/05/org-mode-publishing/index.html
- https://sbr.pm/posts/2020-03-22-org-mode-website.html
- https://taxodium.ink/org-publish-blog.html
- https://rkallos.com/blog/2017-01-02-static-site-generation-with-org-mode.html
- https://gongzhitaao.org/orgcss/
- https://www.zhangjiee.com/blog/2019/build-site-with-org-mode.html
- https://elilif.github.io/articles/2024-02-21-all-in-emacs-blog.html
- https://julienblanchard.com/posts/building-a-website-with-org-mode.html
- https://www.thethingsengine.org/org2xhtml.html
- https://github.com/alphapapa/unpackaged.el#export-to-html-with-useful-anchors
- https://jeffkreeftmeijer.com/ox-html-stable-ids/
- https://github.com/jeffkreeftmeijer/ox-html-stable-ids.el
- https://randyridenour.net/posts/2024-12-17-blogging-with-org-mode.html
- https://github.com/rgb-24bit/org-html-theme-list
- https://github.com/fniessen/org-html-themes
- https://olmon.gitlab.io/org-themes/
- https://staff.fnwi.uva.nl/p.vanormondt/index.html
- https://meganrenae21.github.io/Meg-in-Progress/index.html
- https://ochicken.net/
- http://professor.ufabc.edu.br/~m.sambinelli/
- https://nicolas.petton.fr/blog/blogging-with-org-mode.html
{{< /details >}}

