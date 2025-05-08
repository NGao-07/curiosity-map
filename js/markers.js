// js/markers_amap.js
let currentMarkers = [];
let currentOpenInfoWindow = null; // 只允许一个信息窗体打开

function clearMarkers() {
    if (map) {
        map.remove(currentMarkers);
    }
    currentMarkers = [];
    if (currentOpenInfoWindow) {
        currentOpenInfoWindow.close();
        currentOpenInfoWindow = null;
    }
}

function addMarkersToMap(dataArray) {
    clearMarkers();

    dataArray.forEach(function(curiosity) {
        const position = new AMap.LngLat(curiosity.lng, curiosity.lat);

        const marker = new AMap.Marker({
            position: position,
            // title: curiosity.title // 可选，鼠标悬停提示
        });

        let popupContentHTML = `
            <div class="popup-content-container">
                <h3 class="popup-title">${curiosity.title}</h3>`;
        if (curiosity.imageUrl) {
            popupContentHTML += `<img src="${curiosity.imageUrl}" alt="${curiosity.title}" class="popup-image">`;
        }
        popupContentHTML += `<p class="popup-description">${curiosity.description}</p>`;
        if (curiosity.douyinLink) {
            popupContentHTML += `<a href="${curiosity.douyinLink}" target="_blank" class="popup-link">观看抖音视频</a>`;
        }
        popupContentHTML += `
            <div class="popup-actions">
                <button onclick="handleLike('${curiosity.id}')">👍 赞 (<span id="like-count-${curiosity.id}">0</span>)</button>
                <button onclick="showComments('${curiosity.id}')">💬 评论</button>
            </div>
        </div>`;

        marker.on('click', function () {
            if (currentOpenInfoWindow) {
                currentOpenInfoWindow.close();
            }
            const infoWindow = new AMap.InfoWindow({
                content: popupContentHTML,
                offset: new AMap.Pixel(0, -30),
                // closeWhenClickMap: true, // 点击地图空白区域时关闭信息窗体
            });
            infoWindow.open(map, marker.getPosition());
            currentOpenInfoWindow = infoWindow;
        });
        currentMarkers.push(marker);
    });

    if (map) {
        map.add(currentMarkers);
        if (currentMarkers.length > 0 && dataArray.length === curiositiesData.length) {
             // 初始加载时，如果数据较多，可以不自动fitView，让用户自行探索
             // map.setFitView();
        } else if (currentMarkers.length > 0) {
            map.setFitView(currentMarkers, false, [150, 60, 150, 60]); // (markers, immediately, margins)
        }
    }
}

function handleLike(curiosityId) {
    console.log("点赞了: ", curiosityId);
    alert(`感谢对 "${curiosityId}" 的点赞！(此功能为演示)`);
}

function showComments(curiosityId) {
    console.log("查看评论: ", curiosityId);
    alert(`查看 "${curiosityId}" 的评论！(此功能为演示)`);
}