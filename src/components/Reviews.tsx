const reviews = [
  { stars: "⭐⭐⭐⭐⭐", text: "第一次带我家布偶猫来洗澡，环境很好没有异味，美容师小姐姐特别温柔，猫猫全程没有应激反应，强烈推荐！", name: "王小喵", tag: "布偶猫家长" },
  { stars: "⭐⭐⭐⭐⭐", text: "金毛洗澡是个大工程，但这里的工作人员非常专业耐心，洗得特别干净，毛发也吹得很蓬松。已经办了会员卡！", name: "大毛爸爸", tag: "金毛家长" },
  { stars: "⭐⭐⭐⭐⭐", text: "从开业就一直在这里做美容，泰迪剪的造型每次都让人惊喜，价格也很合理。店主对每只狗都像对自己家的一样。", name: "乐乐妈", tag: "泰迪家长" },
  { stars: "⭐⭐⭐⭐⭐", text: "寄养了三天，每天都有视频反馈，看到毛孩子在店里玩得很开心，我们也放心。以后出差就选这里了。", name: "铲屎官老张", tag: "英短家长" },
  { stars: "⭐⭐⭐⭐⭐", text: "朋友推荐来的，果然名不虚传。柯基洗澡加修毛，效果特别好，小屁股修得圆滚滚的，太可爱了！", name: "柯基小短腿", tag: "柯基家长" },
  { stars: "⭐⭐⭐⭐⭐", text: "店里的环境很温馨，等待区域有免费的咖啡和零食。美容师会详细告诉我狗狗的皮肤状况和建议，非常专业。", name: "嘟嘟麻麻", tag: "萨摩耶家长" },
];

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="text-center">
          <span className="section-label">顾客评价</span>
          <h2 className="section-title">听听毛孩子家长们怎么说</h2>
          <p className="section-sub mx-auto">
            每一份好评都是对我们最大的鼓励，感谢各位家长的信任与支持
          </p>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className="review-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="review-stars">{r.stars}</div>
              <p>{r.text}</p>
              <div className="review-author">
                <div className="review-avatar">🐾</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-tag">{r.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
