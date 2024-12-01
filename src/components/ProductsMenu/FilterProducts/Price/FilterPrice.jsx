export const FilterPrice = (products, selectedPriceRange) => {
    // Kiểm tra xem sản phẩm có hợp lệ hay không
    if (!products || !Array.isArray(products)) return [];
    if (!selectedPriceRange || selectedPriceRange === "all") return products;

    return products.filter((product) => {
        // Kiểm tra nếu product.price tồn tại
        if (!product.price) return false;

        // Áp dụng điều kiện lọc giá dựa trên khoảng giá
        switch (selectedPriceRange) {
            case "<3":
                return product.price < 3;
            case "3-10":
                return product.price >= 3 && product.price < 10;
            case "10-20":
                return product.price >= 10 && product.price < 20;
            case ">=20":
                return product.price >= 20;
            default:
                return true;
        }
    });
};
