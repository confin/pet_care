const services = [
  { icon: "🛁", title: "宠物洗澡", desc: "使用进口温和香波，深层清洁毛发与皮肤，去除异味，让毛孩子清爽舒适。小型犬/猫咪从 ¥68 起。", price: "¥68", unit: "起" },
  { icon: "✂️", title: "美容造型", desc: "精致修剪、毛发打理，根据宠物品种与主人需求设计专属造型。包含洗护、吹干、修剪全套服务。", price: "¥168", unit: "起" },
  { icon: "💆", title: "宠物SPA", desc: "专业SPA护理，包括精油按摩、护毛素敷裹，深层滋养皮毛，舒缓宠物情绪，享受放松时光。", price: "¥298", unit: "起" },
  { icon: "🦷", title: "宠物洁牙", desc: "专业宠物洁牙服务，去除牙结石与牙菌斑，清新口气，预防口腔疾病。含牙齿检查与护理指导。", price: "¥88", unit: "起" },
  { icon: "✂️", title: "指甲修剪", desc: "专业指甲修剪与打磨，含脚底毛修剪、耳道清洁等基础护理，让毛孩子保持最佳状态。", price: "¥38", unit: "起" },
  { icon: "🏠", title: "宠物寄养", desc: "温馨舒适的寄养环境，24小时看护，每日定时喂食遛弯，提供实时视频反馈，让您出行无忧。", price: "¥88", unit: "/天" },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="text-center">
          <span className="section-label">服务项目</span>
          <h2 className="section-title">专业洗护美容服务</h2>
          <p className="section-sub mx-auto">
            我们提供全方位的宠物洗护美容服务，从基础清洁到高端护理，满足您毛孩子的所有需求
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-price">{s.price} <span>{s.unit}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
