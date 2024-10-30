// ********Muestra el formulario y permite edit y add *************

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [id, setId] = useState(1);
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      "name": name,
      "phone": phone,
      "email": email,
      "address": address,
      "id": id,
    }
    actions.addContact(dataToSend);
    navigate('/contact');
  };


  const handleReset = () => { };


  return (
    <main className="bg-secondary">
      <div className="pt-5 pb-4 ps-5 pe-5 bg-secondary">
        <form className="bg-secondary" onSubmit={handleSubmit}>
          <div className="container">
            <div className="mb-3">
              <h3 className="text-center text-light">Add contact</h3>
              <label htmlFor="text" className="form-label text-light">Full Name</label>
              <input type="text" className="form-control" id="fullname" placeholder="Full Name"
                value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label text-light">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email"
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label text-light">Phone</label>
              <input type="text" className="form-control" id="inputPhone" placeholder="Enter phone"
                value={phone} onChange={(event) => setPhone(event.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label text-light">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="Enter adress"
                value={address} onChange={(event) => setAddress(event.target.value)} />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
          <div className="container">
            <Link to="/contact">
              <span className="navbar-brand text-warning">back to contact</span>
            </Link>
          </div>
        </form>
      </div>
    </main>

  )
};

