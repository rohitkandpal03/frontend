import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../ActionCreater/cartAction";
import CheckoutSteps from "../Component/CheckoutSteps";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePayment({ paymentMethod }));
    props.history.push("placeOrder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2> Payment </h2>
            </li>
            <li style={{ flexDirection: "row" }}>
              <input
                type="radio"
                name="paymentMethod"
                id="paymentMethod"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paymentMethod">Paypal</label>
            </li>

            <li>
              <button type="submit" className="button primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default PaymentScreen;
