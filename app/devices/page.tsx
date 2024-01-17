"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';


const handleDelete = () => {
    console.log('delete command');
    //faire requette sql pour mise a jour page
};
const createnewgroup = () => {
    console.log('new group command');
    //faire requette sql pour mise a jour page
};
const newdeviceadd = () => {
    console.log('new device command');
    //faire requette sql pour mise a jour page
};
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
const inputSearchSoft = () =>{
    const inputElement = document.getElementById('searchInputSoft') as HTMLInputElement;
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
const inputSearchUpdate = () =>{
    const inputElement = document.getElementById('inputLastUpdate') as HTMLInputElement;
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

const changeType=()=>{
    const inputElement = document.getElementById('searchInputType') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            //faire requette sql pour mise a jour page
            console.log(inputValue);
        }
    }
}
const changeGroup=()=>{
    const inputElement = document.getElementById('searchInputType') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            //faire requette sql pour mise a jour page
            console.log(inputValue);
        }
    }
}

const fonctionTest: () => React.ReactNode = () => {
    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    useEffect(() => {
        const lireFichier = async () => {
            try {
                const cheminFichier = 'file.txt';
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
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr>
                    <td className=" text-center className='w-1/7'">
                        <input type="checkbox" id={"select"+indexLigne} name={"select"+indexLigne}/>
                    </td>
                    <td id={"Status" + indexLigne} className="flex items-center justify-center text-center w-1/7">
                        {ligne[0] === "0" ? (
                            <img className="h-6" src="rondVert.png"/>
                        ) : (
                            <img className="h-6" src="rondRouge.png"/>
                        )}
                    </td>
                    <td className="text-center className='w-1/7'">
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
                    <td className="text-center className='w-1/7'">
                        {ligne[5]}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};
const devicesPage = () => {
    
    
    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div>
                <div className="flex justify-center items-center">
                    <button onClick={newdeviceadd} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="plus.png" className="h-6"/>
                        <p className="ml-2">New Device</p>
                    </button>
                    <button onClick={createnewgroup} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="plus.png" className="h-6"/>
                        <p className="ml-2">New Group</p>
                    </button>
                    <button onClick={handleDelete} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="bin.png" className="h-6"/>
                        <p className="ml-2">Delete</p>
                    </button>
                </div>
            </div>
            <table className="w-full mb-6 mt-10 bg-darkPurple text-white justify-between items-center h-full">
                <thead className="bg-intermediatePurple text-lg">
                    <th key="column1" className="w-1/7"> {/* Spécifiez la largeur de la colonne */}
                        <div>Select All</div>
                        <div className="flex items-center justify-center">
                            <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll"/>
                        </div>
                    </th>
                    <th key="column2" className="w-1/7">
                        <div>Status</div>
                        <div className="flex items-center justify-center">
                            <select onChange={changeStatus} id="searchInputStatus" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="on">On</option>
                                <option value="off">Off</option>
                            </select>
                        </div>
                    </th>
                    <th key="column3" className="w-1/7">
                        <div>Name</div>
                        <div className="flex items-center justify-center">
                            <img src="loupe.png" className="h-4 mr-2" onClick={inputSearchName} />
                            <input type="text" id="searchInputName" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column4" className="w-1/7">
                        <div>Type</div>
                        <div className="flex items-center justify-center">
                            <select onChange={changeType} id="searchInputType" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                    </th>
                    <th key="column5" className="w-1/7">
                        <div>Group</div>
                        <div className="flex items-center justify-center">
                            <select onChange={changeGroup} id="inputGroup" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                            </select>
                        </div>
                    </th>
                    <th key="column6" className="w-1/7">
                        <div>Software</div>
                        <div className="flex items-center justify-center">
                            <img src="loupe.png" className="h-4 mr-2" onClick={inputSearchSoft} />
                            <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column7" className="w-1/7">
                        <div>Last Update</div>
                        <div className="flex items-center justify-center">
                            <img src="loupe.png" className="h-4 mr-2 mb-19" onClick={inputSearchUpdate} />
                            <input type="text" id="inputLastUpdate" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                </thead>
                    {fonctionTest()}
                    
            </table>
            <div className="container mx-auto px-4">
                <h1>Welcome to the Devices!</h1>
            </div>
        </div>
    );
};

export default devicesPage;