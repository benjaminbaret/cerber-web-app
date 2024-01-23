"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';

const DisplayContent = () => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from('devices').select('*');
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
    }, []);

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

    if (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }

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
                    {device.group ? device.group.name : 'N/A'}
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