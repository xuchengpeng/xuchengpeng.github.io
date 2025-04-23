---
title: "Emacs Proxy"
date: "2024-02-05"
categories: ["Emacs"]
tags: ["Emacs"]
---

Proxy servers are commonly used to provide gateways through firewalls or as caches serving some more-or-less local network.

<!--more-->

Each protocol (HTTP, FTP, etc.) can have a different gateway server. Proxying is conventionally configured commonly amongst different programs through environment variables of the form protocol-proxy, where protocol is one of the supported network protocols (http, ftp, etc.). The library recognized such variables in either upper or lower case.

## System Proxy

Add these lines to `.bashrc`:

```bash
export http_proxy=http://username:password@proxy.xxx.com:8080
export https_proxy=${http_proxy}
```

Or add these lines to `init.el`:

```emacs-lisp
(setenv "http_proxy" "http://user:pass@proxy.server:port")
(setenv "https_proxy" "https://user:pass@proxy.server:port")
(setenv "no_proxy" "localhost,127.0.0.1,.local")
```

## URL Proxy Services

Proxies are supported by URL package, by setting `url-proxy-services` to an assoc list mapping url services and the proxy servers that support them.

```emacs-lisp
(setq url-proxy-services
      '(("http"     . "proxy.example.com:8080")
        ("https"    . "proxy.example.com:8080")
        ("no_proxy" . "^.*example.com")))
```

If the proxy services need to be authorized, we need to customize `url-http-proxy-basic-auth-storage`.

```emacs-lisp
(setq url-http-proxy-basic-auth-storage
      (list (list "proxy.example.com:8080"
                  (cons "Input your LDAP UID !"
                        (base64-encode-string "LOGIN:PASSWORD")))))
```

## Socks Proxy

Enable socks proxy:

```emacs-lisp
(setq url-gateway-method 'socks
      socks-server '("Default Server" "socks.proxy.com" 1080 5)
      socks-noproxy '("localhost"))
```

If the `socks-server` need to be authorized, `socks-username` and `socks-password` need to be customized.

Disable socks proxy:

```emacs-lisp
(setq url-gateway-method 'native
      socks-server nil
      socks-noproxy nil)
```
