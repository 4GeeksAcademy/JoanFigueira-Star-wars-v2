import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Spinner } from "./Spinner.jsx";
import { BtnFavorites } from "./BtnFavorites.jsx";

export const Navbar = () => {

  return (
    <div className="container-flex bg-secondary m-0">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <Link to="/">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8z_qqYM-YX6ncpGrJV_fOln6GF3LPe2bXQ&" alt="Logo" width="80" height="50" className="d-inline-block align-text-top" />
              </Link>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ps-5">
              <Link to="/characters">
                <span className="text-light nav-link" aria-current="">Characters</span>
              </Link>
              <Link to="/planets" className="nav-item">
                <span className="text-light nav-link">Planets</span>
              </Link>
              <Link to="/starships" className="nav-item">
                <span className="text-light nav-link">Starships</span>
              </Link>
              <Link to="/contact">
                <span className="text-light nav-link">Contact</span>
              </Link>
              <BtnFavorites/>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-flex bg-dark py-4"></div>
    </div>
  )
}
