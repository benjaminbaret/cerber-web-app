"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";


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
 const check = () => {
    const inputElement = document.getElementById('selectAll') as HTMLInputElement;
    if (inputElement) {
        inputElement.checked = false;
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

const fonctionTest: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        <input type="checkbox" onChange={check} id={"select"+indexLigne} name={"select"+indexLigne}/>
                    </td>
                    <td id={"Status" + indexLigne} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {ligne[0] === "0" ? (
                            <img className="h-6" src="images/rondVert.png"/>
                        ) : (
                            <img className="h-6" src="images/rondRouge.png"/>
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
                    <td className="text-center className='w-1/7">
                        {ligne[4]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[5]}
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
const devicesPage = () => {
    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    useEffect(() => {
        const lireFichier = async () => {
            try {
                const cheminFichier = 'text/file.txt';
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
            <Navbar currentPage="devices" />
            <div className="fixed top-20 w-full bg-darkPurple z-50 sticky">
                <div className="pb-8 flex justify-center items-center">
                    <button onClick={newdeviceadd} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="images/plus.png" className="h-6"/>
                        <p className="ml-2">New Device</p>
                    </button>
                    <button onClick={createnewgroup} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="images/plus.png" className="h-6"/>
                        <p className="ml-2">New Group</p>
                    </button>
                    <button onClick={handleDelete} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="images/bin.png" className="h-6"/>
                        <p className="ml-2">Delete</p>
                    </button>
                </div>
            </div>
            <table className="w-full mb-6 bg-darkPurple text-white justify-between items-center h-full overflow-auto relative">
                <thead className="fixed sticky top-40 w-full bg-darkPurple z-50  bg-intermediatePurple text-lg">
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
                            <img src="images/loupe.png" className="h-4 mr-2" onClick={inputSearchName} />
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
                            <img src="images/loupe.png" className="h-4 mr-2" onClick={inputSearchSoft} />
                            <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column7" className="w-1/7">
                        <div>Last Update</div>
                        <div className="flex items-center justify-center pt-2 pb-2">
                            <img src="images/loupe.png" className="h-4 mr-2 mb-19" onClick={inputSearchUpdate} />
                            <input type="text" id="inputLastUpdate" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                </thead>
                    {fonctionTest(tableauContenu)}
                    
            </table>
            <Footer /> 
        </div>
    );
};
export default devicesPage;







