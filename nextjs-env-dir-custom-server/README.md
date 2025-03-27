# 运行指南

## 克隆项目

```sh
git clone -b nextjs-env-dir-custom-server https://github.com/clin211/next-awesome/tree/nextjs-env-dir-custom-server
```

## 安装依赖

可以使用自己熟悉的包管理工具，项目搭建时使用的时 pnpm，建议保持一致！

```sh
pnpm install
```

在运行之前也可以先在项目的根目录创建 `.env` 文件，内容如下：

```env
USERNAME=myuser
DB_HOST=localhost
DB_USER=$USERNAME
DB_PASS=mypassword
TWITTER_USER=$USERNAME
TWITTER_URL=https://x.com/$USERNAME
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

## 运行项目

```sh
pnpm dev
```

成功启动后根据终端提示的端口相关信息，在浏览器中访问呢即可！
