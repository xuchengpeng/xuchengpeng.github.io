---
title: "llama.cpp使用"
date: "2025-02-10"
categories: ["Emacs"]
tags: ["Emacs", "LLM"]
---

前面的一篇文章介绍了[Ollama运行DeepSeek-R1](../ollama-run-deepseek-r1/)，实际上Ollama的后端使用的是[llama.cpp](https://github.com/ggerganov/llama.cpp)。
<!--more-->

> The main goal of llama.cpp is to enable LLM inference with minimal setup and state-of-the-art performance on a wide range of hardware - locally and in the cloud.
> 
> - Plain C/C++ implementation without any dependencies
> - Apple silicon is a first-class citizen - optimized via ARM NEON, Accelerate and Metal frameworks
> - AVX, AVX2, AVX512 and AMX support for x86 architectures
> - 1.5-bit, 2-bit, 3-bit, 4-bit, 5-bit, 6-bit, and 8-bit integer quantization for faster inference and reduced memory use
> - Custom CUDA kernels for running LLMs on NVIDIA GPUs (support for AMD GPUs via HIP and Moore Threads MTT GPUs via MUSA)
> - Vulkan and SYCL backend support
> - CPU+GPU hybrid inference to partially accelerate models larger than the total VRAM capacity
> 
> The llama.cpp project is the main playground for developing new features for the ggml library.

安装llama.cpp也非常简单，从[llama.cpp Releases](https://github.com/ggerganov/llama.cpp/releases)页面下载对应硬件的二进制文件，注意依赖的CUDA库文件较大所以单独打包了，将所有的文件解压到同一个目录就可以使用。

以DeepSeek-R1为例，运行 `llama-server -m ./DeepSeek-R1-Distill-Llama-8B-Q5_K_M.gguf --port 11435 --no-mmap -c 16384 -np 4 -t 10 -ngl 99` 命令在后端启动模型，此时可以在浏览器打开 `http://localhost:11435` ，这是一个简单的聊天界面，也可以安装使用[Open WebUI](https://github.com/open-webui/open-webui)这样功能更强大的应用。

llama.cpp还提供了 `llama-cli` 工具，可以直接在命令行中和模型进行对话。

在Emacs中，可以通过[gptel](https://github.com/karthink/gptel)来对接llama.cpp，添加以下代码注册DeepSeek-R1模型。

```emacs-lisp
(gptel-make-openai "llama-cpp"
  :stream nil
  :protocol "http"
  :host "localhost:11435"
  :models '(DeepSeek-R1))
```
