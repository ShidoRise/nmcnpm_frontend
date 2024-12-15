import { useGetAllProductsQuery } from "./Features/ProductsAPI";
import { useDispatch } from "react-redux";
import { addToCart } from "./Features/cartSlice";

const ShoppingCartMenu = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispath = useDispatch();
  //const history = useHistory();

  const handleAddToCart = (product) => {
    dispath(addToCart(product));
  };

  return (
    <div className="shoppingcartmenu-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured..</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data?.map((product) => (
              <div key={product.id} className="product">
                <h3>{product.title}</h3>
                <img src={product.image} alt={product.title} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">${product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartMenu;
