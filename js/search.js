// js/search.js
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            addMarkersToMap(curiositiesData); // 如果搜索词为空，显示所有
            return;
        }

        const searchResults = curiositiesData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
            const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return titleMatch || descriptionMatch || tagsMatch;
        });

        if (searchResults.length > 0) {
            addMarkersToMap(searchResults);
            // (可选) 将地图视图移动到第一个搜索结果
            // map.setView([searchResults[0].lat, searchResults[0].lng], 10);
        } else {
            clearMarkers();
            alert("未找到相关奇闻。");
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}