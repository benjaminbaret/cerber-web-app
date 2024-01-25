"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';


const DisplayContent = (changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue) => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);
    const fillTableau2D = (changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue) => {

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
        if (changeGroupValue && changeGroupValue !== 'all' && changeGroupValue !== '') {
            tableau2D.push(['group', changeGroupValue]);
        } else {
            tableau2D.push(['group', '']);
        }

        if (changeStatusValue && changeStatusValue !== 'all' && changeStatusValue !== '') {
            tableau2D.push(['deviceStatus', changeStatusValue]);
        } else {
            tableau2D.push(['deviceStatus', '']);
        }
        return tableau2D;
    };

    useEffect(() => {
        const fetchData = async () => {
            const SQLRequest = fillTableau2D(changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue);
            console.log(SQLRequest);
            try {

                const { data, error } = await supabase.from('devices').select('*,groups(name)'); //Data en local

                setData(data);

            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [changeGroupValue, changeTypeValue, changeStatusValue, inputSearchNameValue]);

    if (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }

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
        {data?.map((device) => (
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
                    {device.groupeId ? device.groups.name : 'N/A'}
                </td>
                <td className="text-center w-1/7">
                    Original
                </td>
                <td className="text-center w-1/7">
                    {/*TODO RECUPERER CELA*/}
                    Last Update
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