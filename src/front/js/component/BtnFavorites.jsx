import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const BtnFavorites = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="btn-group ps-2">
      <button className="btn btn-warning btn-sm dropdown-toggle text-black" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Favorites
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {store.favorites.length}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-sm-end">
        {store.favorites.map((item, index) =>
          <li key={index} className="dropdown-item d-flex justify-content-between">
            {item.name} - {item.type}
            <span onClick={() => actions.removeFavorites(item)} className="ms-5">
              <i className="fa-solid fa-trash text-danger"></i>
            </span>
          </li>
        )}
      </ul>
    </div>
  )
}