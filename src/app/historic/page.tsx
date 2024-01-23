"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import SearchIcon from '@mui/icons-material/Search';

//import supabase from '../connexionDatabase/connectToDatabase';

/*const changeStatus = async () => {
    const inputElement = document.getElementById('searchInputStatus') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                // Effectuer une requête SQL pour mettre à jour le statut en fonction de la valeur du champ de recherche
                const { data, error } = await supabase
                    .from('Deployment')
                    .update({ status: inputValue })
                    .eq('id', `%${inputValue}%`);

                if (error) {
                    console.error('Erreur lors de la mise à jour des données:', error);
                } else {
                    console.log('Données mises à jour avec succès:', data);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }

            return inputValue;
        }
    }

    return null;
};*/


/*const changeGroup = async () => {
    const inputElement = document.getElementById('searchInputNameID') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                // Effectuer une requête SQL pour mettre à jour le groupe en fonction de la valeur du champ de recherche
                const { data, error } = await supabase
                    .from('Device')
                    .update({ group: inputValue })
                    .eq('id', `%${inputValue}%`);

                if (error) {
                    console.error('Erreur lors de la mise à jour des données:', error);
                } else {
                    console.log('Données mises à jour avec succès:', data);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }

            return inputValue;
        }
    }

    return null;
};*/

/*const changeType = async () => {
    const inputElement = document.getElementById('searchInputTypeID') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                // Effectuer une requête SQL pour mettre à jour le type en fonction de la valeur du champ de recherche
                const { data, error } = await supabase
                    .from('Device')
                    .update({ type: inputValue }) // Remplacez 'type' par le nom de votre colonne de type
                    .eq('id', `%${inputValue}%`); // Remplacez 'id' par le nom de votre colonne d'identifiant

                if (error) {
                    console.error('Erreur lors de la mise à jour des données:', error);
                } else {
                    console.log('Données mises à jour avec succès:', data);
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }

            return inputValue;
        }
    }

    return null;
};*/


/*const inputSearchName = () =>{
    const inputElement = document.getElementById('searchInputName') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                // Effectuer une requête SQL pour rechercher des enregistrements basés sur le nom
                const { data, error } = await supabase
                    .from('Update')
                    .select('*')
                    .ilike('name', `%${inputValue}%`); // Utilisez ilike pour une recherche insensible à la casse

                if (error) {
                    console.error('Erreur lors de la recherche des données:', error);
                } else {
                    console.log('Résultat de la recherche:', data);
                    // Mettez à jour votre état local ou effectuez d'autres actions avec les données de la recherche
                }
            } catch (error) {
                console.error('Erreur lors de la recherche des données:', error);
            }

            inputElement.value = ''; // Réinitialise la valeur de l'input après la recherche
        } else {
            console.log("La zone input est vide.");
        }
    }
};*/

/*const inputSearchUpdateName = async () => {
    const inputElement = document.getElementById('searchInputNameUpdate') as HTMLInputElement;

    if (inputElement) {
        const inputValue = inputElement.value.trim();

        if (inputValue !== '') {
            try {
                // Effectuer une requête SQL pour mettre à jour des enregistrements basés sur le nom
                const { data, error } = await supabase
                    .from('Device')
                    .update({ /* Les colonnes et valeurs que vous souhaitez mettre à jour ici })
                    .ilike('name', `%${inputValue}%`);

                if (error) {
                    console.error('Erreur lors de la mise à jour des données:', error);
                } else {
                    console.log('Données mises à jour avec succès:', data);
                    // Mettez à jour votre état local ou effectuez d'autres actions avec les données mises à jour
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }

            inputElement.value = ''; // Réinitialise la valeur de l'input après la mise à jour
        } else {
            console.log("La zone input est vide.");
        }
    }
};*/


const contenuDisplay: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        {ligne[0]}
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
const HistoricPage = () => {
    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    useEffect(() => {
        const lireFichier = async () => {
            try {
                const cheminFichier = 'text/file4.txt';
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
            <Navbar currentPage="historic" />
            <table className="w-full bg-darkPurple text-white justify-between items-center h-full overflow-auto relative">
                <thead className="h-16 top-20 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                    <th key="column1" id="changeStatusID" className="w-1/4"> 
                        <div>Status</div>
                        <select /*onChange={changeStatus}*/ id="searchInputStatus" className="text-black text-xs rounded-full ">
                                <option value="finish">Finish</option>
                                <option value="progress">In Progress</option>
                                <option value="abort">Abort</option>
                        </select>
                    </th>
                    <th key="column2" className="w-1/5">
                        <div>Device Name</div>
                        <div className="flex items-center justify-center">
                            <SearchIcon fontSize="medium" className="h-5" /*onClick={inputSearchName}*/ />
                            <input type="text" id="searchInputName" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft:'8px', marginRight:'8px' }}/>
                        </div>
                    </th>
                    <th key="column3" className="w-1/5">
                        <div>Update Name</div>
                        <div className="flex items-center justify-center">
                            <SearchIcon fontSize="medium" className="h-5" /*onClick={inputSearchUpdateName} */ />
                            <input type="text" id="searchInputNameUpdate" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft:'8px', marginRight:'8px' }}/>
                        </div>
                    </th>
                    <th key="column4" id="groupNameID" className="w-1/4"> 
                        <div>Group</div>
                        <select /*onChange={changeGroup}*/ id="searchInputNameID" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="2">Group2</option>
                                <option value="3">Group3</option>
                        </select>
                    </th>
                    <th key="column5" id="typeID" className="w-1/4"> 
                        <div>Type</div>
                        <select /*onChange={changeType}*/ id="searchInputTypeID" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="rasp">rasp3457</option>
                                <option value="esp">esp32</option>
                        </select>
                    </th>
                </thead>
                    {contenuDisplay(tableauContenu)}
            </table>
            <Footer />
        </div>
    );
};

export default HistoricPage;