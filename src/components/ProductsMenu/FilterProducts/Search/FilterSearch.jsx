export const FilterSearch = (products, searchTerm) => {
    if (!products || !Array.isArray(products)) return [];
    if (!searchTerm) return products;

    const normalizedSearchTerm = searchTerm.toLowerCase();

    return products.filter(product => {
        const normalizedTitle = product.title.toLowerCase();
        return normalizedTitle.indexOf(normalizedSearchTerm) !== -1;
    });
};
