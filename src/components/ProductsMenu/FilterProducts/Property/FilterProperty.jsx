export const FilterProperty = (products, property) => {
    if (!products || !Array.isArray(products)) return [];
    if (!property || property === "all") return products;

    return products.filter(product => product.property === property);
};



