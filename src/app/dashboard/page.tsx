"use client"
import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import Link from "next/link";
import StraightIcon from '@mui/icons-material/Straight';
import WarningIcon from '@mui/icons-material/Warning';

const DashboardPage = () => {
    return (
        <div>
            <Navbar currentPage="dashboard" />
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center h-full">
                <div id="devicesDeploymentGroup" className="flex">
                    <div id="devicesDeployment" className="w-full" >
                        <div id="devices" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 m-3">
                            <div id="title1" className="flex">
                                <StraightIcon fontSize="small"/>
                                <h1>DEVICES</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="acceptedDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Accepted</h3>
                                    <p className="text-3xl text-yellow-500 text-right">10</p>
                                </div>
                                <div id="pendingDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Pending</h3>
                                    <p className="text-3xl text-yellow-500 text-right">9</p>
                                </div>
                            </div>
                        </div>
                        <div id="deployment" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 m-3">
                            <div id="title1" className="flex">
                                <StraightIcon fontSize="small"/>
                                <h1>DEPLOYMENT</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="DeploymentProgress" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>In Progress</h3>
                                    <p className="text-3xl text-yellow-500 text-right">10</p>
                                </div>
                                <div id="pendingDeployment" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Pending</h3>
                                    <p className="text-3xl text-yellow-500 text-right">90</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="group" className="m-3 mr-3 ml-6 bg-intermediatePurple bg-opacity-30 rounded-md flex pt-1 w-full">
                        <div id="title1" className="flex">
                            <StraightIcon fontSize="small"/>
                            <h1>GROUP</h1>
                            </div>
                    
                    <div className='flex items-center justify-center text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#FFFFFF'}}>
                        <PieChart 
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'series A', color:'#C80000'},
                                            { id: 1, value: 15, label: 'series B', color:'#FAC818'},
                                            { id: 2, value: 20, label: 'series C', color:'#DB5E21' },
                                            { id: 3, value: 40, label: 'series D', color:'#64001B' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
                <div id="errors" className="p-3 m-3 bg-intermediatePurple bg-opacity-30 rounded-md pt-1 ">
                    <div id="title1" className="flex">
                        <StraightIcon fontSize="small"/>
                        <h1>ERRORS</h1>
                    </div>
                    <div className="p-3 m-3">
                        <div id="acceptedDevices" className="flex w-full bg-intermediatePurple bg-opacity-100 p-2 rounded-md items-center">
                        <WarningIcon className="ml-1" sx={{ color: "#FAC818" }} fontSize="large"/>                            
                        <div className="ml-3">
                                <p className="text-lg">L'erreur est la suivante et elle nous embête pas mal parce que c'est galère</p>
                                <p className="ml-2 text-xs">fghjklkjhgfdsfghjk</p>
                            </div>
                        </div>
                        <Link href="/deployment" className="text-xs text-blue-600 underline ml-3">
                                <p>+more</p>
                            </Link>
                    </div>
                </div>

                <div id="Historic" className=" p-3 m-3 pt-1 bg-intermediatePurple bg-opacity-30 rounded-md pt-1 pb-1">
                    <div id="title1" className="flex">
                    <StraightIcon fontSize="small"/>
                        <h1>LATEST UPDATE</h1>
                    </div>
                    <div className="p-3 m-3 ">
                        <div id="acceptedDevices" className="flex w-full bg-intermediatePurple bg-opacity-100 p-2 rounded-md items-center ">
                            <div className="ml-3">
                                <p className="text-lg">RaspberryPi5 Update 12.01</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer /> 
            </div>
        </div>
    );
};
export default DashboardPage;
