"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";

const handleDelete = () => {
    console.log('delete command');
    //faire requette sql pour mise a jour page
};
const uploadFileFunction = () => {
    console.log('new group command');
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

const AscendingSortFunctionDate = () => {
    console.log('ascending sort command');
    //faire requette sql pour mise a jour page
}
const DescendingSortFunctionDate = () => {
    console.log('descending sort command');
    //faire requette sql pour mise a jour page
}
const AscendingSortFunctionSize = () => {
    console.log('ascending sort command');
    //faire requette sql pour mise a jour page
}
const DescendingSortFunctionSize = () => {
    console.log('descending sort command');
    //faire requette sql pour mise a jour page
}

const selectAll = () => {
    const inputElement = document.getElementById('selectAllId') as HTMLInputElement;
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

const contenuDisplay: (tableauContenu: string[][]) => React.ReactNode = (tableauContenu) => {
    return (
        <tbody>
            {tableauContenu.map((ligne, indexLigne) => (
                <tr className="relative">
                    <td className=" text-center className='w-1/7'">
                        <input type="checkbox" id={"select"+indexLigne} name={"select"+indexLigne}/>
                    </td>
                    <td id={"name"} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                        {ligne[0]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[1]}
                    </td>
                    <td className="text-center className='w-1/7'">
                        {ligne[2]}
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

const UpdatesPage = () => {
    const [tableauContenu, setTableauContenu] = useState<string[][]>([]);
    useEffect(() => {
        const lireFichier = async () => {
            try {
                const cheminFichier = 'text/file2.txt';
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
            <Navbar currentPage="updates" />
            <div className="fixed top-20 w-full bg-darkPurple z-50 sticky">
                <div className="pb-8 flex justify-center items-center">
                    <button onClick={uploadFileFunction} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="images/uploadFileIcon.png" className="h-6"/>
                        <p className="ml-2">Upload File</p>
                    </button>
                    <button onClick={handleDelete} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="images/bin.png" className="h-6"/>
                        <p className="ml-2">Delete File</p>
                    </button>
                </div>
            </div>
            <table className="w-full bg-darkPurple text-white justify-between items-center h-full overflow-auto relative">
                <thead className="fixed sticky top-40 w-full bg-darkPurple z-50  bg-intermediatePurple text-lg">
                    <th key="column1" id="selectAllId" className="w-1/4"> 
                        <div>Select All</div>
                        <div className="flex items-center justify-center">
                            <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll"/>
                        </div>
                    </th>
                    <th key="column3" className="w-1/4">
                        <div>Name</div>
                        <div className="flex items-center justify-center">
                            <img src="images/loupe.png" className="h-4 mr-2" onClick={inputSearchName} />
                            <input type="text" id="searchInputName" className="text-black text-xs rounded-full" />
                        </div>
                    </th>
                    <th key="column2" className="w-1/4">
                        <div>Date/Time</div>
                        <div className="flex items-center justify-center">
                            <img src="images/up.png" className="h-4 mr-1" onClick={AscendingSortFunctionDate} />
                            <img src="images/down.png" className="h-4 mt-1 mb-1" onClick={DescendingSortFunctionDate} />
                        </div>
                    </th>
                    <th key="column4" className="w-1/4">
                        <div>Size</div>
                        <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            <img src="images/up.png" className="h-4 mr-1" onClick={AscendingSortFunctionSize} />
                            <img src="images/down.png" className="h-4 mt-1 mb-1" onClick={DescendingSortFunctionSize} />
                        </div>
                        </div>
                    </th>
                </thead>
                    {contenuDisplay(tableauContenu)}
            </table>
            <Footer /> 
            
        </div>
    );
};
export default UpdatesPage;