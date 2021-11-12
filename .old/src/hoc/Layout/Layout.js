import React from "react";

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const layout = (props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Navbar />
            <main className="flex-grow">{props.children}</main>
            <Footer />
        </div>
    );
};

export default layout;
