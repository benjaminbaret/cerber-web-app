"use client";

import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';


const DisplayContent = () => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

        const fetchData = async () => {
            
            try {
                const { data, error } = await supabase.from('deployments').select('*,devices(*),updates(*),groups(*)').eq('status', true);
                setData(data);
            } catch (error) {
                setError(error);
            }
        };
        useEffect(() => {
            // Appeler fetchData immédiatement
            fetchData();
    
            // Mettre en place une boucle avec setInterval pour appeler fetchData toutes les 100ms
            const intervalId = setInterval(() => {
                fetchData();
            }, 50);
    
            // Nettoyer l'intervalle lorsque le composant est démonté
            return () => {
                clearInterval(intervalId);
            };
    
        }, []);


    return (
        <tbody>
            {data?.map((deployment) => (
                // eslint-disable-next-line react/jsx-key

                <tr className="relative" key={deployment.id}>
                    <td className="text-center w-1/5">
                    {deployment.devices.updateProgress}
                    </td>

                    <td className="text-center w-1/5">
                    {deployment.devices.name}
                    </td>

                    <td className="text-center w-1/5">
                    {deployment.updates.name}
                    </td>

                    <td className="text-center w-1/5">
                    {deployment.groupId ? deployment.groups.name : '/'}

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