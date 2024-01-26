"use client"

import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import Navbar from '../component/header/navbar';
import PopUpNewDevice from "../component/popupnewdevice/page";
import PopUpNewGroup from "../component/popupnewgroup/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";
import DisplayContent from "../component/displayContent/displayDevices";
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from "@mui/material/MenuItem";
import supabase from "../connexionDatabase/connectToDatabase";
import Cookies from "js-cookie";

const handleDelete = () => {
    console.log('delete command');
    //faire requette sql pour mise a jour page
};

const DevicesPage = () => {
    // Utilisez le state pour stocker les valeurs
    const [groupValue, setGroupValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [searchNameValue, setSearchNameValue] = useState('');
    const [softValue, setSoftValue] = useState('');
    const [lastUpdateValue, setLastUpdateValue] = useState('');
    const [checkboxTable, setCheckboxTable] = useState(['']);
    const [groupList, setGroupList] = useState(['']);
    const [groupName, setGroupName] = useState(['']);


    // Utilisez useEffect pour définir l'intervalle et mettre à jour les valeurs toutes les secondes

    useEffect(() => {
        displayGroups();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Mettez à jour les valeurs en fonction des éléments du DOM
            setGroupValue(changeGroup());
            setTypeValue(changeType());
            setStatusValue(changeStatus());
            setSearchNameValue(inputSearchName());
            setSoftValue(inputSearchSoft());
            setLastUpdateValue(inputSearchLastUpdate());
            setCheckboxTable(checkWhichBoxIsSelected());
        }, 600);

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

    const checkWhichBoxIsSelected=()=>{
        const checkboxes = document.querySelectorAll<HTMLInputElement>('[id^="select"]');
        const selectedIds = [];
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const checkboxId = checkbox.id.replace('select', '');
                if(checkboxId!="All"){
                    selectedIds.push(checkboxId);
                }
            }
        });
        return selectedIds;
    }

    const changeGroup = () => {
        const changeGroupElement = document.getElementById('inputGroup') as HTMLInputElement;
        return changeGroupElement ? changeGroupElement.value : '';
    };

    const displayGroups = async () => {
        try {
            const userId = Cookies.get('userIdCerberUpdate');

            const { data, error } = await supabase.from('devices').select('*').eq('userId', userId);
            if (error) {
                console.error('Erreur lors de la récupération des groupes :', error);
            }

            const allGroupNames = [];
            const allGroupIds = ['id','name'];
            for (const device of data) {
                const { data: data2, error: error2 } = await supabase.from('groups').select('name').eq('id', device.groupeId);
                console.log(data2)
                if (error2) {
                    console.error('Erreur lors de la récupération des groupes :', error2);
                }
                if (data2 && data2.length > 0) {
                    console.log(data2.name);
                    allGroupNames.push(data2[0].name);
                    allGroupIds.push(device.groupeId, data2[0].name);
                }
            }
            console.log(allGroupIds);
            setGroupName(allGroupIds);
            setGroupList(allGroupNames);
        } catch (error) {
            console.error('Erreur inattendue lors de la récupération des groupes :', error);
        }
    };

    const changeType = () => {
        const changeTypeElement = document.getElementById('searchInputType') as HTMLInputElement;
        return changeTypeElement ? changeTypeElement.value : '';
    };

    const changeStatus = () => {
        const changeStatusElement = document.getElementById('searchInputStatus') as HTMLInputElement;
        return changeStatusElement ? changeStatusElement.value : '';
    };

    const inputSearchName = () => {
        const inputSearchNameElement = document.getElementById('searchInputName') as HTMLInputElement;
        return inputSearchNameElement ? inputSearchNameElement.value : '';
    };
    const inputSearchSoft = () => {
        const inputSearchSoft = document.getElementById('searchInputSoft') as HTMLInputElement;
        return inputSearchSoft ? inputSearchSoft.value : '';
    };
    const inputSearchLastUpdate = () => {
        const inputSearchLastUpdate = document.getElementById('inputLastUpdate') as HTMLInputElement;
        return inputSearchLastUpdate ? inputSearchLastUpdate.value : '';
    };

    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-3 gap-5 ">
                    <PopUpNewDevice />
                    <PopUpNewGroup selectedCheckboxIds={checkboxTable} />
                    <PopUpDeleteDevice selectedCheckboxIds={checkboxTable}  />
                    {/*TODO integrer popup token*/}
                    {/*  */}
                </div>
            </div>
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center h-full relative ">
                    <thead className="h-16 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                    <tr className="w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <th key="column1" className="w-1/7">
                            <div>Select All</div>
                            <div className="flex items-center justify-center pt-2 pb-2">
                                <input onChange={selectAll} type="checkbox" id="selectAll" name="selectAll" />
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
                                    <SearchIcon fontSize="medium" className="h-5" />
                                    <input type="text" id="searchInputType" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                </div>
                            </div>
                        </th>
                        <th key="column5" className="w-1/7">
                            <div className="flex flex-col items-center justify-center ">
                                <div>Group</div>
                                <div className="flex items-center justify-center pt-2 pb-2">
                                    <select id="inputGroup" className="text-black text-xs rounded-full">
                                        <option value="all">All</option>
                                        {groupList.map((groupName) => (
                                            <option value={groupName}>
                                                {groupName}
                                            </option>
                                        ))}
                                        <option value="">[no group]</option>
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
                                    <SearchIcon fontSize="medium" className="h-5"/>
                                    <input type="text" id="inputLastUpdate" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px' }}/>
                                </div>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    {DisplayContent(groupValue, typeValue, statusValue, searchNameValue)}
                </table>
            </div>
            <Footer />
        </div>
    );
};
export default DevicesPage;