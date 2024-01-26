"use client"
import React from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import UsernameDisplay from "./username";   
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Navbar: React.FC<{ currentPage: string }> = ({ currentPage}) => {
    function logout() {
        Cookies.remove('userIdCerberUpdate');
        Cookies.remove('usernameCerberUpdate');
        window.location.href = 'http://localhost:3000';
    }
    
    return (
        <>
            <div className=" top-0 w-full h-20 bg-darkPurple z-50 sticky">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <a href="/dashboard"><img
                                src="images/cerber-logo-white.png"
                                className="h-20"
                                alt="Logo"
                            /> </a>
                        </div>

                        <div className="grid grid-cols-5 gap-12 text-white" >
                            <div>
                                <Link href="/dashboard" className={`flex justify-center ${currentPage === "dashboard" ? "hover:underline text-yellow-500" : "hover:underline"}`}>
                                    <p>DASHBOARD</p>
                                </Link>
                            </div>
                            <div>
                                <Link href="/devices" className={`flex justify-center ${currentPage === "devices" ? "hover:underline text-yellow-500" : "hover:underline"}`}>
                                    <p>DEVICES</p>
                                </Link>
                            </div>

                            <div>
                                <Link href="/updates" className={`flex justify-center ${currentPage === "updates" ? "hover:underline text-yellow-500" : "hover:underline"}`}>
                                    <p>UPDATES</p>
                                </Link>
                            </div>

                            <div>
                                <Link href="/deployment" className={`flex justify-center ${currentPage === "deployment" ? "hover:underline text-yellow-500" : "hover:underline"}`}>
                                    <p>DEPLOYMENT</p>
                                </Link>
                            </div>

                            <div>
                                <Link href="/historic" className={`flex justify-center ${currentPage === "historic" ? "hover:underline text-yellow-500" : "hover:underline"}`}>
                                    <p>HISTORIC</p>
                                </Link>
                            </div>

                            </div>
                        
                        <div className="text-center">
                            <div className="text-white">
                                <div className="text-white">
                                    <PermIdentityIcon className="mr-1 mb-1 items-center justify-center "/>
                                    {UsernameDisplay()}
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={logout} 
                                    className="text-white bg-transparent border border-white rounded px-1 py-0.5 text-xs">Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Navbar;
