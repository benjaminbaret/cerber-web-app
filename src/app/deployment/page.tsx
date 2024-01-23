"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";
//import supabase from '../connexionDatabase/connectToDatabase';

/*const deployFunction = () => {
    const [data, setData] = useState([]);

    const deployFunction = async () => {
        // Affiche un pop up de confirmation
        const shouldDeploy = window.confirm('Voulez-vous vraiment déployer la nouvelle version ?');

        if (shouldDeploy) {
            const { data, error } = await supabase
                .from('Deployment')
                .update({ Vos données de mise à jour ici  })
                .eq('condition_column', 'valeur_condition'); // Ajoutez une condition si nécessaire

            if (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            } else {
                console.log('Données mises à jour avec succès:', data);
            }
        }
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
};*/


const contenuDisplay: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                // eslint-disable-next-line react/jsx-key
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        {/*traceProgress(ligne[0],"0")*/}
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

        <div className="bg-darkPurple text-white">

            <Navbar currentPage="deployment" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-1 gap-5 ">
                    <PopUpDeploy />
                </div>
            </div>

            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center h-full">

                <table className="w-full  mt-5 mb-6 justify-between items-center relative">

                    <thead className="h-16 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
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
            </div>
            <Footer />
        </div>
    );
};

export default DeploymentPage;