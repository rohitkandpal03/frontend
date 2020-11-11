import React from "react";
import "./App.css";

import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from "./Screen/ProductScreen";
import CartScreen from "./Screen/CartScreen";
import SignInScreen from "./Screen/SignInScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./Screen/RegisterScreen";
import ProductsScreen from "./Screen/ProductsScreen";
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentScreen from "./Screen/PaymentScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () =>
    document.querySelector(".sidebar").classList.add("open");
  const closeMenu = () =>
    document.querySelector(".sidebar").classList.remove("open");
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>

            <Link to="/"> amazona </Link>
          </div>
          <div className="header-links">
            <Link to="/cart"> Cart </Link>
            {userInfo ? (
              <Link to="/profile"> {userInfo.name} </Link>
            ) : (
              <Link to="/signin"> Sign In </Link>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                {" "}
                Pants
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMenu}>
                {" "}
                Shirts
              </Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/signin" exact component={SignInScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/products/:id" exact component={ProductScreen} />
            <Route path="/create/products" exact component={ProductsScreen} />
            <Route path="/cart/:id?" exact component={CartScreen} />
            <Route path="/shipping" exact component={ShippingScreen} />
            <Route path="/payment" exact component={PaymentScreen} />
            <Route path="/placeOrder" exact component={PlaceOrderScreen} />
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
