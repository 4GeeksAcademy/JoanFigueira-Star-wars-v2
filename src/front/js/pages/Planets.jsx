import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    const handleImgError = (event) => {
        event.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg'
    }

    return (

        <main className="bg-secondary d-flex pt-4 pb-3">
            <div className="container-fluid">
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                    {store.planets.map((item, index) =>
                        <div className="card shadow-sm" key={item.uid}>
                            <img className="bd-placeholder-img card-img-top" onError={handleImgError} src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}></img>
                            <div className="card-body">
                                <p>{item.name}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={"/planetsdetails/" + index}>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Details</button>
                                        </Link>
                                    </div>
                                        <span onClick={() => actions.addFavorites({name: item.name, type: 'Planet'})} className="text-body-secondary"><i className="fa-solid fa-heart text-warning"></i></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>

    )
}