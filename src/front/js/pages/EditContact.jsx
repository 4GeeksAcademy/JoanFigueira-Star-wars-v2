import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const EditContact = () => {
  const { store, actions } = useContext(Context);
  const editContact = store.currentContact;
  const [name, setName] = useState(editContact.name);
  const [phone, setPhone] = useState(editContact.phone);
  const [email, setEmail] = useState(editContact.email);
  const [address, setAddress] = useState(editContact.address);
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
    actions.editContact(editContact.id, dataToSend);
    navigate('/contact')
  };

  const handleReset = () => { };


  return (
    <form className="bg-light" onSubmit={handleSubmit}>
      <div className="container">
        <div className="mb-3">
          <h3 className="text-center">Edit Contact</h3>
          <label htmlFor="text" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname" placeholder="Full Name"
            value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email"
            value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Phone</label>
          <input type="text" className="form-control" id="inputPhone" placeholder="Enter phone"
            value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter adress"
            value={address} onChange={(event) => setAddress(event.target.value)} />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </div>
      <div className="container">
        <Link to="/contact">
          <span className="navbar-brand">back to contact</span>
        </Link>
      </div>
    </form>
  )
}