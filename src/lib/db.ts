import postgres from "postgres";

// Next.js 15 在 dev/HMR 时会反复重载模块,需要把客户端挂在 globalThis 上避免连接泄漏。
// 生产 serverless 环境下,Vercel/Netlify 会为每个请求创建一个新容器,
// globalThis 缓存的连接在该容器内可复用,容器销毁时由 runtime 回收。

declare global {
  // eslint-disable-next-line no-var
  var __pgClient: ReturnType<typeof postgres> | undefined;
}

export function getSql() {
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    throw new Error("SUPABASE_DB_URL 未配置(请检查 .env.local)");
  }
  if (!globalThis.__pgClient) {
    globalThis.__pgClient = postgres(url, {
      max: 5,             // 演示流量小,5 个连接足够;后续可按需调高
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,     // Supavisor 透传模式不需 prepared statement
    });
  }
  return globalThis.__pgClient;
}
