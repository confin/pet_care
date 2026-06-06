import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { notifyWeCom } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Payload {
  name?: unknown;
  phone?: unknown;
  pet_type?: unknown;
  message?: unknown;
}

function asText(v: unknown, max: number): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

export async function POST(req: NextRequest) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const name     = asText(payload.name, 50);
  const phone    = asText(payload.phone, 20);
  const petType  = asText(payload.pet_type, 50);
  const message  = asText(payload.message, 2000);

  if (!name || !phone) {
    return NextResponse.json({ error: "姓名和电话必填" }, { status: 400 });
  }

  try {
    const sql = getSql();
    const rows = await sql<{ id: string; created_at: Date }[]>`
      insert into public.appointments (name, phone, pet_type, message)
      values (${name}, ${phone}, ${petType}, ${message})
      returning id, created_at
    `;
    const row = rows[0];
    return NextResponse.json({
      ok: true,
      id: row.id,
      createdAt: row.created_at.toISOString(),
    });
  } catch (err) {
    const errText =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error("[appointments] insert failed", errText);
    // 失败时异步推企业微信,不阻塞 HTTP 响应
    notifyWeCom(
      [
        "[pet_care] 预约写入失败",
        `时间: ${new Date().toISOString()}`,
        `姓名: ${name}`,
        `电话: ${phone}`,
        `宠物: ${petType ?? "-"}`,
        `留言: ${message ?? "-"}`,
        `错误: ${errText.slice(0, 400)}`,
      ].join("\n"),
    ).catch((e) => console.error("[appointments] notify failed", e));

    return NextResponse.json(
      {
        error: "服务器繁忙,请稍后重试或直接拨打电话 188-8888-8888",
      },
      { status: 500 },
    );
  }
}
