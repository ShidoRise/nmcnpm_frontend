import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../ShoppingCartMenu/Features/cartSlice";
import { getProductById } from "../../API/productsAPI";
import { getReviewsByProductId } from "../../API/reviewAPI";
import { BsArrowLeftCircle } from "react-icons/bs";
import Reviews from "../Reviews/Reviews";
import { toast } from "react-toastify";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);

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
        setReviews(reviewsData || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to load data");
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
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/confirm");
  };

  return (
    <div className="card-detail-container container">
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
  );
};

export default ProductDetail;
