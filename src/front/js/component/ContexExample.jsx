// 1 Importar el hook useContext
import React, { useContext} from "react";
// 2 Importamos Context desde el archivo appContext.js
import { Context } from "../store/appContext.js";



export const ContexExample = () => {
    // 3 Utilizo: Desestructuramos store y el actions de Context mediante el UseContext
    const { store,actions} = useContext (Context);

    const handleLogin = () => {
        actions.setIsLoged(!store.isLoged)
        
    }

    return (
        <div className="container text-center border mt-3">
            {/* 4. Utilizo la sintaxis store.clavepara mostrar el valor */}
            <p>{store.user}</p>
            <p>{store.cohorte}</p>
            <button className="btn btn-warning" onClick={handleLogin}>
                {store.isLoged ? 'Logout' : 'Login'}
                </button>
        </div>
    )
}