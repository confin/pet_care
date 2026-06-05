export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo">
              <span className="logo-icon">🐾</span>
              毛茸茸宠物洗护馆
            </a>
            <p>用爱心和专业，呵护每一只毛孩子。长沙本地宠物洗护品牌，为您提供优质的宠物护理服务。</p>
          </div>
          <div>
            <h4>快速链接</h4>
            <ul>
              <li><a href="#hero">首页</a></li>
              <li><a href="#about">关于我们</a></li>
              <li><a href="#services">服务项目</a></li>
              <li><a href="#contact">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h4>服务项目</h4>
            <ul>
              <li><a href="#services">宠物洗澡</a></li>
              <li><a href="#services">美容造型</a></li>
              <li><a href="#services">宠物SPA</a></li>
              <li><a href="#services">宠物寄养</a></li>
            </ul>
          </div>
          <div>
            <h4>联系我们</h4>
            <ul>
              <li>📞 188-8888-8888</li>
              <li>💬 maorongrong_pet</li>
              <li>📍 长沙市岳麓区</li>
              <li>🕐 09:00 - 20:00</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 毛茸茸宠物洗护馆 版权所有</span>
          <span>用心呵护每一只毛孩子 🐾</span>
        </div>
      </div>
    </footer>
  );
}
