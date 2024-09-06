import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Publications = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()

  const addPublication = () => {
    navigate('/add-publications')
  }
  // 0 async, método DELETE
  const deletePublications = async (nro) => {
    console.log(nro);
    // 1
    const uri = `${host}/publications/${nro}`
    // console.log(uri);
    // 2
    const options = {
      method: 'DELETE'
    }
    // 3
    const response = await fetch(uri, options)
    // 4
    if (!response.ok) {
      // 4.1 Tratar el error
      console.log(response.status);
      return
    }
    // 5
    const data = await response.json()
    console.log(data);
    // 6
    getPublications();
  }

  // Método PUT
  const editPublications = async (publications) => {
    const dataToSend = {
      "title_es": "Modificación de la Publición 201",
      "title_en": "New Publication #201",
      "url": "https://gist.github.com/hchocobar/201",
      "resume_es": "Algun detalle",
      "resume_en": "Somethig",
      "language": "ES",
      "source_id": 1,
      "category_id": 1
    }
    const uri = `${host}/publications/${publications.id}`
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    }
    const response = await fetch(uri, options)
    if (!response.ok) {
      // Trato el error
      return
    }
    const data = await response.json();
    // console.log(data);
    getPublications();
  }



  return (
    <div className="container">
      <h1 className="text-success">Crud Example</h1>
      {/* Otra opición es utilizar el Link como lo hacemos en el Navbar */}
      <button className="btn btn-primary mb-2" onClick={addPublication}>
        Nueva Publicación
      </button>
      <ul className="list-group">
        {store.publications.map((item) =>
          <li key={item.id} className="list-group-item hidden-icon d-flex justify-content-between">
            {item.title_es}
            <div>
              <span onClick={() => editPublications(item)}>
                <i className="fas fa-pencil-alt text-primary"></i>
              </span>
              <span onClick={() => deletePublications(item.id)}>
                <i className="fas fa-trash text-danger ms-2"></i>
              </span>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}