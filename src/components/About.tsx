export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image" data-aos="fade-right">
            <div className="about-img-box">
              🐕
              <span className="about-paw">🐾</span>
              <span className="about-paw">🐾</span>
            </div>
            <div className="about-exp">
              <span className="exp-num">5+</span>
              <span>年宠物护理经验 · 服务超过 3000 只宠物</span>
            </div>
          </div>
          <div className="about-content" data-aos="fade-left">
            <span className="section-label">关于我们</span>
            <h2 className="section-title">
              用爱心和专业<br />呵护每一只毛孩子
            </h2>
            <p>
              毛茸茸宠物洗护馆成立于2019年，是长沙地区专业的宠物洗护美容品牌。
              我们拥有经验丰富的宠物美容师团队，使用进口专业洗护产品，
              为每一只宠物提供量身定制的护理方案。
            </p>
            <p>
              我们深知每一只毛孩子都是家人，因此我们始终以爱心、耐心和责任心对待每一位顾客。
              从温和的洗护到精致的美容造型，我们追求每一个细节的完美。
            </p>
            <div className="about-features">
              <div className="about-feature"><span className="check">✓</span> 专业宠物美容师</div>
              <div className="about-feature"><span className="check">✓</span> 进口洗护产品</div>
              <div className="about-feature"><span className="check">✓</span> 一对一专属服务</div>
              <div className="about-feature"><span className="check">✓</span> 无菌环保环境</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
