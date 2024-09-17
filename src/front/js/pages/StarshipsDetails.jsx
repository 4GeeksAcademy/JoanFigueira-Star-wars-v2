import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const StarshipsDetails = () => {
    const { store, actions } = useContext(Context)

    const handleImgError = (event) => {
        event.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg'
    }

    const params = useParams();

    return (
        <>
            <main className="bg-secondary">
                <div className="container ps-5 pt-4 pb-4 bg-secondary">
                    <Link to="/starships">
                        <span className="navbar-brand text-warning">Starships</span>
                    </Link>
                </div>
            </main>
            <main className="bg-secondary">
                <div className="container pb-4 ps-5 pe-5 bg-secondary">
                    <div class="card">
                        <div class="row">
                            <div class="col-md-4">
                                <img onError={handleImgError} src={`https://starwars-visualguide.com/assets/img/starships/${store.starships[params.nave].uid}.jpg`} class="img-fluid rounded-start" />
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h3 class="card-title">{store.starshipsDetails[params.nave].name}</h3>
                                    <p class="card-text"> Model: {store.starshipsDetails[params.nave].model}</p>
                                    <p class="card-text"> Manufacturer: {store.starshipsDetails[params.nave].manufacturer}</p>
                                    <p class="card-text"> Cargo capacity: {store.starshipsDetails[params.nave].cargo_capacity}</p>
                                    <p class="card-text"> Passengers: {store.starshipsDetails[params.nave].passengers}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>


    )
}