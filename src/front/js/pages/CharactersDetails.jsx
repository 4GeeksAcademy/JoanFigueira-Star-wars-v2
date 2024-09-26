import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context)

    const handleImgError = (event) => {
        event.target.src = 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/big-placeholder.jpg'
    }
    const params = useParams();

    return (
        <>
            <main className="bg-secondary">
                <div className="container ps-5 pt-4 pb-4 bg-secondary">
                    <Link to="/characters">
                        <span className="navbar-brand text-warning">Characters</span>
                    </Link>
                </div>
            </main>
            <main className="bg-secondary">
                <div className="container pb-4 ps-5 pe-5 bg-secondary">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-4">
                                <img onError={handleImgError} src={`https://starwars-visualguide.com/assets/img/characters/${store.characters[params.personaje].uid}.jpg`} className="img-fluid rounded-start" />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h3 className="card-title">{store.charactersDetails[params.personaje].name}</h3>
                                    <p className="card-text"> Height: {store.charactersDetails[params.personaje].height}</p>
                                    <p className="card-text"> Mass: {store.charactersDetails[params.personaje].mass}</p>
                                    <p className="card-text"> Hair color: {store.charactersDetails[params.personaje].hair_color}</p>
                                    <p className="card-text"> Skin color: {store.charactersDetails[params.personaje].skin_color}</p>
                                    <p className="card-text"> Eye Color: {store.charactersDetails[params.personaje].eye_color}</p>
                                    <p className="card-text"> Birth year: {store.charactersDetails[params.personaje].birth_year}</p>
                                    <p className="card-text"> Gender: {store.charactersDetails[params.personaje].gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>


    )
}