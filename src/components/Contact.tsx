"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [petType, setPetType]   = useState("");
  const [message, setMessage]   = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submitting = status === "submitting";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          pet_type: petType,
          message,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "提交失败");
      }
      setStatus("success");
      setName("");
      setPhone("");
      setPetType("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "提交失败");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="text-center">
          <span className="section-label">联系我们</span>
          <h2 className="section-title">预约或咨询</h2>
          <p className="section-sub mx-auto">
            添加微信或拨打下方电话预约，即可享受首次洗护 8 折优惠
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info" data-aos="fade-right">
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <h4>电话</h4>
                <p>188-8888-8888</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">💬</div>
              <div>
                <h4>微信</h4>
                <p>maorongrong_pet</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <h4>地址</h4>
                <p>长沙市岳麓区谷岳路与岳华路交界 · 建发缦云小区</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">🕐</div>
              <div>
                <h4>营业时间</h4>
                <p>周一至周日 09:00 - 20:00</p>
              </div>
            </div>
          </div>
          <form className="contact-form" data-aos="fade-left" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="appt-name">您的姓名</label>
              <input
                id="appt-name"
                type="text"
                placeholder="请输入姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                required
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appt-phone">联系电话</label>
              <input
                id="appt-phone"
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={20}
                required
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appt-pet">宠物类型</label>
              <input
                id="appt-pet"
                type="text"
                placeholder="如：金毛 / 布偶猫 / 泰迪"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                maxLength={50}
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appt-msg">预约留言</label>
              <textarea
                id="appt-msg"
                placeholder="请描述您的需求，如洗护、美容、寄养等……"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={submitting}
            >
              {submitting ? "提交中…" : "📅 提交预约"}
            </button>

            {status === "success" && (
              <div className="form-status form-status-success" role="status">
                ✅ 预约成功!我们会尽快通过电话联系您,确认到店时间。
              </div>
            )}
            {status === "error" && (
              <div className="form-status form-status-error" role="alert">
                ❌ {errorMsg || "提交失败,请稍后重试或拨打电话 188-8888-8888"}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
