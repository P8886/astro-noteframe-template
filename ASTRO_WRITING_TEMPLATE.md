# Astro 写文章模板

你当前这套博客使用 `src/content/blog/*.md` 作为文章内容源。

## 当前可用 frontmatter

### `title`
文章标题。

### `description`
文章摘要。
会用于列表简介和页面描述。

### `pubDate`
发布时间。
会影响文章排序和页面显示时间。

### `updatedDate`
更新时间，可选。
如果填写，文章页会显示“更新于”。

### `type`
文章类型。
当前支持：

- `note`：笔记
- `short`：说说

### `tags`
标签数组。
用于归档和文章页标签展示。

### `heroImage`
文章头图，可选。
当前写法示例：

```yaml
heroImage: ../../assets/blog-placeholder-1.jpg
```

## 暂未启用但常见的字段

### `draft`
草稿开关。
如果你以后加上这个字段，就可以控制文章是否发布。

### `categories`
分类数组。
一般比 `tags` 更粗粒度，比如“生活 / 折腾 / 摄影”。

### `slug`
单独指定文章路由。
如果不写，当前项目默认按文件名生成，例如 `2026-04-10.md` -> `/blog/2026-04-10/`。

## 标准文章模板

```md
---
title: 今天折腾评论系统
description: 把评论、邮件提醒和页面样式一起理顺。
pubDate: 2026-04-10 20:30
updatedDate: 2026-04-10 21:10
type: note
tags:
  - Twikoo
  - 博客
heroImage: ../../assets/blog-placeholder-1.jpg
---

正文从这里开始。
```

## 多图文章推荐写法

最省事的方式是把图片放在 `public/images/文章日期/` 下面。

例如：

```text
public/images/2026-04-10/1.jpg
public/images/2026-04-10/2.jpg
public/images/2026-04-10/3.jpg
```

然后在 Markdown 里直接写：

```md
这是第一张图：

![安装界面](/images/2026-04-10/1.jpg)

这是第二张图：

![设置页面](/images/2026-04-10/2.jpg)

这是第三张图：

![最后效果](/images/2026-04-10/3.jpg)
```

## 说说模板

```md
---
title: 半夜又把页面收了一轮
description: 先记一句很短的话，别让它飘走。
pubDate: 2026-04-10 23:18
type: short
tags:
  - 说说
---

评论区终于不像贴上去的一块面板了。
```
