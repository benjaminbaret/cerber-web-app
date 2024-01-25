"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import SearchIcon from '@mui/icons-material/Search';
import DisplayContent from "../component/displayContent/displayHistoric";

const HistoricPage = () => {
    // Utilisez le state pour stocker les valeurs
    const [statusValue, setStatusValue] = useState('');
    const[deviceNameValue, setDeviceNameValue] = useState('');
    const[updateIdValue, setUpdateIdValue] = useState('');
    const[groupNameValue, setGroupNameValue] = useState('');
    const[typeValue, setTypeValue] = useState('');

    // Utilisez useEffect pour définir l'intervalle et mettre à jour les valeurs toutes les secondes
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Mettez à jour les valeurs en fonction des éléments du DOM
            setStatusValue(changeStatus());
            setDeviceNameValue(searchDeviceName());
            setUpdateIdValue(searchUpdateId());
            setGroupNameValue(changeGroupName());
            setTypeValue(changeType());
        }, 1000);

        // Nettoyez l'intervalle lorsque le composant est démonté
        return () => clearInterval(intervalId);
    }, []);

    const changeStatus = () => {
        const changeStatusElement = document.getElementById('changeInputStatus') as HTMLInputElement;
        return changeStatusElement ? changeStatusElement.value : '';
    };

    const searchDeviceName = () => {
        const inputSearchDeviceNameElement = document.getElementById('searchInputDeviceName') as HTMLInputElement;
        return inputSearchDeviceNameElement ? inputSearchDeviceNameElement.value : '';
    };

    const searchUpdateId = () => {
        const inputSearchUpdateIdElement = document.getElementById('searchInputUpdateId') as HTMLInputElement;
        return inputSearchUpdateIdElement ? inputSearchUpdateIdElement.value : '';
    };

    const changeGroupName = () => {
        const changeGroupNameElement = document.getElementById('changeInputGroupName') as HTMLInputElement;
        return changeGroupNameElement ? changeGroupNameElement.value : '';
    };

    const changeType = () => {
        const changeTypeElement = document.getElementById('changeInputType') as HTMLInputElement;
        return changeTypeElement ? changeTypeElement.value : '';
    };



    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="historic" />
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative">
                    <thead className="h-16 top-20 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <th key="column1" id="changeStatusID" className="w-1/4">
                            <div>Status</div>
                            <select onChange={changeStatus} id="changeInputStatus" className="text-black text-xs rounded-full ">
                                <option value="finish">Finish</option>
                                <option value="progress">In Progress</option>
                                <option value="abort">Abort</option>
                            </select>
                        </th>

                        <th key="column2" className="w-1/5">
                            <div>Device Name</div>
                            <div className="flex items-center justify-center">
                                <SearchIcon fontSize="medium" className="h-5" onClick={searchDeviceName}/>
                                <input type="text" id="searchInputDeviceName" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft: '8px', marginRight: '8px' }} />
                            </div>
                        </th>

                        <th key="column3" className="w-1/5">
                            <div>Update Name</div>
                            <div className="flex items-center justify-center">
                                <SearchIcon fontSize="medium" className="h-5" onClick={searchUpdateId}/>
                                <input type="text" id="searchInputUpdateId" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft: '8px', marginRight: '8px' }} />
                            </div>
                        </th>

                        <th key="column4" id="groupNameID" className="w-1/4">
                            <div>Group</div>
                            <select onChange={changeGroupName} id="changeInputGroupName" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="2">Group2</option>
                                <option value="3">Group3</option>
                            </select>
                        </th>

                        <th key="column5" id="typeID" className="w-1/4">
                            <div>Type</div>
                            <select onChange={changeType} id="changeInputType" className="text-black text-xs rounded-full">
                                <option value="all">All</option>
                                <option value="rasp">rasp3457</option>
                                <option value="esp">esp32</option>
                            </select>
                        </th>

                    </thead>
                    {DisplayContent(statusValue, deviceNameValue, updateIdValue, groupNameValue, typeValue)}
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default HistoricPage;