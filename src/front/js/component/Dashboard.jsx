import React, { useContext } from "react";
import { Context } from "../store/appContext.js"


export const Dashboard = () => {
    const { actions } = useContext(Context);

    const handleOnClick = () => {
        actions.accessProtected()
    }

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <button className="btn btn-warning m-1" onClick={handleOnClick}>
                Acceso a Protected
            </button>
            <button className="btn btn-success m-1" onClick={() => actions.getPosts(1)}>
                Get Posts
            </button>
        </div>
    )
}