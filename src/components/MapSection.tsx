"use client";
import { useEffect, useRef } from "react";

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    const initMap = async () => {
      const L = await import("leaflet");

      const coords: [number, number] = [28.249276, 112.94415];

      const map = L.map(mapRef.current!, {
        center: coords,
        zoom: 17,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", {
        subdomains: ["1", "2", "3", "4"],
        maxZoom: 18,
      }).addTo(map);

      const petIcon = L.divIcon({
        html: `<div class="pet-marker-wrapper">
          <div class="marker-bg"></div>
          <span class="marker-icon">🐾</span>
          <div class="marker-shadow"></div>
        </div>`,
        iconSize: [60, 66],
        iconAnchor: [30, 60],
        className: "",
      });

      L.marker(coords, { icon: petIcon })
        .addTo(map)
        .bindPopup(
          `<div class="popup-store">
            <div class="popup-title">🐾 毛茸茸宠物洗护馆</div>
            <div class="popup-addr">📍 长沙市岳麓区谷岳路与岳华路交界<br>建发缦云小区</div>
            <span class="popup-badge">✨ 萌宠洗护专家</span>
          </div>`
        )
        .openPopup();

      setTimeout(() => map.invalidateSize(), 300);
    };

    initMap();
  }, []);

  return (
    <section className="map-section" id="map">
      <div className="container">
        <div className="text-center">
          <span className="section-label">门店位置</span>
          <h2 className="section-title">找到我们</h2>
          <p className="section-sub mx-auto">
            位于长沙市岳麓区，交通便利，欢迎带毛孩子来店体验
          </p>
        </div>
        <div ref={mapRef} className="map-container" />
      </div>
    </section>
  );
}
