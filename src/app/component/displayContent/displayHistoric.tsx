"use client";
import CircleIcon from '@mui/icons-material/Circle';

import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import { PostgrestClient, PostgrestSingleResponse } from '@supabase/postgrest-js';
import Cookies from "js-cookie";




const DisplayContent = () => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);



        const fetchData = async () => {

            try {
                const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
                const userId = parseInt(userIdString as string, 10);
                //const { data, error } = await supabase.from('deployments').select('*,updates(name),groups(name), devices(updateStatus,type,name)').eq('userId',userId); //Data en local
                const { data, error } = await supabase.from('devices').select('id').eq('userId', userId);
                const deviceId = data?.map((device) => device.id);

                const { data: deploymentData, error: error2 } = await supabase
                    .from('deployments')
                    .select('*,updates(name),groups(*), devices(*)')
                    .eq('status', false)  // Ajoutez cette ligne pour filtrer par la condition status == true
                    .in('deviceId', deviceId);

                setData(deploymentData);

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
                        <td className="text-center w-1/4">
                            {deployment.devices.name}

                        </td>

                        <td className="text-center w-1/4">
                            {deployment.updates.name}

                        </td>

                        <td className="text-center w-1/4">
                            {deployment.devices.type}

                        </td>

                        <td className="text-center w-1/4">
                            {deployment.updatedAt}

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