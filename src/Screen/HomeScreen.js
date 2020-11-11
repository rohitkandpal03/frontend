import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../ActionCreater/productAction";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className="products">
      {products.map((product) => {
        return (
          <li key={`${product._id}`}>
            <div className="product">
              <Link to={`/products/${product._id}`}>
                <img
                  className="product-image"
                  src={product.image}
                  alt="product"
                />
              </Link>

              <div className="product-name">
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="price">Rs {product.price}</div>
              <div className="product-rating">{product.rating}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default HomeScreen;
