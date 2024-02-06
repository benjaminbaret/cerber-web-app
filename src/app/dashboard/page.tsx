"use client"
import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import Link from "next/link";
import StraightIcon from '@mui/icons-material/Straight';
import WarningIcon from '@mui/icons-material/Warning';
import { useEffect, useState } from "react";
import supabase from '../connexionDatabase/connectToDatabase';
import Cookies from 'js-cookie';


const DashboardPage = () => {

    const [countDevices, setDevices] = useState<any[] | null>(null);
    const [countPendingDevices, setPendingDevices] = useState<any | null>(null);
    const [countDeploymentInProgress, setDeploymentInProgress] = useState<any | null>(null);
    const [countDeploymentDone, setDeploymentDone] = useState<any | null>(null);
    const [dataDevices, setDataDevices] = useState<any[] | null>(null);
    const [countDeviceOnline, setCountDeviceOnline] = useState<any | null>(null);
    const [countDeviceOffline, setCountDeviceOffline] = useState<any | null>(null);
    const [getLastUpdate, setLastUpdate] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);

        const fetchData = async () => {
            const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
            const userId = parseInt(userIdString as string, 10);

            try {
                const { count: countDevices, error } = await supabase
                    .from('devices')
                    .select('count', { count: 'exact' })
                    .eq('userId', userId);


                const { count: countPendingDevices, error :errorPending } = await supabase.from('devices').select('count', { count: 'exact' }).eq('userId', userId).eq('deviceStatus', 'pending');


                const { data: dataDeviceId, error: errorPendingDeployment } = await supabase.from('devices').select('*').eq('userId', userId);
                // 
                const deviceId = dataDeviceId?.map((device) => device.id);

                const {count : countDeploymentInProgress, error : errorDeploymentInProgress} = await supabase.from('deployments').select('count', { count: 'exact' }).eq('status', true).in('deviceId', deviceId);

                const {count : countDeploymentDone, error : errorDeploymentDone} = await supabase.from('deployments').select('count', { count: 'exact' }).eq('status', false).in('deviceId', deviceId);

                const {data : dataDevices, error : errorDeviceOnline} = await supabase.from('devices').select('*').eq('userId', userId).eq('deviceStatus', 'online');

                const {data : getLastUpdate, error : errorLastUpdate} = await supabase
                .from('deployments')
                .select('*,updates(name),groups(*), devices(*)')
                .eq('status', false)
                .in('deviceId', deviceId)
                .order('id', { ascending: false }) // Tri décroissant par ID
                .limit(1); // Limite à 1 résultat
                
                setLastUpdate(getLastUpdate);
            
                setDataDevices(dataDevices);

                let countOnline = 0;
                let countOffline = 0;
                dataDevices?.map((device) => {
                const now  = new Date();
                const updatedAt = new Date(device.updatedAt);
                console.log(updatedAt);
                const oneHourAgo = new Date(now);
                console.log("heure "+ oneHourAgo);
                oneHourAgo.setHours(oneHourAgo.getHours() - 1);
                console.log("heure -1 "+ oneHourAgo);
                const timeDifference = oneHourAgo.getTime() - updatedAt.getTime();
                console.log(timeDifference);
                if(timeDifference < 12000){
                    countOnline++;
                }
                else{
                    countOffline++;
                }
                });
                setCountDeviceOnline(countOnline);
                setCountDeviceOffline(countOffline);

                if (errorDeploymentDone) {
                    setError(errorDeploymentDone);
                }
                else{
                    setDeploymentDone(countDeploymentDone);
                }


                if (errorDeploymentInProgress) {
                    setError(errorDeploymentInProgress);
                }
                else{
                    setDeploymentInProgress(countDeploymentInProgress);
                }

                if (errorPending) {
                    setError(errorPending);
                }
                else {
                    setPendingDevices(countPendingDevices);
                }

                if (error) {
                    setError(error);
                } else {
                    setDevices(countDevices);
                }
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
            }, 250);
    
            // Nettoyer l'intervalle lorsque le composant est démonté
            return () => {
                clearInterval(intervalId);
            };
    }, []);

    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="dashboard" />
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <div id="devicesDeploymentGroup" className="flex">
                    <div id="devicesDeployment" className="w-full" >
                        <div id="devices" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 m-3">
                            <div id="title1" className="flex">
                                <StraightIcon fontSize="small" />
                                <h1>DEVICES</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="acceptedDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Accepted</h3>
                                    {countDevices !== null ? (
                                        <p className="text-3xl text-yellow-500 text-right">{countDevices}</p>
                                    ) : (
                                        <p className="text-3xl text-white-500 text-right">Loading...</p>
                                    )}
                                </div>
                                <div id="pendingDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Pending</h3>
                                    {countPendingDevices !== null ? (
                                        <p className="text-3xl text-yellow-500 text-right">{countPendingDevices}</p>
                                    ) : (
                                        <p className="text-3xl text-white-500 text-right">Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="deployment" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 m-3">
                            <div id="title1" className="flex">
                                <StraightIcon fontSize="small" />
                                <h1>DEPLOYMENT</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="DeploymentProgress" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>In Progress</h3>
                                    {countDeploymentInProgress !== null ? (
                                        <p className="text-3xl text-yellow-500 text-right">{countDeploymentInProgress}</p>
                                    ) : (
                                        <p className="text-3xl text-white-500 text-right">Loading...</p>
                                    )}
                                </div>
                                <div id="pendingDeployment" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Done</h3>
                                    {countDeploymentDone !== null ? (
                                        <p className="text-3xl text-yellow-500 text-right">{countDeploymentDone}</p>
                                    ) : (
                                        <p className="text-3xl text-white-500 text-right">Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="group" className="m-3 mr-3 ml-6 bg-intermediatePurple bg-opacity-30 rounded-md flex pt-1 w-full">
                        <div id="title1" className="flex">
                            <StraightIcon fontSize="small" />
                            <h1>GROUP</h1>
                        </div>

                        <div className='flex items-center justify-center text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#FFFFFF' }}>
                            <div id="acceptedDevices" className="w-full bg-white bg-opacity-30 p-2 m-2 rounded-md">
                                <PieChart
                                    
                                    series={[
                                        {
                                            data: [
                                                { id: 0, value: countDeviceOnline, label: 'Device online', color: '#FAC818' },
                                                { id: 1, value: countDeviceOffline, label: 'Device offline', color: '#DB5E21' },
                                            ],
                                        },
                                    ]}
                                    width={400}
                                    height={200}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div id="errors" className="p-3 m-3 bg-intermediatePurple bg-opacity-30 rounded-md pt-1 ">
                    <div id="title1" className="flex">
                        <StraightIcon fontSize="small" />
                        <h1>ERRORS</h1>
                    </div>
                    <div className="p-3 m-3">
                        <div id="acceptedDevices" className="flex w-full bg-intermediatePurple bg-opacity-100 p-2 rounded-md items-center">
                            <WarningIcon className="ml-1" sx={{ color: "#FAC818" }} fontSize="large" />
                            <div className="ml-3">
                                <p className="text-lg">Un error occured during update</p>
                                <p className="ml-2 text-xs">Error code -402 </p>
                            </div>
                        </div>
                        <Link href="/deployment" className="text-xs text-blue-600 underline ml-3">
                            <p>+more</p>
                        </Link>
                    </div>
                </div>

                <div id="Historic" className=" p-3 m-3 pt-1 bg-intermediatePurple bg-opacity-30 rounded-md pt-1 pb-1">
                    <div id="title1" className="flex">
                        <StraightIcon fontSize="small" />
                        <h1>LATEST UPDATE</h1>
                    </div>
                    <div className="p-3 m-3 ">
                        <div id="acceptedDevices" className="flex w-full bg-intermediatePurple bg-opacity-100 p-2 rounded-md items-center h-full">
                            <div className="ml-3">
                            <p className="text-lg">{getLastUpdate && getLastUpdate.length > 0 ? "Device : " + getLastUpdate[0].devices.name + " with " + getLastUpdate[0].updates.name: "No update"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
};
export default DashboardPage;
