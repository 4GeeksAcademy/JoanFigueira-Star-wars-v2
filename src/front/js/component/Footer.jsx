import React from "react";

export const Footer = () => {



	return (
		<div className="d-flex flex-column">
			<div className="container-flex bg-dark py-4"></div>
			<footer className="mt-auto text-center bg-secondary">
				<p className="text-light">
					Made with <i className="fa fa-heart text-danger" /> by{" "}
					<span className="text-light" href="http://www.4geeksacademy.com" target="_blank">4Geeks Academy</span>
				</p>
			</footer>
		</div>
	)
}
