# Twikoo + Cloudflare 最小部署思路

你现在没有传统后端服务器，可以优先走 `Twikoo + Cloudflare Workers`。

## 你最终要填回 Astro 的值

部署完成后，把这个地址写进：

```env
PUBLIC_TWIKOO_ENV_ID=https://your-twikoo-worker.example.workers.dev
```

如果你绑定了自定义域名，也可以填你自己的评论域名。

## 最小步骤

1. 按 Twikoo 官方文档部署 Cloudflare Workers 版本
2. 打开 Twikoo 管理面板
3. 配置：
   - 博主邮箱
   - SMTP 主机
   - SMTP 端口
   - SMTP 用户名
   - SMTP 密码
4. 回到 Astro 项目，写入 `PUBLIC_TWIKOO_ENV_ID`

## 你当前这个 Astro 项目里对应的位置

- 评论组件：[src/components/TwikooComments.astro](D:/_1blogs/astro-simple-blog/src/components/TwikooComments.astro)
- 环境变量示例：[.env.example](D:/_1blogs/astro-simple-blog/.env.example)
- 接入说明：[TWIKOO_SETUP.md](D:/_1blogs/astro-simple-blog/TWIKOO_SETUP.md)

## 官方文档

- Cloudflare Workers 部署：https://twikoo.js.org/backend
- 配置项说明：https://twikoo.js.org/configuration.html
- 快速上手：https://twikoo.js.org/quick-start
