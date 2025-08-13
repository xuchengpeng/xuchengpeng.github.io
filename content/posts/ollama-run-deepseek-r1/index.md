---
title: "Ollama运行DeepSeek-R1"
date: "2025-02-08"
categories: ["Emacs"]
tags: ["Emacs", "LLM"]
---

[Ollama](https://ollama.com/) 是一个用于构建大型语言模型应用的工具，它提供了一个简洁易用的命令行界面和服务器，让你能够轻松下载、运行和管理各种开源LLM。
<!--more-->

[DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1) is DeepSeek’s first-generation reasoning models, achieving performance comparable to OpenAI-o1 across math, code, and reasoning tasks.

## 安装Ollama

从[Ollama Releases](https://github.com/ollama/ollama/releases)下载对应操作系统和版本的安装包，按照官方[指导文档](https://github.com/ollama/ollama/blob/main/docs/README.md)进行安装。

安装完成后修改 `OLLAMA_MODELS` 环境变量，指定后续模型文件的安装目录。

通过运行 `ollama serve` 命令启动Ollama，下面就可以安装和使用LLM了。

## 安装DeepSeek-R1

- 快捷安装
  - 通过运行 `ollama run deepseek-r1:7b` 命令来快速安装和运行模型，这里可以指定不同的模型版本。
- 手动安装
  - 也可以手动安装[Hugging Face](https://huggingface.co/)上下载的其他模型，从[DeepSeek-R1-Distill-Qwen-7B-GGUF](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-7B-GGUF)下载模型，这里存在很多量化的模型版本，这里可以选择下载默认的 `DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf` 。
  - 创建 `Modelfile` 文件，添加 `FROM DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf` 到文件中并保存。
  - 运行 `ollama create DeepSeek-R1-Distill-Qwen-7B-Q4_K_M -f ./Modelfile` 命令来安装模型。

安装完成后通过 `ollama list` 命令查看已安装的模型列表。

## 使用DeepSeek-R1

通过运行 `ollama run DeepSeek-R1-Distill-Qwen-7B-Q4_K_M:latest` 命令启动，在命令行直接进行对话。

也可以通过很多Web和桌面应用来使用DeepSeek-R1，比如[Open WebUI](https://github.com/open-webui/open-webui)。

在Emacs中，可以通过[gptel](https://github.com/karthink/gptel)来对接Ollama，添加以下代码注册DeepSeek-R1模型。

```emacs-lisp
(gptel-make-ollama "Ollama"
  :host "localhost:11434"
  :stream nil
  :models '(DeepSeek-R1-Distill-Qwen-7B-Q4_K_M:latest))
```
