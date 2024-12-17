import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  getTotals,
  updateCartToBackend,
} from "../ShoppingCartMenu/Features/cartSlice";
import { getAllProducts } from "../API/productsAPI";
import { FilterCategory } from "./FilterProducts/Category/FilterCategory";
import { FilterPrice } from "./FilterProducts/Price/FilterPrice";
import ProductCard from "./ProductCard/ProductCard";
import Cart from "./ProductCart/Cart";
import ReactPaginate from "react-paginate";
import "./ProductMenu.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import QuantityModal from "./Modal/QuantityModal ";
import { store } from "../../index";

const ProductMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products", {
          position: "bottom-right",
          autoClose: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      let matchesPrice = true;
      if (selectedPriceRange !== "all") {
        const price = parseFloat(product.price);
        const [min, max] = selectedPriceRange.split("-").map(Number);
        matchesPrice = price >= min && (max ? price <= max : true);
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, selectedPriceRange]);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warning("Please login to add items to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setModalIsOpen(true);
  };

  const handleConfirmAddToCart = async () => {
    try {
      // Get initial cart state
      const initialState = store.getState().cart;
      console.log("Initial cart state:", initialState.cartItems);

      // Add to cart
      dispatch(
        addToCart({
          ...selectedProduct,
          quantity: quantity,
        })
      );

      // Check state after addToCart
      const afterAddState = store.getState().cart;
      console.log("State after addToCart:", afterAddState.cartItems);

      // Check state after getTotals
      const afterTotalsState = store.getState().cart;
      console.log("State after getTotals:", afterTotalsState.cartItems);

      // Update backend
      await dispatch(updateCartToBackend()).unwrap();

      // Check final state
      const finalState = store.getState().cart;
      console.log("Final cart state:", finalState.cartItems);

      setModalIsOpen(false);
      toast.success("Product added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <div className="product-menu">
        <div className="menu-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Cart />
        </div>

        <div className="filter-section">
          <FilterCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <FilterPrice
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
          />
        </div>

        <div className="products-container">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>

              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </>
          )}
        </div>
      </div>

      <QuantityModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={handleConfirmAddToCart}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </>
  );
};

export default ProductMenu;
