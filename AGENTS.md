# AGENTS.md — pet_care 项目

> 项目级 Codex 协作文档。本文档聚焦本仓库特性,全局偏好见 `~/.Codex/AGENTS.md`。
> 最后更新: 2026-06-06(基于 commit `<new>`,接入 Supabase 预约后端)

---

## 一、项目概览

**毛茸茸宠物洗护馆** —— 长沙本地宠物洗护美容品牌的**单页营销展示网站**(demo)。

- 类型: 单页营销展示网站 + 预约后端 API(Route Handler)
- 后端存储: Supabase PostgreSQL,通过 Session Pool 直连
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
| 数据库 | PostgreSQL (Supabase 托管) | 15+ |
| 驱动 | postgres.js | 3.4.9 |
| 通知 | 企业微信自建应用 (corpid+agentid+corpsecret) | - |
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
├── supabase/
│   └── migrations/         # SQL 迁移脚本(DDL)
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 + 主题变量 + 各 section 样式
│   │   ├── layout.tsx      # 根布局,metadata + 字体 + leaflet CSS
│   │   ├── page.tsx        # 首页(组合 12 个组件)
│   │   └── api/
│   │       └── appointments/
│   │           └── route.ts  # POST 预约接口
│   ├── components/         # 12 个组件(见下方)
│   └── lib/
│       ├── db.ts           # postgres.js 客户端(globalThis 缓存,Session Pool)
│       └── notify.ts       # 企业微信应用消息封装(token 缓存 + 自动刷新)
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
| 9 | `Contact` | client | 联系信息 + 4 字段预约表单 + fetch POST /api/appointments |
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

- **WhatsApp 浮窗用了 `wa.me`** 链接,但目标客户在长沙多用微信 —— 这是 demo 链接(实际号码 `+86 188-8888-8888`),要切换可在 `WhatsApp.tsx` 改 href
- **地图 tile 用高德**,未带 API key(走的是 `webrd0{s}.is.autonavi.com/appmaptile` 公共瓦片);如要换高德正式 key,需 `MapSection.tsx` 改 URL

### 性能/SSR 注意

- `MapSection` 必须保持 `await import("leaflet")` 动态加载,不能直接 `import`(leaflet 引用 `window` 会 SSR 报错)
- `Contact.tsx` 是 client 组件因为有 `useState` + `fetch`;如要 SSR 静态化,需把表单拆成独立 client 子组件
- Tailwind v4 的主题/工具类扩展需要新写法(@theme 指令),不是 v3 的 `tailwind.config.js` extend
- API Route `route.ts` 用 `runtime = "nodejs"`(postgres.js 是 Node-only,Edge 会挂)+ `dynamic = "force-dynamic"`(不要静态化)

- API Route `route.ts` 用 `runtime = "nodejs"`(postgres.js 是 Node-only,Edge 会挂)+ `dynamic = "force-dynamic"`(不要静态化)


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

**最近改动**: 接入 Supabase 预约后端(详情见"十一、后端 API")

**未完成项**:
- 重启 Codex 让 `mcp_supabase` 工具函数注入会话,跑 `supabase/migrations/20260606_create_appointments.sql` 迁移
- 在 `.env.local` 填入 Session Pool 连接串 + 端到端联调(提交表单 → 数据库落库)
- 历史遗留:`MapSection.tsx` 缺 `@types/leaflet` 导致 `npm run build` 报 TS7016,需 `npm i -D @types/leaflet` 修复

**下次会话注意**:
- 沙箱是 `workspace-write`,需走 `git -C` 或 escalated 模式写 `.git` 内部
- 改 `.git/config` 推荐交给用户在真实 cmd 跑(`git config --file ...`)
- HTTPS push 需 PAT + 配置 `http.proxy=http://127.0.0.1:7897` + `http.sslVerify=false`


---

## 十一、后端 API(Supabase)

### 入口与流程

```
Contact.tsx  ── fetch POST ──▶  /api/appointments  ── postgres.js ──▶ Supabase Session Pool ──▶ PostgreSQL
                                                └─ 失败 ──▶ notifyWeCom() 推企业微信
```

- 前端表单 4 字段:`name` / `phone` / `pet_type` / `message`
- API Route:`src/app/api/appointments/route.ts`(`runtime = "nodejs"`,`dynamic = "force-dynamic"`)
- DB 客户端:`src/lib/db.ts`(globalThis 缓存避免 HMR 连接泄漏)
- 通知封装:`src/lib/notify.ts`(仅失败时调用,token 进程内缓存 7200 秒)

### 数据表

`public.appointments` — 完整 DDL 在 `supabase/migrations/20260606_create_appointments.sql`

| 列 | 类型 | 约束 | 说明 |
|---|---|---|---|
| id | uuid | PK,default `gen_random_uuid()` | 预约 ID |
| name | text | not null,1-50 字符 | 用户姓名 |
| phone | text | not null,1-20 字符 | 联系电话 |
| pet_type | text | 可空,≤50 字符 | 宠物类型(自由文本) |
| message | text | 可空,≤2000 字符 | 预约留言 |
| created_at | timestamptz | default `now()` | 提交时间(UTC) |

索引:`(created_at desc)`、`(phone)`。

### 迁移执行(MCP 流程)

- `mcp_supabase` 已在 `~/.codex/config.toml` 配好(project_ref `srvggptdqxswjpxsmiyo`)
- 当前会话尚未挂载工具函数(需**重启 Codex**),下次会话通过 `mcp__supabase__apply_migration` 跑 DDL
- 迁移文件名固定为 `20260606_create_appointments.sql`,便于追溯

### 环境变量

模板:`.env.local.example`(已 commit);真实值填入 `.env.local`(gitignore 排除)

| 变量 | 必填 | 说明 |
|---|---|---|
| `SUPABASE_DB_URL` | 是 | Session Pool 连接串(Dashboard → Settings → Database → Session pooler) |
| `WECOM_CORP_ID` | 否 | 企业 ID(留空即关闭通知) |
| `WECOM_AGENT_ID` | 否 | 应用 ID |
| `WECOM_SECRET` | 否 | 应用 Secret |
| `WECOM_TO_USER` | 否 | 通知目标 userid,默认 `liupanpan` |

### 安全与限制

- `SUPABASE_DB_URL` 含数据库密码,只能放 `.env.local`,**绝对不能**进 Next.js 客户端 bundle
- 字段长度在 DDL 与服务端同时校验(双层防护)
- `phone` / `name` 仅服务端最小校验(必填 + 长度),不做格式校验(让店老板联系时再确认)
- 失败时推送企业微信仅包含姓名/电话/宠物/留言 + 错误摘要,无敏感 token
- 限流、验证码、CSRF 当前**未实现**(演示流量,后续如被刷再补 Upstash / Vercel Firewall)

### 端到端联调(下次会话做)

1. 重启 Codex 注入 `mcp__supabase__*` 工具
2. 在 Supabase Dashboard → Settings → Database → Session pooler 复制连接串
3. 写入 `.env.local`(`SUPABASE_DB_URL`)
4. `codex` 命令跑 DDL(用 MCP 的 apply_migration)
5. `npm run dev` 启动,打开 http://localhost:3000/#contact 填表提交
6. 在 Supabase Table Editor 看 `public.appointments` 是否有新行


---
