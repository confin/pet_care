"use client";
import { useEffect, useState } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "关于我们", href: "#about" },
  { label: "服务项目", href: "#services" },
  { label: "门店位置", href: "#map" },
  { label: "顾客评价", href: "#reviews" },
  { label: "联系我们", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <a href="#hero" className="nav-logo">
          <span className="logo-icon">🐾</span>
          毛茸茸宠物洗护馆
        </a>
        <button
          className={`nav-toggle${open ? " active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="菜单"
        >
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={handleClick}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={handleClick}>立即预约</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
