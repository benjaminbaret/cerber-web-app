"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";


const DisplayContent = (inputSearchSoftwareValue: string, sortAscDatetimeValue: any, sortDescDatetimeValue: any, sortAscSizeValue: string, sortDescSizeValue: string) => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    const fillTableau2D = (inputSearchSoftwareValue: string, sortAscDatetimeValue: Date, sortDescDatetimeValue: Date, sortAscSizeValue: string, sortDescSizeValue: string) => {
        const tableau2D = [];

        if (inputSearchSoftwareValue && inputSearchSoftwareValue !== '') {
            tableau2D.push(['name', inputSearchSoftwareValue]);
        } else {
            tableau2D.push(['name', '']);
        }

        if (sortAscDatetimeValue) {
            tableau2D.push(['updatedAt', sortAscDatetimeValue]);
        } else if (sortDescDatetimeValue) {
            tableau2D.push(['updatedAt', sortDescDatetimeValue]);
        } else {
            tableau2D.push(['updatedAt', '']);
        }

        if (sortAscSizeValue) {
            tableau2D.push(['size', sortAscSizeValue]);
        } else if (sortDescSizeValue) {
            tableau2D.push(['size', sortDescSizeValue]);
        } else {
            tableau2D.push(['size', '']);
        }

        return tableau2D;
    };

    useEffect(() => {
        const fetchData = async () => {
            const SQLRequest = fillTableau2D(inputSearchSoftwareValue, sortAscDatetimeValue, sortDescDatetimeValue, sortAscSizeValue, sortDescSizeValue);
            console.log(SQLRequest);
            try {
                //selectionner les ids des updates de l'utilisateur
                //const userId = Cookies.get('userIdCerberUpdate');
                let query = supabase.from('updates').select('*')/*.eq('userId',userId)*/;
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
    }, [inputSearchSoftwareValue, sortAscDatetimeValue, sortDescDatetimeValue, sortAscSizeValue, sortDescSizeValue]);

    const check = () => {
        const inputElement = document.getElementById('selectAll') as HTMLInputElement;
        if (inputElement) {
            inputElement.checked = false;
        }
    };

    /* const processUpdate = (updatedAt: string, status: string) => {
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
     };*/

    if (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return null;
    }

    return (
        <tbody>
        {data?.map((update) => (
            // eslint-disable-next-line react/jsx-key
            <tr className="relative" key={update.id}>
                <td className="text-center w-1/7">
                    <input type="checkbox" onChange={check} id={"select" + update.id} name={"select" + update.id} />
                </td>
                <td className="text-center w-1/7">
                    {update.name}
                </td>
                <td className="text-center w-1/7">
                    {update.updatedAt}
                </td>
                <td className="text-center w-1/7">
                    {update.size}
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