import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Login = () => {
    const {store, actions} = useContext(Context);

    return (
        <div className="d-flex flex-column flex-lg-row p-3 gap-3 py-lg-5 align-items-center justify-content-center">
  <form>
    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
    <div className="form-floating p-1">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating p-1">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
      <label for="floatingPassword">Password</label>
    </div>
        <Link to="/loginform" className="py-2">
          <span className="navbar-brand text-primary">New User</span>
        </Link>
    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
  </form>
</div>
    )
}