// js/filters_amap.js
function populateCategoryFilter() {
    const filterSelect = document.getElementById('category-filter');
    if (!filterSelect) return;

    // 清空旧的选项，除了"所有分类"
    while (filterSelect.options.length > 1) {
        filterSelect.remove(1);
    }

    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
    });

    filterSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        let filteredData;
        if (selectedCategory === 'all') {
            filteredData = curiositiesData;
        } else {
            filteredData = curiositiesData.filter(item => item.category === selectedCategory);
        }
        addMarkersToMap(filteredData);
    });
}