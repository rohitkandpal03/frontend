import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../ActionCreater/cartAction";
import { Link } from "react-router-dom";
import CheckoutSteps from "../Component/CheckoutSteps";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push("shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("payment");
  }

  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 40;
  const taxPrice = 0.15 * itemPrice;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    props.history.push("/");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrder">
        <div className="placeOrder-info">
          <div>
            <h3> Shipping </h3>
            <div>
              {cart.shipping.address},{cart.shipping.city},
              {cart.shipping.postalCode},{cart.shipping.country}.
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method : {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="card-list-container">
              <li>
                <h3> Shopping Cart </h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div> Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li key={`${item.product}`}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>

                    <div className="cart-name">
                      <div style={{ marginBottom: "1%" }}>
                        <Link to={"/products/" + item.product}>
                          {item.name}
                        </Link>
                      </div>
                      <div>Qty: {item.qty}</div>
                    </div>
                    <div className="cart-price"> Rs {item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeOrder-action">
          <ul>
            <li>
              <button
                style={{ width: "100%" }}
                className="button"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>Rs {itemPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>Rs {shippingPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>Rs {taxPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>Rs {totalPrice.toFixed(2)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
