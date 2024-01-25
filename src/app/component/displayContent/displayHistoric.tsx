"use client";
import CircleIcon from '@mui/icons-material/Circle';
import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';


const DisplayContent = (changeStatusValue, searchDeviceNameValue, searchUpdateIdValue, changeGroupNameValue, changeTypeValue) => {
    ///TODO gerer les online offline
    const [data, setData] = useState<any[] | null>(null);
    const [error, setError] = useState<any | null>(null);

    const fillTableau2D = (changeStatusValue, searchDeviceNameValue, searchUpdateIdValue, changeGroupNameValue, changeTypeValue) => {
        const tableau2D = [];

        if (changeStatusValue && changeStatusValue !== 'all' && cchangeStatusValue !== '') {
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

        if (changeTypeValue && changeTypeValue !== 'all' && cchangeTypeValue !== '') {
            tableau2D.push(['type', changeTypeValue]);
        } else {
            tableau2D.push(['type', '']);
        }
        return tableau2D;
    };

    useEffect(() => {
        const fetchData = async () => {
            const SQLRequest = fillTableau2D(changeGroupValue,changeTypeValue,changeStatusValue,inputSearchNameValue);
            console.log(SQLRequest);
            try {
                let query = supabase.from('devices').select('*');
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