// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../actions/index";
import axios from "axios";

export default function Header({ isLogedIn }) {
  const state = useSelector((state) => state.logInStatusReducer);
  const { user } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();

    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
        headers: { authorization: `bearer ${user.accessToken}` },
        withCredentials: true,
      })
      .then(() => {
        dispatch(logOut());
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error :", err.message);
        }
        console.log(err.config);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <nav>
        {isLogedIn ? (
          <div>
            <Link to="/mypage">My Page</Link>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signin</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
