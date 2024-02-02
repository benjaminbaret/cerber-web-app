"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpUpdates from "../component/popupupdates/page";
import PopUpDeleteUpdate from "../component/popupdeleteupdate/page";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../connexionDatabase/connectToDatabase';
import DisplayContent from "..//component/displayContent/displayUpdates";


const UpdatesPage = () => {
    // Utilisez le state pour stocker les valeurs
    const [softwareValue, setSoftwareValue] = useState('');
    const [datetimeAscValue, setDatetimeAscValue] = useState('');
    const [datetimeDescValue, setDatetimeDescValue] = useState('');
    const [sizeAscValue, setSizeAscValue] = useState('');
    const [sizeDescValue, setSizeDescValue] = useState('');
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
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = true;
                });

            } else {
                const elements = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
                elements.forEach((element) => {
                    element.checked = false;
                });
            }
        }
    };

    const checkWhichBoxIsSelected = () => {
        const checkboxes = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
        const selectedIds = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const checkboxId = checkbox.id.replace('select', '');
                if (checkboxId != "All") {
                    selectedIds.push(checkboxId);
                }
            }
        });
        return selectedIds;
    };

    return (

        <div className="bg-darkPurple text-white">
            <Navbar currentPage="updates" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-2 gap-5">
                    <PopUpUpdates />
                    <PopUpDeleteUpdate selectedCheckboxIds={checkboxTable} />
                </div>
            </div>

            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative ">
                    <thead className=" w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <tr className="w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                            <th key="column1" className="w-1/4" id="searchInputStatus">
                                <div>Select All</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll" />
                                </div>
                            </th>
                            <th key="column2" className="w-1/4">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Software</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <button className="flex items-center" >
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <SearchIcon />
                                            </span>
                                        </button>
                                        <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full"
                                            style={{ paddingLeft: '8px', paddingRight: '8px' }} />
                                    </div>
                                </div>
                            </th>
                            <th key="column3" className="w-1/4">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Date/Time</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <button className="flex items-center" >
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <SouthIcon />
                                            </span>
                                        </button>
                                        <button className="flex items-center" >
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
                                            <button className="flex items-center">
                                                <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                    <SouthIcon />
                                                </span>
                                            </button>
                                            <button className="flex items-center" >
                                                <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                    <NorthIcon />
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




