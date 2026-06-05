const reasons = [
  { icon: "❤️", title: "真心热爱", desc: "我们每一位员工都是真正的动物爱好者，用发自内心的关爱对待每一只宠物。" },
  { icon: "🏆", title: "专业资质", desc: "团队成员均持有专业宠物美容师证书，定期参加国内外培训，技术不断精进。" },
  { icon: "🌿", title: "温和产品", desc: "精选进口天然洗护产品，温和不刺激，pH值平衡，适合宠物敏感肌肤。" },
  { icon: "🏥", title: "卫生环境", desc: "门店每日严格消毒，配备专业美容设备，独立洗护区域，杜绝交叉感染。" },
  { icon: "🤝", title: "贴心服务", desc: "从预约到离店全程贴心服务，提供宠物状态实时反馈，让主人放心托付。" },
  { icon: "💰", title: "合理价格", desc: "提供高性价比的洗护服务，明码标价无隐形消费，会员享更多优惠。" },
];

export default function WhyUs() {
  return (
    <section className="whyus" id="whyus">
      <div className="container">
        <div className="text-center">
          <span className="section-label">为什么选择我们</span>
          <h2 className="section-title">六大理由，值得信赖</h2>
          <p className="section-sub mx-auto">
            我们不仅仅是宠物洗护店，更是毛孩子的第二个家。选择我们，就是选择专业与安心
          </p>
        </div>
        <div className="whyus-grid">
          {reasons.map((r, i) => (
            <div className="whyus-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="whyus-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
