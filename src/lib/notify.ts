// 企业微信应用消息通知封装
// 仅用于"失败告警"等运维场景,预约成功走前端 UI 提示即可。
// Token 缓存在进程内,有效期 7200 秒,提前 60 秒刷新。

interface WeComConfig {
  corpId: string;
  agentId: string;
  secret: string;
  toUser: string;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

function readConfig(): WeComConfig | null {
  const corpId  = process.env.WECOM_CORP_ID;
  const agentId = process.env.WECOM_AGENT_ID;
  const secret  = process.env.WECOM_SECRET;
  const toUser  = process.env.WECOM_TO_USER;
  if (!corpId || !agentId || !secret || !toUser) return null;
  return { corpId, agentId, secret, toUser };
}

async function getAccessToken(cfg: WeComConfig): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60_000) {
    return tokenCache.token;
  }
  const url =
    `https://qyapi.weixin.qq.com/cgi-bin/gettoken` +
    `?corpid=${encodeURIComponent(cfg.corpId)}` +
    `&corpsecret=${encodeURIComponent(cfg.secret)}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = (await res.json()) as {
    access_token?: string;
    errcode?: number;
    errmsg?: string;
    expires_in?: number;
  };
  if (!data.access_token) {
    throw new Error(`gettoken failed: ${data.errcode} ${data.errmsg}`);
  }
  tokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 7200) * 1000,
  };
  return data.access_token;
}

export async function notifyWeCom(
  text: string,
): Promise<{ ok: boolean; reason?: string }> {
  const cfg = readConfig();
  if (!cfg) {
    console.warn("[notify] WeCom env 未配置,跳过推送");
    return { ok: false, reason: "config-missing" };
  }
  try {
    const accessToken = await getAccessToken(cfg);
    const sendUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`;
    const res = await fetch(sendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        touser:  cfg.toUser,
        msgtype: "text",
        agentid: Number(cfg.agentId),
        text:    { content: text },
      }),
    });
    const data = (await res.json()) as { errcode?: number; errmsg?: string };
    if (data.errcode !== 0) {
      throw new Error(`send failed: ${data.errcode} ${data.errmsg}`);
    }
    return { ok: true };
  } catch (err) {
    console.error("[notify] WeCom error", err);
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
