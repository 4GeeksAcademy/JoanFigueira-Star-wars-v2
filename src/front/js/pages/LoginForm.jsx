import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const LoginForm = () => {
    const {store, actions} = useContext(Context);

    return (
        <form className="bg-secondary">
      <div className="container">
        <div className="mb-3">
          <h3 className="text-center text-light pt-5">New User</h3>
          <label htmlFor="text" className="form-label text-light">Nombre de usuario</label>
          <input type="text" className="form-control" id="Nombre de usuario" placeholder="Full Name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label text-light">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-light">Password</label>
          <input type="password" className="form-control" id="inputPhone" placeholder="Password"/>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto py-2">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </div>
      <div className="container">
      </div>
    </form>
    )
}