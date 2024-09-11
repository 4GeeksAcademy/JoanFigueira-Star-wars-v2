import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { Contact } from "./Contact.jsx";
import { AddContact } from "./AddContact.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-flex bg-secondary text-center pt-4">
				<img src="https://lacuevadelguampa.com/cdn/shop/articles/star_wars_personajes.jpg?v=1616087475&width=2000" />
		</div>
	);
};
