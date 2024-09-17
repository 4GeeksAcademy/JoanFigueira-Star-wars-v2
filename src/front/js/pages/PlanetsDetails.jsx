import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const PlanetsDetails = () => {
    const { store, actions } = useContext(Context)

    const handleImgError = (event) => {
        event.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg'
    }

    const params = useParams();

    return (
        <>
            <main className="bg-secondary">
                <div className="container ps-5 pt-4 pb-4 bg-secondary">
                    <Link to="/planets">
                        <span className="navbar-brand text-warning">Planets</span>
                    </Link>
                </div>
            </main>
            <main className="bg-secondary">
                <div className="container pb-4 ps-5 pe-5 bg-secondary">
                    <div class="card">
                        <div class="row">
                            <div class="col-md-4">
                                <img onError={handleImgError} src={`https://starwars-visualguide.com/assets/img/planets/${store.planets[params.planeta].uid}.jpg`} class="img-fluid rounded-start" />
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h3 class="card-title">{store.planetsDetails[params.planeta].name}</h3>
                                    <p class="card-text"> Rotation: {store.planetsDetails[params.planeta].rotation_period}</p>
                                    <p class="card-text"> Diameter: {store.planetsDetails[params.planeta].diameter}</p>
                                    <p class="card-text"> Climate: {store.planetsDetails[params.planeta].climate}</p>
                                    <p class="card-text"> Gravity: {store.planetsDetails[params.planeta].gravity}</p>
                                    <p class="card-text"> Terrain: {store.planetsDetails[params.planeta].terrain}</p>
                                    <p class="card-text"> Population: {store.planetsDetails[params.planeta].population}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>


    )
}