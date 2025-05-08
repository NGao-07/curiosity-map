// js/filters.js
function populateCategoryFilter() {
    const filterSelect = document.getElementById('category-filter');
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