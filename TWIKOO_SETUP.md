# Twikoo 评论与邮件通知

Astro 版本现在已切换到 `Twikoo`。

## 前端要填的

把 `.env.example` 复制为 `.env`，并设置：

```env
PUBLIC_TWIKOO_ENV_ID=https://your-twikoo-service.example.com
```

`PUBLIC_TWIKOO_ENV_ID` 的值：

- 如果你用 Cloudflare / Vercel / Netlify / Railway 这类私有部署路线，填评论服务的 HTTPS 地址
- 如果你用腾讯云环境，填环境 ID

## 邮件通知

Twikoo 官方支持邮件通知，但要在服务端后台配置：

- 博主邮箱
- SMTP 服务

配置完成后，访客填写邮箱，被回复时就可以收到通知。

## Cloudflare

如果你想走 Cloudflare 路线，Twikoo 官方文档里有 Cloudflare workers 部署章节：

- https://twikoo.js.org/backend
- https://twikoo.js.org/configuration.html
