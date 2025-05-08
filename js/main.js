// js/main_amap.js
document.addEventListener('DOMContentLoaded', function() {
    // 确保高德地图API对象AMap已定义
    // 如果直接在HTML中同步加载高德API脚本，通常AMap会立即可用
    // 如果是异步加载，或者不确定，可以加个延时或等待机制

    if (typeof AMap === "undefined") {
        // API还未加载完成，可以设置一个轮询或者等待API的 `complete` 事件
        // 简单处理：延迟一点时间再初始化
        console.warn("高德地图API尚未完全加载，尝试延迟初始化...");
        setTimeout(initializeApplication, 500); // 延迟0.5秒
    } else {
        initializeApplication();
    }
});

function initializeApplication() {
    // 再次检查AMap，以防万一
    if (typeof AMap === "undefined") {
        console.error("高德地图JS API仍未加载！请检查API Key、网络连接及HTML中的脚本引用。");
        alert("高德地图API加载失败，请刷新页面重试。");
        return;
    }
    console.log("AMap对象已确认，开始初始化应用...");

    const mapInstance = initMap();
    if (!mapInstance) {
        console.error("高德地图初始化失败!");
        return;
    }

    // 等待地图实际加载完成再执行依赖地图的操作
    mapInstance.on('complete', function(){
        console.log("地图 'complete' 事件触发，执行后续操作。");
        addMarkersToMap(curiositiesData);
        populateCategoryFilter();
        setupSearch();
        setupUserLocation();
        console.log("奇闻地图应用 (高德版) 已准备就绪！");
    });
}