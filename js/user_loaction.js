// js/user_location_amap.js
let geolocationService;

function setupUserLocation() {
    const locateButton = document.getElementById('locate-me-button');
    if (!locateButton || !map) return;

    map.plugin('AMap.Geolocation', function () {
        geolocationService = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            convert: true,
            showButton: false,
            showMarker: true, // 定位成功后显示高德默认的蓝色定位点
            showCircle: true,
            panToLocation: true,
            zoomToAccuracy: true
        });
        // map.addControl(geolocationService); // 不再需要将控件加入地图，我们手动调用

        locateButton.addEventListener('click', function() {
            if (!geolocationService) {
                alert("定位服务尚未初始化。");
                return;
            }
            geolocationService.getCurrentPosition(function(status, result){
                if(status === 'complete'){
                    onLocateComplete(result);
                } else {
                    onLocateError(result);
                }
            });
        });
    });
}

function onLocateComplete(data) {
    console.log("定位成功:", data.position);
    recommendNearbyCuriosities(data.position.getLat(), data.position.getLng());
}

function onLocateError(data) {
    console.error("定位失败:", data.message);
    alert('定位失败：' + data.message + "\n请确保已授予浏览器定位权限，并检查网络连接。");
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function recommendNearbyCuriosities(userLat, userLng, maxDistanceKm = 50, maxResults = 5) { // 缩小默认搜索范围
    const nearby = curiositiesData
        .map(curiosity => ({
            ...curiosity,
            distance: getDistance(userLat, userLng, curiosity.lat, curiosity.lng)
        }))
        .filter(curiosity => curiosity.distance <= maxDistanceKm)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults);

    if (nearby.length > 0) {
        addMarkersToMap(nearby);
        console.log(`找到了 ${nearby.length} 个 ${maxDistanceKm}公里内的奇闻。`);
        if (map && nearby[0]) {
            // map.setCenter(new AMap.LngLat(nearby[0].lng, nearby[0].lat));
            // map.setZoom(12); // addMarkersToMap中的setFitView会处理视野
        }
        // 清除高德地点搜索可能留下的标记和结果面板
        if (typeof placeSearchService !== 'undefined' && placeSearchService) {
            placeSearchService.clear();
        }
        const panel = document.getElementById('panel');
        if (panel) panel.style.display = 'none';

    } else {
        alert(`您附近 ${maxDistanceKm} 公里内暂无奇闻记录。可以尝试扩大搜索范围或浏览所有奇闻。`);
        // 可以选择显示所有奇闻或保持当前视图
        // addMarkersToMap(curiositiesData);
    }
}