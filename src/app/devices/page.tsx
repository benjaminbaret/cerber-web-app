"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpNewDevice from "../component/popupnewdevice/page";
import PopUpNewGroup from "../component/popupnewgroup/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";
import  displayContent from "../component/displayContent/display";
import SearchIcon from '@mui/icons-material/Search';

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
const inputSearchName = () => {
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
const inputSearchSoft = () => {
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
const inputSearchUpdate = () => {
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

const changeType=()=> {
    const inputElement = document.getElementById('searchInputType') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            //faire requette sql pour mise a jour page
            console.log(inputValue);
        }
    }
}
const changeGroup=()=> {
    const inputElement = document.getElementById('searchInputType') as HTMLInputElement;
    if (inputElement) {
        const inputValue = inputElement.value.trim();
        if (inputValue !== '') {
            //faire requette sql pour mise a jour page
            console.log(inputValue);
        }
    }
}

const devicesPage = () => {
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

            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center h-full">
                <table className="w-full mt-5 mb-6 justify-between items-center h-full relative">
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
                                        <select onChange={changeStatus} id="searchInputStatus" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="on">On</option>
                                            <option value="off">Off</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column3" className="w-1/7">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Name</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" onClick={inputSearchName} />
                                        <input type="text" id="searchInputName" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                    </div>
                                </div>
                            </th>
                            <th key="column4" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Type</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <select onChange={changeType} id="searchInputType" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column5" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Group</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <select onChange={changeGroup} id="inputGroup" className="text-black text-xs rounded-full">
                                            <option value="all">All</option>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                        </select>
                                    </div>
                                </div>
                            </th>
                            <th key="column6" className="w-1/7">
                                <div className="flex flex-col items-center justify-center ">
                                    <div>Software</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" onClick={inputSearchSoft} />
                                        <input type="text" id="searchInputSoft" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }} />
                                    </div>
                                </div>
                            </th>
                            <th key="column7" className="w-1/7">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Last Update</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <SearchIcon fontSize="medium" className="h-5" onClick={inputSearchUpdate} />
                                        <input type="text" id="inputLastUpdate" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {displayContent}
                </table>
                <Footer /> 
            </div>
        </div>
    );
};
export default devicesPage;
