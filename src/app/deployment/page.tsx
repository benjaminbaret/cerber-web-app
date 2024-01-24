"use client"

import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";
import supabase from '../connexionDatabase/connectToDatabase';
import DisplayContent from "../component/displayContent/displayDeployment";


const DeploymentPage = () => {

// Utilisez le state pour stocker les valeurs
const [DeviceNameValue, setDeviceNameValue] = useState('');
const [UpdateNameValue, setUpdateNameValue] = useState('');
const [StatusValue, setStatusValue] = useState('');
const [GroupNameValue, setGroupNameValue] = useState('');

// Utilisez useEffect pour définir l'intervalle et mettre à jour les valeurs toutes les secondes
useEffect(() => {
    const intervalId = setInterval(() => {
        // Mettez à jour les valeurs en fonction des éléments du DOM
        setDeviceNameValue(changeDeviceName());
        setUpdateNameValue(changeUpdateName());
        setStatusValue(changeStatus());
        setGroupNameValue(changeGroupName());
    }, 1000);

    // Nettoyez l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
}, []);

const changeDeviceName = () => {
    const changeDeviceNameElement = document.getElementById('devicename') as HTMLInputElement;
    return changeDeviceNameElement ? changeDeviceNameElement.value : '';
};

const changeUpdateName = () => {
    const changeUpdateNameElement = document.getElementById('updatename') as HTMLInputElement;
    return changeUpdateNameElement ? changeUpdateNameElement.value : '';
};

const changeStatus = () => {
    const changeStatusElement = document.getElementById('status') as HTMLInputElement;
    return changeStatusElement ? changeStatusElement.value : '';
};

const changeGroupName = () => {
    const changeGroupNameElement = document.getElementById('groupname') as HTMLInputElement;
    return changeGroupNameElement ? changeGroupNameElement.value : '';
};

    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    useEffect(() => {
        const lireFichier = async () => {
            try {
                const cheminFichier = 'text/file3.txt';
                const reponse = await fetch(cheminFichier);
                const contenuFichier = await reponse.text();
                const lignes = contenuFichier.split('\n');
                const nouveauTableau = lignes.map((ligne) => ligne.split(' '));
                console.log(nouveauTableau);
                setTableauContenu(nouveauTableau);
            } catch (erreur) {
                console.error('Erreur lors de la lecture du fichier :', erreur);
            }
        };
        lireFichier();
    }, []);

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
                        <th key="column1" id="progressbar" className="w-1/5">
                            <div>Progress</div>
                        </th>
                        <th key="column2"id="devicename" className="w-1/5">
                            <div>Device Name</div>
                        </th>
                        <th key="column3" id="updatename" className="w-1/5">
                            <div>Update Name</div>
                        </th>
                        <th key="column4" id="groupname" className="w-1/5">
                            <div>Group Name</div>
                        </th>
                        <th key="column5" id="status" className="w-1/5">
                            <div>Status</div>
                        </th>
                    </thead>
                    {DisplayContent(DeviceNameValue, UpdateNameValue, StatusValue, GroupNameValue)}
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default DeploymentPage;