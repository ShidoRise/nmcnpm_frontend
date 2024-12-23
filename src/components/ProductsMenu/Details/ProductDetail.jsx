import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  updateCartToBackend,
} from "../../ShoppingCartMenu/Features/cartSlice";
import { getProductById } from "../../API/productsAPI";
import { getReviewsByProductId } from "../../API/reviewAPI";
import { BsArrowLeftCircle } from "react-icons/bs";
import Reviews from "../Reviews/Reviews";
import Cart from "../ProductCart/Cart";
import { toast } from "react-toastify";
import QuantityModal from "../Modal/QuantityModal ";
import { FaArrowLeft } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Product ID not found");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const [productData, reviewsData] = await Promise.all([
          getProductById(parseInt(id)),
          getReviewsByProductId(parseInt(id)),
        ]);

        if (!productData) {
          throw new Error("Product not found");
        }

        setProduct(productData);
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load data", {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/products");
      } finally {
        setIsLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const handleAddToCart = () => {
    if (!user) {
      toast.warning("Please login to add items to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    setQuantity(1);
    setModalIsOpen(true);
  };

  const handleConfirmAddToCart = async () => {
    try {
      dispatch(
        addToCart({
          ...product,
          id: parseInt(id),
          quantity: quantity,
        })
      );
      await dispatch(updateCartToBackend()).unwrap();
      setModalIsOpen(false);
      toast.success("Product added to cart!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.warning("Please login to buy now", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    toast.warning("This service is not available at this time", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <div className="card-detail-container">
        <Link to="/products" className="return-button">
          <FaArrowLeft />
        </Link>
        <Cart />
        <div className="card-detail-infor">
          <div className="card-detail-image col-5">
            <div className="card-detailback">
              <BsArrowLeftCircle onClick={() => navigate(-1)} />
            </div>
            <img src={product.image} alt={product.title} />
          </div>

          <div className="card-detail-content col-7">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <div className="card-detail-buttons">
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <h3 onClick={() => setShowReviews(!showReviews)}>
            Reviews ({reviews.length}) {showReviews ? "▼" : "▶"}
          </h3>
          {showReviews && (
            <Reviews
              productId={id}
              reviews={reviews}
              setReviews={setReviews}
              isLoading={reviewsLoading}
            />
          )}
        </div>
      </div>

      <QuantityModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onConfirm={handleConfirmAddToCart}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </>
  );
};

export default ProductDetail;
