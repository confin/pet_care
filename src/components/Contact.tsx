"use client";
export default function Contact() {
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
          <form className="contact-form" data-aos="fade-left" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>您的姓名</label>
              <input type="text" placeholder="请输入姓名" required />
            </div>
            <div className="form-group">
              <label>联系电话</label>
              <input type="tel" placeholder="请输入手机号" required />
            </div>
            <div className="form-group">
              <label>宠物类型</label>
              <input type="text" placeholder="如：金毛 / 布偶猫 / 泰迪" />
            </div>
            <div className="form-group">
              <label>预约留言</label>
              <textarea placeholder="请描述您的需求，如洗护、美容、寄养等……" rows={4}></textarea>
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              📅 提交预约
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
