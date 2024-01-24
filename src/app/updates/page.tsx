"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpUpdates from "../component/popupupdates/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../connexionDatabase/connectToDatabase';
import DisplayContent from "@/app/component/displayContent/displayUpdates";


const UpdatesPage = () => {
    // Utilisez le state pour stocker les valeurs
    const [softwareValue, setSoftwareValue] = useState('');
    const[datetimeAscValue, setDatetimeAscValue] = useState('');
    const[datetimeDescValue, setDatetimeDescValue] = useState('');
    const[sizeAscValue, setSizeAscValue] = useState('');
    const[sizeDescValue, setSizeDescValue] = useState('');

    // Utilisez useEffect pour définir l'intervalle et mettre à jour les valeurs toutes les secondes
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Mettez à jour les valeurs en fonction des éléments du DOM
            setSoftwareValue(inputSearchSoftware());
            setDatetimeAscValue(sortAscDatetime());
            setDatetimeDescValue(sortDescDatetime());
            setSizeAscValue(sortAscSize());
            setSizeAscValue(sortDescSize());
        }, 1000);

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

    const inputSearchSoftware = () => {
        const inputSearchSoftwareElement = document.getElementById('searchInputSoftware') as HTMLInputElement;
        return inputSearchSoftwareElement ? inputSearchSoftwareElement.value : '';
    };

    const sortAscDatetime = () => {
        const sortAscDatetimeElement = datetimeAscValue.slice().sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        setDatetimeAscValue(sortAscDatetimeElement);
    }

    const sortDescDatetime = () => {
        const sortDescDatetimeElement = datetimeDescValue.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setDatetimeDescValue(sortDescDatetimeElement);
    }

    const sortAscSize = () => {
        const sortAscSizeElement = sizeAscValue.slice().sort((a, b) => a.size - b.size);
        setSizeAscValue(sortAscSizeElement);
    };

    const sortDescSize = () => {
        const sortDescSizeElement = sizeDescValue.slice().sort((a, b) => b.size - a.size);
        setSizeDescValue(sortDescSizeElement);
    };

    return (

        <div className="bg-darkPurple text-white">

            <div>
                <Navbar currentPage="Updates" />
            </div>

            <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 gap-5">
                    <PopUpUpdates />
                    <PopUpDeleteDevice />
                </div>
            </div>

            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative ">
                    <thead className=" w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                    <tr>
                        <th key="column1" id="selectAllId" className="w-1/4">
                            <div className="flex flex-col items-center justify-center">
                                <div>Select All</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll" />
                                </div>
                            </div>
                        </th>
                        <th key="column2" className="w-1/4">
                            <div className="flex flex-col items-center justify-center">
                                <div>Software</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <button className="flex items-center" onClick={inputSearchSoftware}>
                                        <span style={{background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px'}}>
                                            <SearchIcon/>
                                        </span>
                                    </button>
                                    <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full"
                                           style={{paddingLeft: '8px', paddingRight: '8px'}}/>
                                </div>
                            </div>
                        </th>
                        <th key="column3" className="w-1/4">
                            <div className="flex flex-col items-center justify-center">
                                <div>Date/Time</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <button className="flex items-center" onClick={sortAscDatetime}>
                                        <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                            <SouthIcon />
                                        </span>
                                    </button>
                                    <button className="flex items-center" onClick={sortDescDatetime}>
                                        <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                            <NorthIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </th>
                        <th key="column4" className="w-1/4">
                            <div className="flex flex-col items-center justify-center">
                                <div>Size</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <div className="flex items-center justify-center">
                                        <button className="flex items-center" onClick={sortAscSize}>
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <SouthIcon/>
                                            </span>
                                        </button>
                                        <button className="flex items-center" onClick={sortDescSize}>
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <NorthIcon/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    {DisplayContent(softwareValue, datetimeAscValue, datetimeDescValue, sizeAscValue, sizeDescValue)}
                </table>
            </div>
            <Footer />
        </div>
    );

};

export default UpdatesPage;




