// js/markers.js
let currentMarkers = []; // 用于存储当前地图上的标记

function clearMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
}

function addMarkersToMap(dataArray) {
    clearMarkers(); // 添加新标记前清除旧的

    dataArray.forEach(function(curiosity) {
        const marker = L.marker([curiosity.lat, curiosity.lng]).addTo(map);

        // 构建弹窗内容
        let popupContent = `
            <div class="popup-content-container">
                <h3 class="popup-title">${curiosity.title}</h3>
        `;

        if (curiosity.imageUrl) {
            popupContent += `<img src="${curiosity.imageUrl}" alt="${curiosity.title}" class="popup-image">`;
        }

        popupContent += `<p class="popup-description">${curiosity.description}</p>`;

        if (curiosity.douyinLink) {
            popupContent += `<a href="${curiosity.douyinLink}" target="_blank" class="popup-link">观看抖音视频</a>`;
        }

        // 占位：用户评论和点赞 (需要后端支持)
        popupContent += `
            <div class="popup-actions">
                <button onclick="handleLike('${curiosity.id}')">👍 赞 (<span id="like-count-${curiosity.id}">0</span>)</button>
                <button onclick="showComments('${curiosity.id}')">💬 评论</button>
            </div>
        </div>`;


        marker.bindPopup(popupContent);
        currentMarkers.push(marker);
    });
}

// --- 占位函数，实际功能需要后端 ---
function handleLike(curiosityId) {
    console.log("点赞了: ", curiosityId);
    // 实际应用中，这里会发送请求到后端记录点赞
    // 然后更新前端的点赞数，例如:
    // const likeCountSpan = document.getElementById(`like-count-${curiosityId}`);
    // likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;
    alert(`感谢对 "${curiosityId}" 的点赞！(此功能为演示)`);
}

function showComments(curiosityId) {
    console.log("查看评论: ", curiosityId);
    // 实际应用中，这里会加载并显示评论区
    alert(`查看 "${curiosityId}" 的评论！(此功能为演示)`);
}
// --- 占位函数结束 ---