
export const FilterCategory = (products, category) => {
    if (!products || !Array.isArray(products)) return [];
    if (!category || category === "all") return products; // Trả về toàn bộ sản phẩm nếu không chọn category

    return products.filter(product => product.category === category);
};
