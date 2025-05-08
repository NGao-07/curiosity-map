// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. 初始化地图
    const mapInstance = initMap();
    if (!mapInstance) {
        console.error("地图初始化失败!");
        return;
    }

    // 2. 初始加载所有标记点
    addMarkersToMap(curiositiesData);

    // 3. 初始化分类筛选器
    populateCategoryFilter();

    // 4. 初始化搜索功能
    setupSearch();

    // 5. 初始化用户定位功能
    setupUserLocation();

    // 你可以在这里添加其他需要在页面加载完成后执行的逻辑
    console.log("奇闻地图应用已准备就绪！");
});