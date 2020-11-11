import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../ActionCreater/userAction";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2> Create Account </h2>
          </li>
          <li>
            {loading && <div> Loading ...</div>}
            {error && <div> error...</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="repassword">RePassword</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li style={{ display: "flex", flexDirection: "row" }}>
            <div>Already have an account ?</div>
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect" + redirect}
              style={{ cursor: "pointer" }}
            >
              Sign-In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
