"use client"
import React from "react";
import Link from "next/link";
import Cookies from 'js-cookie';
import UsernameDisplay from "./username";

const Navbar: React.FC<{ currentPage: string }> = ({ currentPage }) => {
    function logout() {
        Cookies.set('id', '');
        Cookies.set('username', '');
        window.location.href = 'http://localhost:3000/dashboard';
    }
    return (
        <>
            <div className="fixed top-0 w-full h-20 bg-darkPurple z-50 sticky">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <a href="/dashboard"><img
                                src="images/cerber-logo-white.png"
                                className="h-20"
                                alt="Logo"
                            /> </a>
                        </div>
                        <ul className="hidden md:flex gap-x-20 text-white">
                            <li>
                                <Link href="/dashboard">
                                    <p className={currentPage === "dashboard" ? "text-yellow-500" : ""}>DASHBOARD</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/devices">
                                    <p className={currentPage === "devices" ? "text-yellow-500" : ""}>DEVICES</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates">
                                    <p className={currentPage === "updates" ? "text-yellow-500" : ""}>UPDATES</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/deployment">
                                    <p className={currentPage === "deployment" ? "text-yellow-500" : ""}>DEPLOYMENT</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/historic">
                                    <p className={currentPage === "historic" ? "text-yellow-500" : ""}>HISTORIC</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="text-center">
                            <div className="text-white">
                                {UsernameDisplay()}

                            </div>
                            <div>
                                <button
                                    onClick={logout} 
                                    className="text-white bg-transparent border border-white rounded px-1 py-0.5 text-xs"
                                >Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Navbar;
