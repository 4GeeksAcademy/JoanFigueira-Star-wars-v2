import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
// Import Components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom pagas / views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { Contact } from "./pages/Contact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Starships } from "./pages/Starships.jsx";
import { PlanetsDetails } from "./pages/PlanetsDetails.jsx";
import { StarshipsDetails } from "./pages/StarshipsDetails.jsx";
import { CharacterDetails } from "./pages/CharactersDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./component/Dashboard.jsx";
import { Alert } from "./component/Alert.jsx";


//  Create your first component
const Layout = () => {
    //  The basename is used when your project is published in a subdirectory and not in the root of the domain
    //  You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<AddContact />} path="/add-contact" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<EditContact />} path="/edit-contact" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<CharacterDetails />} path="/characterdetail/:personaje" />
                        <Route element={<PlanetsDetails />} path="/planetsdetails/:planeta" />
                        <Route element={<StarshipsDetails />} path="/starshipsdetails/:nave" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Alert />} path="/alert" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
