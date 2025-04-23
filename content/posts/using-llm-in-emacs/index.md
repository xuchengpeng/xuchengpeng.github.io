---
title: "Emacs中使用大型语言模型"
date: "2025-01-11"
categories: ["Emacs"]
tags: ["Emacs", "LLM"]
---

Emacs有不少LLM的客户端，这里我们选择[gptel](https://github.com/karthink/gptel)，在 `init.el` 中添加以下代码：
<!--more-->

```emacs-lisp
(use-package gptel
  :ensure t
  :commands (gptel gptel-send gptel-rewrite))
```

gptel支持很多大型语言模型，大多数需要设置API Key或者Token，为了避免这些信息泄露，可以在 `custom.el` 中进行设定，这里以[Gemini](https://gemini.google.com/)和[Github Models](https://github.com/marketplace/models)为例。

```emacs-lisp
(with-eval-after-load 'gptel
  (gptel-make-openai "Github Models"
    :host "models.inference.ai.azure.com"
    :endpoint "/chat/completions?api-version=2024-05-01-preview"
    :stream t
    :key "your github token"
    :models '(gpt-4o gpt-4o-mini))
  (setq gptel-model 'gemini-1.5-flash
        gptel-backend (gptel-make-gemini "Gemini"
                        :key "your key"
                        :stream nil)
        gptel-use-curl nil))
```

gptel的 `:key` 属性支持设置为一个函数来返回key，另外一种通过环境变量的实现方式：

```emacs-lisp
;; in your custom.el
(setenv "GPTEL_GEMINI_KEY" "your gemini key")

;; in your config.el
(setq gptel-model 'gemini-1.5-flash
      gptel-backend (gptel-make-gemini "Gemini"
                      :key (lambda () (getenv "GPTEL_GEMINI_KEY"))
                      :stream nil)
      gptel-use-curl nil)
```
