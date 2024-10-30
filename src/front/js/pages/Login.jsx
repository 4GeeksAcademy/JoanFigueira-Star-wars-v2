import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = { email, password }
    console.log(dataToSend);
    actions.login(dataToSend);
    navigate('/dashboard')
  }

  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-center">
        <div className="col-10 col-md-8 col-lg-5 border rounded-3">
          <div className="d-flex justify-content-end pt-2">
              <button type="button" className="btn-close" aria-label="Close"></button>
          </div>
          <h1 className="text-primary">Login</h1>
          <form onSubmit={handleSubmit} className="py-4 px-2 p-sm-4  p-md-5">
            <div className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Email" aria-label="Email"
                value={email} onChange={handleEmail} aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
              <input type={hidePassword ? "password" : 'text'} className="form-control" aria-label="Password" placeholder="Password"
                value={password} onChange={handlePassword} />
              <span onClick={() => setHidePassword(!hidePassword)} className="input-group-text">
                {hidePassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
              </span>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}