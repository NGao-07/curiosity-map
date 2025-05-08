// js/user_location.js
function setupUserLocation() {
    const locateButton = document.getElementById('locate-me-button');
    if (!locateButton) return;

    locateButton.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // 将地图视图移至用户位置
                map.setView([userLat, userLng], 13); // 13 是一个比较合适的缩放级别

                // (可选) 在用户位置添加一个特殊标记
                L.marker([userLat, userLng], {
                    icon: L.icon({ // 自定义一个用户位置图标
                        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', // 示例图标
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                        shadowSize: [41, 41]
                    })
                }).addTo(map).bindPopup("你的位置").openPopup();

                // 进阶：根据用户位置推荐附近奇闻
                // 这需要计算每个奇闻点与用户位置的距离，然后筛选出最近的几个
                // 你可以引入一个计算两点间距离的函数 (Haversine formula)
                recommendNearbyCuriosities(userLat, userLng);

            }, function(error) {
                alert("无法获取您的位置：" + error.message);
            });
        } else {
            alert("您的浏览器不支持地理位置功能。");
        }
    });
}

// 距离计算函数 (Haversine)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // 距离 (km)
}

function recommendNearbyCuriosities(userLat, userLng, maxDistanceKm = 100, maxResults = 5) {
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
        // 可以加一个提示，比如 "已为您显示附近 X 公里内的奇闻"
        console.log(`找到了 ${nearby.length} 个 ${maxDistanceKm}公里内的奇闻。`);
    } else {
        // 如果附近没有，可以保持当前地图视图或显示所有
        alert(`您附近 ${maxDistanceKm} 公里内暂无奇闻记录。`);
        // addMarkersToMap(curiositiesData); // 或者显示所有
    }
}