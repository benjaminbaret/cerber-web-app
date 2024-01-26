"use client";
import CircleIcon from '@mui/icons-material/Circle';

import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import { PostgrestClient, PostgrestSingleResponse } from '@supabase/postgrest-js';




const DisplayContent = (changeStatusValue, searchDeviceNameValue, searchUpdateIdValue, changeGroupNameValue, changeTypeValue) => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    const fillTableau2D = (changeStatusValue, searchDeviceNameValue, searchUpdateIdValue, changeGroupNameValue, changeTypeValue) => {
        const tableau2D = [];

        if (changeStatusValue && changeStatusValue !== 'all' && changeStatusValue !== '') {
            tableau2D.push(['status', changeStatusValue]);
        } else {
            tableau2D.push(['status', '']);
        }

        if (searchDeviceNameValue && searchDeviceNameValue !== '') {
            tableau2D.push(['device name', searchDeviceNameValue]);
        } else {
            tableau2D.push(['device name', '']);
        }

        if (searchUpdateIdValue && searchUpdateIdValue !== '') {
            tableau2D.push(['update Id', searchUpdateIdValue]);
        } else {
            tableau2D.push(['update Id', '']);
        }

        if (changeGroupNameValue && changeGroupNameValue !== 'all' && changeGroupNameValue !== '') {
            tableau2D.push(['group name', changeGroupNameValue]);
        } else {
            tableau2D.push(['group name', '']);
        }

        if (changeTypeValue && changeTypeValue !== 'all' && changeTypeValue !== '') {
            tableau2D.push(['type', changeTypeValue]);
        } else {
            tableau2D.push(['type', '']);
        }
        return tableau2D;
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data, error } = await supabase.from('deployments').select('*,updates(name),groups(name), devices(updateStatus,type,name)'); //Data en local
                setData(data);

            } catch (error) {
                setError(error);
            }
        };
        fetchData();

    }, [changeStatusValue, searchDeviceNameValue, searchUpdateIdValue, changeGroupNameValue, changeTypeValue]);


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
        {data?.map((deployment) => (
            // eslint-disable-next-line react/jsx-key

            <tr className="relative" key={deployment.id}>
                <td className="text-center w-1/5">
                    {deployment.devices.updateStatus == "Done" ? deployment.devices.updateStatus : ""}
                </td>

                <td className="text-center w-1/5">
                    {deployment.devices.updateStatus == "Done" ? deployment.devices.name : ""}
                </td>

                <td className="text-center w-1/5">
                    {deployment.devices.updateStatus == "Done" ? deployment.updates.name : ""}
                </td>

                <td className="text-center w-1/5">
                    {deployment.devices.updateStatus == "Done" && deployment.groupId ? deployment.groups.name : ""}

                </td>

                <td className="text-center w-1/5">
                    {deployment.devices.updateStatus == "Done" ? deployment.devices.type : ""}
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