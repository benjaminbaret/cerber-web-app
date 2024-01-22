"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";

const deployFunction = () => {
    console.log('new group command');
    //faire pop up puis requetes sql pour mise a jour page
};

const traceProgress = (percentage: string, error:string) => {
    const percentageNumber = parseInt(percentage);
    if(error === "1"){
        return (
            <div className="flex justify-center items-center">
                <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className=" h-2.5 bg-red-500" style={{ width: `${percentageNumber}%`, borderRadius: 'inherit' }}></div>
                </div>
            </div>
        );
    }else{
        return (
            <div className="flex justify-center items-center">
                <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className=" h-2.5 bg-yellow-500" style={{ width: `${percentageNumber}%`, borderRadius: 'inherit' }}></div>
                </div>
            </div>
        );
    }
};


const contenuDisplay: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        {traceProgress(ligne[0],"0")}
                    </td>
                    <td id={"name"} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {ligne[1]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[2]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[3]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[4]}
                    </td>
                    <style jsx>{`
                        tr::after {
                            content: "";
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1px;
                            background-color: #e2e8f0;
                            opacity: 0.28;
                        }
                    `}</style>
                </tr>
            ))}
        </tbody>
    );
};
const DeploymentPage = () => {
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
        <div>
            <Navbar currentPage="deployment" />
            <div className="fixed top-20 w-full bg-darkPurple z-50 sticky">
                <div className="pb-8 flex justify-center items-center">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PopUpDeploy/>                   
                </div>
                </div>
            </div>
            <table className="w-full bg-darkPurple text-white justify-between items-center h-full overflow-auto relative">
                <thead className="h-50 fixed sticky top-40 w-full bg-darkPurple z-50  bg-intermediatePurple text-lg">
                    <th key="column1" id="selectAllId" className="w-1/7"> 
                        <div>Progress</div>
                    </th>
                    <th key="column2" className="w-1/5">
                        <div>Device Name</div>
                    </th>
                    <th key="column3" className="w-1/5">
                        <div>Update Name</div>
                    </th>
                    <th key="column4" className="w-1/5">
                        <div>Group Name</div>
                    </th>
                    <th key="column5" className="w-1/5">
                        <div>Status</div>
                    </th>
                </thead>
                    {contenuDisplay(tableauContenu)}
            </table>
            <Footer /> 
        </div>
    );
};

export default DeploymentPage;