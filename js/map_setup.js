// js/map_setup_amap.js
let map; // 全局地图实例
let toolbar, scaleControl; // 地图插件 (scaleControl 避免与 Leaflet 的 scale 混淆)

function initMap() {
    map = new AMap.Map('map', {
        viewMode: '2D',
        zoom: 5,
        center: [104.1954, 35.8617], // 经度, 纬度
    });

    map.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        toolbar = new AMap.ToolBar({
            position: {
                top: '80px', // 调整位置，避免与header重叠
                left: '20px'
            }
        });
        map.addControl(toolbar);

        scaleControl = new AMap.Scale();
        map.addControl(scaleControl);
    });

    map.on('complete', function(){
        console.log("高德地图加载完成！");
    });

    return map;
}