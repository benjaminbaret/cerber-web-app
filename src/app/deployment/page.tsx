"use client"

import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";
import supabase from '../connexionDatabase/connectToDatabase';
import DisplayContent from "../component/displayContent/displayDeployment";


const DeploymentPage = () => {
    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    const [checkboxTable, setCheckboxTable] = useState(['']);

   useEffect(() => {
        const intervalId = setInterval(() => {
            // Mettez à jour les valeurs en fonction des éléments du DOM
            setCheckboxTable(checkWhichBoxIsSelected());
        }, 500);

        // Nettoyez l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, []);

    const selectAll = () => {
        const inputElement = document.getElementById('searchInputStatus') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = !inputElement.checked;
            if (inputElement.checked) {
                console.log("Il faut cocher toutes les cases");
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = true;
                });

            } else {
                console.log("Il faut décocher toutes les cases");
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = false;
                });
            }
        }
    };

    const checkWhichBoxIsSelected=()=>{
        const checkboxes = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
        const selectedIds = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const checkboxId = checkbox.id.replace('select', '');
                if(checkboxId!="All"){
                    selectedIds.push(checkboxId);
                }
            }
        });
        return selectedIds;
    };

    return (

        <div className="bg-darkPurple text-white">

            <Navbar currentPage="deployment" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-1 gap-5 ">
                    <PopUpDeploy />
                </div>
            </div>
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative">
                    <thead className="h-16 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <th key="column1" id="progressbar" className="w-1/4">
                            <div>Progress</div>
                        </th>
                        <th key="column2"id="devicename" className="w-1/4">
                            <div>Device Name</div>
                        </th>
                        <th key="column3" id="updatename" className="w-1/4">
                            <div>Update Name</div>
                        </th>
                        <th key="column4" id="groupname" className="w-1/4">
                            <div>Group Name</div>
                        </th>
                        
                    </thead>
                    {DisplayContent()}
                </table>
            </div>
            <Footer />
        </div>
    );
};
export default DeploymentPage;