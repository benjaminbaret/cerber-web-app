"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";


const DisplayContent = () => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch devices
                const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
                const userId = parseInt(userIdString as string, 10);

                const { data: updateData, error: updateError } = await supabase
                    .from('updates')
                    .select('*')
                    .eq('userId', userId);

                if (updateError) {
                    console.error('Error fetching updates:', updateError.message);
                    return;
                }

                setData(updateData);
            } catch (err) {
                setError(err.message);
                console.error('Error:', err.message);
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