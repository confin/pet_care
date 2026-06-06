# AGENTS.md — pet_care 项目

> 项目级 Codex 协作文档。本文档聚焦本仓库特性,全局偏好见 `~/.Codex/AGENTS.md`。
> 最后更新: 2026-06-06(基于 commit `4c84334`)

---

## 一、项目概览

**毛茸茸宠物洗护馆** —— 长沙本地宠物洗护美容品牌的**单页营销展示网站**(demo)。

- 类型: 静态/单页落地页(非电商,无后端 API)
- 受众: 长沙本地养宠用户
- 转化目标: 微信/电话预约
- 公开仓库: https://github.com/confin/pet_care
- 仓库描述: `Next.js demo for pet grooming store`

---

## 二、技术栈

| 类别 | 选型 | 版本 |
|---|---|---|
| 框架 | Next.js (App Router) | 15.3.1 |
| UI 库 | React + React DOM | 19.1.0 |
| 类型 | TypeScript (strict) | 5.8.3 |
| 样式 | Tailwind CSS v4 | 4.1.4 |
| 地图 | Leaflet (动态导入) | 1.9.4 |
| Node 类型 | @types/node | 22.14.1 |

**注意点**:
- Tailwind v4 通过 `globals.css` 顶部 `@import "tailwindcss"` 启用,无 `tailwind.config.js`
- Leaflet 用 `await import("leaflet")` 动态加载,避免 SSR 报错
- Leaflet CSS 通过 CDN + SRI 引入(`layout.tsx` 头部)
- AOS 动画**自实现**(globals.css 的 keyframes + `AOSProvider` 的 IntersectionObserver),未用第三方 aos 库

---

## 三、目录结构

```
.
├── .gitignore
├── next.config.ts          # 空配置 {}
├── package.json            # 4 deps + 5 devDeps
├── tsconfig.json           # paths: @/* → ./src/*
├── next-env.d.ts
├── public/                 # 空目录
├── src/
│   ├── app/
│   │   ├── globals.css     # 18.7KB,Tailwind v4 + 主题变量 + 各 section 样式
│   │   ├── layout.tsx      # 根布局,metadata + 字体 + leaflet CSS
│   │   └── page.tsx        # 首页(组合 12 个组件)
│   └── components/         # 12 个组件(见下方)
```

---

## 四、组件清单

按 `page.tsx` 渲染顺序:

| 顺序 | 组件 | 类型 | 职责 |
|---|---|---|---|
| 1 | `AOSProvider` | client | IntersectionObserver 实现 fade-up/fade-left/fade-right 滚动动画 |
| 2 | `Navbar` | client | 顶部导航(锚点跳转各 section) |
| 3 | `Hero` | server | 首屏(标题 + 3 个统计 + CTA) |
| 4 | `About` | server | 关于我们(5+ 年经验,3000+ 宠物) |
| 5 | `Services` | server | 6 项服务卡片 |
| 6 | `WhyUs` | server | 6 大选择理由 |
| 7 | `MapSection` | client | Leaflet 地图(高德 tile,定位店铺坐标) |
| 8 | `Reviews` | server | 6 条顾客评价 |
| 9 | `Contact` | client | 联系信息 + 4 字段预约表单 |
| 10 | `Footer` | server | 页脚 |
| 11 | `BackToTop` | client | 回到顶部按钮(scrollY > 500 显示) |
| 12 | `WhatsApp` | server | 浮窗按钮(链接到 wa.me) |

> **client** = 带 `"use client"`; **server** = Next.js 默认 RSC

---

## 五、业务信息(从源码提取,需更新改这里)

### 店铺

- 名称: 毛茸茸宠物洗护馆
- Slogan: 让每一只毛孩子焕然一新
- 成立: 2019 年
- 地址: 长沙市岳麓区谷岳路与岳华路交界 · 建发缦云小区
- 电话: 188-8888-8888
- 微信: maorongrong_pet
- 营业时间: 周一至周日 09:00 - 20:00
- 地图坐标: 28.249276, 112.94415
- 地图 tile: 高德 `webrd0{s}.is.autonavi.com`

### 营销数据(Hero 区)

- 服务宠物: 3000+
- 好评率: 98%
- 行业经验: 5年+

