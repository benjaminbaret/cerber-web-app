"use client";
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';

const DisplayContent = () => {
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from('update').select('*');
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