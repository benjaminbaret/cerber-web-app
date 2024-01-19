'use client'

import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";
//import React from "react";
import React, { useState } from 'react';
import PopUp from "../component/popupnewdevice/page";
import PopUpNewDevice from "../component/popupnewdevice/page";
import PopUpNewGroup from "../component/popupnewgroup/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";

const devicesPage = () => {

    // const openPopup = () => {
    //     // URL de la pop-up, par exemple, Google en attendant le lien de redirection 
    //     const popupUrl = "http://localhost:3000/popupdevice";
    
    //     // Paramètres pour la fenêtre pop-up de manière à la faire ouvrir au centre de l'écran

    //     const screenWidth = window.screen.width;
    //     const screenHeight = window.screen.height;
    //     const popupWidth = 850;
    //     const popupHeight = 450;
    //     const left = (screenWidth - popupWidth) / 2;
    //     const top = (screenHeight - popupHeight) / 2;

    //     // Paramètres pour la fenêtre pop-up
    //     const popupOptions = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes`;

    //     // Ouvre la pop-up
    //     window.open(popupUrl, "Popup", popupOptions);
        
    // };

    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-3 gap-10" >
                    <PopUpNewDevice/>
                    <PopUpNewGroup/>
                    <PopUpDeleteDevice/>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <h1>Welcome to the Devices!</h1>
            </div>
            <div>
        </div>
            <Footer /> 
        </div>
        </div>
    );
};

export default devicesPage;







