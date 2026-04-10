---
title: 评论系统为什么切到 Twikoo
description: 部署方便，同时也支持邮件通知。
pubDate: 2026-04-08
type: note
tags:
  - Comment
  - Twikoo
heroImage: ../../assets/blog-placeholder-2.jpg
---

你提到的评论需求很明确：

- 评论表单需要用户名
- 需要邮箱
- 需要个人网站
- 被回复时要发送邮件

Twikoo 对你现在这类环境更合适，因为你没有传统后端服务器，又倾向走 Cloudflare 这类路线。

它同样支持昵称、邮箱、网站，以及邮件提醒，只是邮件通知依然需要你在评论服务端配置 SMTP。
