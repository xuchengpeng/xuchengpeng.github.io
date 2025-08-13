---
title: "Org导出HTML时生成稳定ID"
date: "2025-01-26"
categories: ["Emacs"]
tags: ["Emacs", "Org", "HTML"]
---

使用Org导出成HTML的时候，文档内部的标题和图片等元素都会生成格式如 `orgxxxxxxx` 的ID，这个ID从字面上并不能看出来对应那个元素，并且每次文档重新导出时，这个ID都会改变。
<!--more-->

为了使导出的ID具有字面含义，并且每次导出时ID都会稳定保持不变，我们可以为每个标题添加 `CUSTOM_ID` 属性，这样导出时会优先使用设定的ID，这需要我们为每个标题都手动添加这个属性，而且像图片这种元素就不适用这种方法，我们可以尝试用其他方法自动的生成稳定的ID。

Org导出HTML的时候，ID是通过 `org-export-get-reference` 生成的，并且通过 `org-html--reference` 调用生成到HTML中。

对 `org-export-get-reference` 做一些修改，优先从设定的 `CUSTOM_ID` 属性生成ID，否则就使用元素的 `:raw-value` 来生成ID，这样更有字面含义，生成的ID都缓存在文档的 `:internal-references` 属性中，当同一个文档内有重复的ID时提示错误，这个时候可以通过手动设定 `CUSTOM_ID` 来解决这种问题。

```emacs-lisp
(defun +org-html-stable-ids-extract-id (datum)
  "Extract a reference from a DATUM.

Return DATUM's `:CUSTOM_ID` if set, or generate a reference from its
`:raw-value` property.  If the DATUM does not have either, return
nil."
  (or
   (org-element-property :CUSTOM_ID datum)
   (let ((value (org-element-property :raw-value datum)))
     (when value
       (+org-html-stable-ids-to-kebab-case value)))))

(defun +org-html-stable-ids-to-kebab-case (string)
  "Convert STRING to kebab-case."
  (downcase
   (string-trim
    (replace-regexp-in-string "[^A-Za-z0-9\u4e00-\u9fa5]+" "-" string)
    "-" "-")))

(defun +org-export-stable-ids-get-reference (datum info)
  "Return a reference for DATUM with INFO.

    Raise an error if the ID was used in the document before."
  (let ((cache (plist-get info :internal-references))
        (id (+org-html-stable-ids-extract-id datum)))
    (or (car (rassq datum cache))
        (if (assoc id cache)
            (user-error "Duplicate ID: %s" id)
          (when id
            (push (cons id datum) cache)
            (plist-put info :internal-references cache)
            id)))))
```

对 `org-html--reference` 做一些修改，所有生成ID的地方都调用 `org-export-get-reference` 。

```emacs-lisp
(defun +org-html-stable-ids-reference (datum info &optional named-only)
  "Call `org-export-get-reference` to get a reference for DATUM with INFO.

If `NAMED-ONLY` is non-nil, return nil."
  (unless named-only
    (org-export-get-reference datum info)))
```

我们只在项目导出的时候应用这个功能，因此对 `org-publish` 做一些修改。

```emacs-lisp
(defun +org-publish (oldfun project &optional force async)
  (advice-add #'org-export-get-reference :override #'+org-export-stable-ids-get-reference)
  (advice-add #'org-html--reference :override #'+org-html-stable-ids-reference)
  (funcall oldfun project force async)
  (advice-remove #'org-export-get-reference #'+org-export-stable-ids-get-reference)
  (advice-remove #'org-html--reference #'+org-html-stable-ids-reference))

(advice-add #'org-publish :around #'+org-publish)
```
