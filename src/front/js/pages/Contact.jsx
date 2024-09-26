// ***** Muestra la lista de contactos *****
//  1 Importar el hook useContext
import React, { useContext } from "react";
// 2 Importamos Context desde el archivo appContext.js
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Contact = () => {
  // 3 Utilizo: Desestructurando store y el actions de Context mediante el UseContext
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

  const editContact = async (itemNewContact) => {
    actions.setCurrentContact(itemNewContact);
    navigate('/edit-contact')
  }
  
  const deleteContact = (id) => {
    actions.deleteContact(id)
  }

  return (

    <>
    <div className="bg-secondary d-grid gap-5 d-md-flex justify-content-md-end pe-5 pt-5">
    <Link to="/add-contact">
      <button type="button" className="btn btn-warning btn-sm me-6 text-dark">Add contact</button>
    </Link>
    </div>
    <div className="d-flex flex-column flex-lg-row p-3 gap-3 py-lg-5 align-items-center justify-content-center bg-secondary">
        <div className="list-group">
          {store.contact.map((item) => <span key={item.id} className="list-group-item d-flex gap-5 py-3" aria-current="true">
            <img src="https://i.pinimg.com/474x/74/8f/e3/748fe3b3663d34f97655284a4179d340.jpg" alt="twbs" width="100" height="100" className="rounded-circle flex-shrink-0" />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0"> {item.name}</h6>
                <p className={"mb-0 opacity-75"}><i className="fa-solid fa-location-dot"></i> {item.address}</p>
                <p className={"mb-0 opacity-75"}><i className="fa-solid fa-phone"></i> {item.phone}</p>
                <p className={"mb-0 opacity-75"}><i className="fa-solid fa-envelope"></i> {item.email}</p>
              </div>
              <small className="text-nowrap">
                <button type="button" className="btn" onClick={() => editContact(item)}>
                  <i className="fa-solid fa-pencil text-primary"></i>
                </button>
                <button type="button" className="btn" onClick={() => deleteContact(item.id)}>
                  <i className="fa-solid fa-trash text-danger"></i>
                </button>
              </small>
            </div>
          </span>
          )}
        </div>
      </div>
      </>
  )
}