// js/map_setup.js
let map; // 将map声明为全局或在模块间传递

function initMap() {
    map = L.map('map').setView([35.8617, 104.1954], 5); // 默认中国中心

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // (可选) 添加其他地图控件，如比例尺
    L.control.scale({ imperial: false }).addTo(map);

    return map;
}