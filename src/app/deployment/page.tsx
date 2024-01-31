"use client"

import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";
import supabase from '../connexionDatabase/connectToDatabase';
import DisplayContent from "../component/displayContent/displayDeployment";


const DeploymentPage = () => {
 
    return (

        <div className="bg-darkPurple text-white">
            <Navbar currentPage="deployment" />
            <div className="w-full bg-darkPurple top-20 container flex justify-center items-center">
                <div className="grid grid-cols-1 gap-5 ">
                    <PopUpDeploy />
                </div>
            </div>
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative">
                    <thead className="h-16 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                        <th key="column1" id="progressbar" className="w-1/5">
                            <div>Progress</div>
                        </th>
                        <th key="column2" id="updateStatus" className="w-1/5">
                            <div>Status</div>
                        </th>
                        <th key="column3"id="devicename" className="w-1/5">
                            <div>Device Name</div>
                        </th>
                        <th key="column4" id="updatename" className="w-1/5">
                            <div>Update Name</div>
                        </th>
                        <th key="column5" id="groupname" className="w-1/5">
                            <div>Group Name</div>
                        </th>
                        
                    </thead>
                    {DisplayContent()}
                </table>
            </div>
            <Footer />
        </div>
    );
};
export default DeploymentPage;