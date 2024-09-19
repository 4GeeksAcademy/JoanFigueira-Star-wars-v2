import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);

    const handleImgError = (event) => {
        event.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg'
    }

    const handlefavorite = () => {

    }

    console.log(store.characters);


    return (
        <main className="bg-secondary d-flex pt-4 pb-3">
            <div className="container-fluid">
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                    {store.characters.map((item, index) =>
                        <div className="card" style={{ width: "18rem" }} key={item.uid}>
                            <img className="bd-placeholder-img card-img-top" onError={handleImgError} src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}></img>
                            <div className="card-body">
                                <p>{item.name}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={"/characterdetail/" + index}>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Details</button>
                                        </Link>
                                    </div>
                                        <span type="button" onClick={() => actions.addFavorites({name: item.name, type: 'Character'})} className="text-body-secondary"><i className="fa-solid fa-heart text-warning"></i></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>

    )
}