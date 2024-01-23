"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpNewDevice from "../component/popupnewdevice/page";
import PopUpNewGroup from "../component/popupnewgroup/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";
import  displayContent from "../component/displayContent/displayDevices";
import SearchIcon from '@mui/icons-material/Search';

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

const devicesPage = () => {
    const changeSQLRequest = () => {
        let requeteSQL = ''; // Pas besoin de virgule ici
        let compteur = 0;
        const changeGroup = document.getElementById('inputGroup') as HTMLInputElement;
        const changeType = document.getElementById('searchInputType') as HTMLInputElement;
        const changeStatus = document.getElementById('searchInputStatus') as HTMLInputElement;
        const inputSearchName = document.getElementById('searchInputName') as HTMLInputElement;

        if (inputSearchName && inputSearchName.value !== '') {
            if (compteur === 0) {
                requeteSQL = requeteSQL + ".eq('name', '" + inputSearchName + "')";
                compteur++;
            } else {
                requeteSQL = requeteSQL + ".and('name', 'eq', '" + inputSearchName + "')";
            }
        }
        if (changeType && changeType.value !== '' && changeType.value !== 'all') {
            if (compteur === 0) {
                requeteSQL = requeteSQL + ".eq('type', '" + changeType + "')";
                compteur++;
            } else {
                requeteSQL = requeteSQL + ".and('type', 'eq', '" + changeType + "')";
            }
        }
        if (changeGroup && changeGroup.value !== '' && changeGroup.value !== 'all') {
            if (compteur === 0) {
                requeteSQL = requeteSQL + ".eq('group', '" + changeGroup.value + "')";
                compteur++;
            } else {
                requeteSQL = requeteSQL + ".and('group', 'eq', '" + changeGroup.value + "')";
            }
        }
        if (changeStatus && changeStatus.value !== '' && changeStatus.value !== 'all') {
            if (compteur === 0) {
                requeteSQL = requeteSQL + ".eq('deviceStatus', '" + changeStatus.value + "')";
                compteur++;
            } else {
                requeteSQL = requeteSQL + ".and('deviceStatus', 'eq', '" + changeStatus.value + "')";
            }
        }
        console.log(requeteSQL);
        return requeteSQL;
    }
    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-3 gap-5 ">
                    <PopUpNewDevice />
                    <PopUpNewGroup />
                    <PopUpDeleteDevice />
                </div>
            </div>
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center h-full relative ">
                    <thead className="h-16 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <tr className="w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                            <th key="column1" className="w-1/7"> 
                                <div>Select All</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll"/>
                                </div>
                            </th>
                            <th key="column2" className="w-1/7">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Status</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <select id="searchInputStatus" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column3" className="w-1/7">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Name</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" />
                                        <input type="text" id="searchInputName" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                    </div>
                                </div>
                            </th>
                            <th key="column4" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Type</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <select id="searchInputType" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="RaspberryPi">RaspberryPi</option>
                                            <option value="Esp82">Esp82</option>
                                            <option value="Esp32">Esp32</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column5" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Group</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <select id="inputGroup" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="group1">Option 1</option>
                                            <option value="group2">Option 2</option>
                                            <option value="group3">Option 2</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column6" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Software</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" />
                                        <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }} />
                                    </div>
                                </div>
                            </th>
                            <th key="column7" className="w-1/7">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Last Update</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" />
                                        <input type="text" id="inputLastUpdate" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {displayContent()}
                </table>
            </div>
        <Footer />     
    </div>
    );
};
export default devicesPage;
