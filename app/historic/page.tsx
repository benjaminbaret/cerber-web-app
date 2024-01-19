"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";

const changeStatus = () => {
    const inputElement = document.getElementById('searchInputStatus') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            console.log(inputValue);
            //faire requette sql pour mise a jour page
            return inputValue;
        }
    }
    return null;
}

const changeGroup = () => {
    const inputElement = document.getElementById('searchInputNameID') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            console.log(inputValue);
            //faire requette sql pour mise a jour page
            return inputValue;
        }
    }
    return null;
}
const changeType = () => {
    const inputElement = document.getElementById('searchInputTypeID') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            console.log(inputValue);
            //faire requette sql pour mise a jour page
            return inputValue;
        }
    }
    return null;
}

const inputSearchName = () =>{
    const inputElement = document.getElementById('searchInputName') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            console.log(inputValue);
            inputElement.value = '';
            //faire requette sql pour mise a jour page
        } else {
            console.log("La zone input est vide.");
        }
    }
}

const inputSearchUpdateName = () =>{
    const inputElement = document.getElementById('searchInputNameUpdate') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            console.log(inputValue);
            inputElement.value = '';
            //faire requette sql pour mise a jour page
        } else {
            console.log("La zone input est vide.");
        }
    }
}






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
                <thead className="fixed sticky top-20 w-full bg-darkPurple z-50  bg-intermediatePurple text-lg">
                    <th key="column1" id="changeStatusID" className="w-1/4"> 
                        <div>Status</div>
                        <select onChange={changeStatus} id="searchInputStatus" className="text-black text-xs rounded-full">
                                <option value="finish">Finish</option>
                                <option value="progress">In Progress</option>
                                <option value="abort">Abort</option>
                        </select>
                    </th>
                    <th key="column2" className="w-1/5">
                        <div>Device Name</div>
                        <div className="flex items-center justify-center">
                            <img src="images/loupe.png" className="h-4 mr-2" onClick={inputSearchName} />
                            <input type="text" id="searchInputName" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column3" className="w-1/5">
                        <div>Update Name</div>
                        <div className="flex items-center justify-center">
                            <img src="images/loupe.png" className="h-4 mr-2" onClick={inputSearchUpdateName} />
                            <input type="text" id="searchInputNameUpdate" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column4" id="groupNameID" className="w-1/4"> 
                        <div>Group</div>
                        <select onChange={changeGroup} id="searchInputNameID" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="2">Group2</option>
                                <option value="3">Group3</option>
                        </select>
                    </th>
                    <th key="column5" id="typeID" className="w-1/4"> 
                        <div>Type</div>
                        <select onChange={changeType} id="searchInputTypeID" className="text-black text-xs rounded-full">
                                <option value="all">all</option>
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