### 服务价格

| 服务 | 价格 | 单位 |
|---|---|---|
| 宠物洗澡 | ¥68 | 起 |
| 美容造型 | ¥168 | 起 |
| 宠物 SPA | ¥298 | 起 |
| 宠物洁牙 | ¥88 | 起 |
| 指甲修剪 | ¥38 | 起 |
| 宠物寄养 | ¥88 | /天 |

### 优惠

- 首次洗护 8 折(Contact 区文案)

---

## 六、开发命令

```bash
npm install         # 安装依赖
npm run dev         # 启动开发服务器(默认 http://localhost:3000)
npm run build       # 生产构建
npm run start       # 启动生产服务器
```

---

## 七、Git 状态

```
HEAD:    4c84334 更新"能够享受"            ← 当前
prev:    1f5b495 chore: init Next.js project
remote:  git@github.com:confin/pet_care.git (SSH)
```

**已回退 commit**(reflog 30 天内可恢复):
- `f3f6075 feat(contact): add appointment time field to booking form` — 在 Contact.tsx 加了 4 行预约时间字段
  - 恢复命令: `git reset --hard f3f6075`

**Remote URL**: SSH 形式(`git@github.com:...`),用 `id_ed25519` 公钥(注释 `94588516@qq.com`)认证

**已配的全局 git 代理**(Administrator 用户级 `~/.gitconfig`):
```
[safe]
    directory = *
```
用途: 绕过 Codex 沙箱触发 `dubious ownership` 警告

---

## 八、已知注意事项

### 不要做

- **不要往 `Contact.tsx` 加"预约时间字段"** —— 该改动被回退(`f3f6075`),不是当前需求
- **不要重新添加根目录 `index.html`** —— 是旧版纯 HTML 项目的残留,Next.js 项目不需要
- **不要 commit `config_updated.toml` / `dev-server-*.log`** —— 临时文件,被 `.gitignore` 排除

### 灰色地带

- **Contact 表单 `onSubmit` 仅 `preventDefault`**,未对接任何后端。如果要真实提交,需要:
  - 决定后端(自建 API? 第三方表单服务如 Formspree?)
  - 加环境变量(放入 `.env.local`,被 gitignore 排除)
- **WhatsApp 浮窗用了 `wa.me`** 链接,但目标客户在长沙多用微信 —— 这是 demo 链接(实际号码 `+86 188-8888-8888`),要切换可在 `WhatsApp.tsx` 改 href
- **地图 tile 用高德**,未带 API key(走的是 `webrd0{s}.is.autonavi.com/appmaptile` 公共瓦片);如要换高德正式 key,需 `MapSection.tsx` 改 URL

### 性能/SSR 注意

- `MapSection` 必须保持 `await import("leaflet")` 动态加载,不能直接 `import`(leaflet 引用 `window` 会 SSR 报错)
- `Contact.tsx` 是 client 组件因为有 `onSubmit` 处理器;如果改成纯展示,可降级为 server 组件
- Tailwind v4 的主题/工具类扩展需要新写法(@theme 指令),不是 v3 的 `tailwind.config.js` extend

---

## 九、修改前先查

按全局规矩"改一处 = grep 全仓",本项目常用关键词:

- 店铺名称: `毛茸茸` `宠物洗护馆`
- 电话/微信: `188-8888-8888` `maorongrong_pet`
- 地址: `岳麓区` `建发缦云`
- 坐标: `28.249276` `112.94415`
- 价格: `¥68` `¥168` `¥298` `¥88` `¥38`
- 主题色: `#D4A574` `#F4A261` `#B8864E`

---

## 十、当前进度 / 交接

**最近改动**: 重置到 `4c84334`,撤销 `f3f6075` 的预约时间字段改动

**未完成项**:
- (无明显 TODO,需要确认)

**下次会话注意**:
- 沙箱是 `workspace-write`,需走 `git -C` 或 escalated 模式写 `.git` 内部
- 改 `.git/config` 推荐交给用户在真实 cmd 跑(`git config --file ...`)
- HTTPS push 需 PAT + 配置 `http.proxy=http://127.0.0.1:7897` + `http.sslVerify=false`
