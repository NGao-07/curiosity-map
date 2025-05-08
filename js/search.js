// js/search_amap.js
let placeSearchService;
let autoCompleteService;

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const customSearchButton = document.getElementById('search-button-custom');
    const panel = document.getElementById('panel');

    if (!map || !searchInput || !customSearchButton) {
        console.error("搜索功能初始化失败：缺少必要DOM元素或地图实例。");
        return;
    }

    AMap.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], function() {
        autoCompleteService = new AMap.AutoComplete({
            input: "search-input",
            // citylimit: false // true限定在设定城市，false全国
        });

        placeSearchService = new AMap.PlaceSearch({
            map: map,
            panel: panel, // 结果列表将在此DOM元素中呈现
            pageSize: 5,
            autoFitView: true
        });

        AMap.Event.addListener(autoCompleteService, "select", function(e) {
            if (e.poi && e.poi.location) {
                // map.setZoom(15); // PlaceSearch会自动处理视野
                // map.setCenter(e.poi.location);
                placeSearchService.search(e.poi.name, function(status, result){
                    if (status === 'complete' && result.info === 'OK') {
                        if(panel) panel.style.display = 'block';
                    } else {
                        if(panel) panel.style.display = 'none';
                    }
                });
                // 同时搜索本地数据
                searchLocalData(e.poi.name, true); // true 表示是地点搜索触发
            } else if (e.poi && e.poi.name) { // 有提示但没有精确location，常见于行政区划
                placeSearchService.search(e.poi.name);
                searchLocalData(e.poi.name, true);
            }
        });
    });

    customSearchButton.addEventListener('click', performCombinedSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performCombinedSearch();
            event.preventDefault(); // 阻止可能的表单提交
        }
    });
}

function performCombinedSearch() {
    const searchTerm = document.getElementById('search-input').value.trim();
    const panel = document.getElementById('panel');

    if (!searchTerm) {
        addMarkersToMap(curiositiesData);
        if (panel) panel.style.display = 'none';
        if (placeSearchService) placeSearchService.clear(); // 清除高德搜索标记
        if (currentOpenInfoWindow) currentOpenInfoWindow.close();
        return;
    }

    const localResultsFound = searchLocalData(searchTerm, false);

    if (!localResultsFound && placeSearchService) {
        // 如果本地没搜到，或者即使用户想搜地点也执行高德搜索
        placeSearchService.search(searchTerm, function(status, result){
            if (status === 'complete' && result.info === 'OK' && result.poiList.pois.length > 0) {
                if(panel) panel.style.display = 'block';
            } else {
                if(panel) panel.style.display = 'none';
                if (!localResultsFound) { // 仅当本地也没结果时提示
                    // alert("未能找到相关地点或奇闻。");
                }
            }
        });
    } else if (localResultsFound && panel) {
        panel.style.display = 'none'; // 本地有结果，优先展示本地，隐藏高德面板
        if (placeSearchService) placeSearchService.clear();
    }
}

function searchLocalData(term, triggeredByPoiSelect) {
    const searchTerm = term.toLowerCase().trim();
    let results = [];

    if (searchTerm) {
        results = curiositiesData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
            const tagsMatch = item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return titleMatch || descriptionMatch || tagsMatch;
        });
    }


    if (results.length > 0) {
        addMarkersToMap(results);
        return true; // 表示找到了本地结果
    } else if (!triggeredByPoiSelect) { // 如果不是POI选择触发的（即用户手动搜索），且没找到，可以清除标记
        // addMarkersToMap([]); // 清除所有自定义标记
        // 不清除，允许高德搜索的结果显示
    }
    return false; // 表示未找到本地结果
}