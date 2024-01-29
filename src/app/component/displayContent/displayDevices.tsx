"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const DisplayContent = (changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue) => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [groupNames, setGroupNames] = useState([]);

    const fetchGroupNames = async () => {
        const names = [];
        if (data) {
            for (const device of data) {
                try {
                    const { data: groupData, error } = await supabase.from('groups').select('*').eq('id', device.groupeId);
                    if (error) {
                        console.error("Error fetching group name:", error);
                        names.push("Erreur de récupération");
                    } else {
                        names.push(groupData[0]?.name || "Nom non trouvé");
                    }
                } catch (error) {
                    console.error("Error fetching group name:", error);
                    names.push("Erreur de récupération");
                }
            }
            setGroupNames(names);
        }
    };

    useEffect(() => {
        fetchGroupNames();
    }, [data]);

    const fillTableau2D =  (changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue) => {
        const tableau2D = [];
        if (inputSearchNameValue && inputSearchNameValue !== '') {
            tableau2D.push(['name', inputSearchNameValue]);
        } else {
            tableau2D.push(['name', '']);
        }
        if (changeTypeValue && changeTypeValue !== 'all' && changeTypeValue !== '') {
            tableau2D.push(['type', changeTypeValue]);
        } else {
            tableau2D.push(['type', '']);
        }
        if (changeGroupValue && changeGroupValue !== 'all') {
            tableau2D.push(['group', '']);
        } else {
            tableau2D.push(['group', '']);
        }
        if (changeStatusValue && changeStatusValue !== 'all' && changeStatusValue !== '') {
            tableau2D.push(['deviceStatus', changeStatusValue]);
        } else {
            tableau2D.push(['deviceStatus', '']);
        }
        console.log("tableau2D");
        console.log(tableau2D);
        return tableau2D;
    };

    useEffect(() => {
        const fetchData = async () => {
            const SQLRequest = fillTableau2D(changeGroupValue,changeTypeValue,changeStatusValue,inputSearchNameValue);
            try {
                const userId = Cookies.get('userIdCerberUpdate');
                let query = supabase.from('devices').select('*').eq('userId',userId);
                for (const condition of SQLRequest) {
                    if (condition[1] !== "") {
                        query = query.eq(condition[0], condition[1]);
                    }
                }
                const { data, error } = await query;
                if (error) {
                    setError(error);
                } else {
                    setData(data);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue]);

    const check = () => {
        const inputElement = document.getElementById('selectAll') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = false;
        }
    };

    const processUpdate = (updatedAt: string, status: string) => {
        const now = new Date();
        const updatedTimeDate = new Date(updatedAt);
        const timeDifference = now.getTime() - updatedTimeDate.getTime();

        if (status === "pending") {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'grey' }} />;
        }
        else if (status == "online" && timeDifference < 6000) {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'green' }} />;
        }
        else {
            return <CircleIcon fontSize="small" className="h-6" style={{ color: 'red' }} />;
        }
    };

    return (
        <tbody>
        {data?.map((device, index) => (
            // eslint-disable-next-line react/jsx-key
            <tr className="relative" key={device.id}>
                <td className="text-center w-1/7">
                    <input type="checkbox" onChange={check} id={"select" + device.id} name={"select" + device.id} />
                </td>
                <td id={"Status" + device.id} className="pb-3 pt-3 flex items-center justify-center text-center w-1/7">
                    {processUpdate(device.updatedAt, device.deviceStatus)}
                </td>
                <td className="text-center w-1/7">
                    {device.name}
                </td>
                <td className="text-center w-1/7">
                    {device.type}
                </td>
                <td className="text-center w-1/7">
                    {groupNames[index] || "Chargement en cours..."}
                </td>
                <td className="text-center w-1/7">
                    Original
                </td>
                <td className="text-center w-1/7">
                    {device.updatedAt}
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
export default DisplayContent;