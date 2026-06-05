export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge" data-aos="fade-up">
              🐕 长沙本地宠物洗护品牌
            </div>
            <h1 data-aos="fade-up" data-aos-delay="100">
              让每一只<span className="highlight">毛孩子</span>
              <br />焕然一新
            </h1>
            <p data-aos="fade-up" data-aos-delay="200">
              我们用心呵护每一只宠物，提供专业、温和的洗护美容服务。
              让您的毛孩子在这里能够享受五星级的宠爱体验。
            </p>
            <div className="hero-btns" data-aos="fade-up" data-aos-delay="300">
              <a href="#contact" className="btn-primary">
                📅 立即预约
              </a>
              <a href="#services" className="btn-secondary">
                查看服务 →
              </a>
            </div>
            <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
              <div className="hero-stat">
                <div className="num">3000+</div>
                <div className="label">服务宠物</div>
              </div>
              <div className="hero-stat">
                <div className="num">98%</div>
                <div className="label">好评率</div>
              </div>
              <div className="hero-stat">
                <div className="num">5年+</div>
                <div className="label">行业经验</div>
              </div>
            </div>
          </div>
          <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-img-circle">
              🐾
              <span className="floating-paw">🐶</span>
              <span className="floating-paw">🐱</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
