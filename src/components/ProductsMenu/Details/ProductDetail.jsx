import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../ShoppingCartMenu/Features/ProductsAPI";
import './ProductDetail.css';
import { FaBackspace } from "react-icons/fa";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import { addToCart } from "../../ShoppingCartMenu/Features/cartSlice";
import { useDispatch } from "react-redux";
import Cart from "../ProductCart/Cart";
import ReviewForm from "../Reviews/ReviewForm";
import ReviewList from "../Reviews/ReviewList";
import RatingSummary from "../Reviews/RatingSumary";

const ProductDetail = () => {
    const { id } = useParams();
    const { data: products, error, isLoading } = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const product = products.find((product) => product.id === id);

    if (!product) return <div>Product not found</div>;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };


    const handleBuyNow = () => {
        dispatch(addToCart(product));
        navigate("/confirm");
    };

    const addReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };


    const toggleReviewsSection = () => {
        setShowReviews(!showReviews);
    };

    return (
        <>
            <div className="card-detail-container container">
                <div className="card-detail-infor">
                    <div className="card-detail-image col-5">
                        <div className="card-detailback">
                            <ButtonMenu to="/products"><FaBackspace /> Back</ButtonMenu>
                        </div>
                        <img src={product.image} alt={product.title} />
                    </div>

                    <div className="card-detail-desciption col-7">
                        <p className="detailtitle">{product.title}</p>
                        <p className="detaildescription">{product.description || "No description available"}</p>
                        <p className="detailprice"><strong>Price:</strong> {product.price}</p>
                        <p className="detailreview"><strong>Reviews:</strong> {product.review}</p>
                    </div>

                    <div className="detailcart"><Cart />/</div>
                </div>
                <div className="card-detail-operation">
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleBuyNow}>Buy Now</button>
                    <button className="button-reviews" onClick={toggleReviewsSection}>Reviews</button>
                </div>


                {showReviews && (
                    <div className="card-review-container">
                        <div className="card-review-top">
                            <div className="card-write-review">
                                <ReviewForm productId={product.id} onAddReview={addReview} />
                            </div>
                            <div className="card-rating">
                                <RatingSummary reviews={reviews.length > 0 ? reviews : product.reviews} />
                            </div>
                        </div>

                        <div className="card-list-review">
                            <ReviewList reviews={reviews.length > 0 ? reviews : product.reviews} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetail;
