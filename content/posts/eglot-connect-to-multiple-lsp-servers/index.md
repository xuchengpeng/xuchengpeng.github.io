---
title: "Eglot: Connect to Multiple LSP Servers"
date: 2025-12-18T08:53:40+08:00
categories: ["Emacs"]
tags: ["Emacs", "Eglot", "LSP"]
summary: Use rassumfrassum to connect a LSP client to multiple LSP servers.
---

In Eglot, multiple servers are acceptable alternatives for handling a given major-mode, but only one server takes effect. Other lsp clients like lsp-mode and lsp-bridge already support multiple LSP servers, other editors like VSCode, Neovim, Zed also support this feature.

[rassumfrassum](https://github.com/joaotavora/rassumfrassum), developed by the author of Eglot, can work with Eglot to connect to multiple servers. Hopefully, Eglot may have built-in multiple LSP servers support.

The `rass` program, the main entry point, behaves like an LSP stdio server, so clients think they are talking to single LSP server, even though they are secretly talking to many. Behind the scenes more stdio LSP server subprocesses are spawned.

For Python development with ty and Ruff, run from the command line: `rass -- ty server -- ruff server`.

Add server associations to `eglot-server-programs` for Eglot:
```emacs-lisp
(add-to-list 'eglot-server-programs
             '((python-mode python-ts-mode) . ("rass" "--" "ty" "server" "--" "ruff" "server")))
```
