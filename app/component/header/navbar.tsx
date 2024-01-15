"use client"
import React from "react";
import Link from "next/link";

const Navbar = ({ currentPage }) => {
    function logout() {
        console.log("okokok");
    }

    return (
        <>
            <div className="w-full h-20 bg-darkPurple sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div>
                            <img
                                src="cerber-logo-white.png"
                                className="h-20"
                                alt="Logo"
                            />
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
                        <div>
                            <div className="text-white">
                                <p>Bonjour, BLABLA</p>
                            </div>
                            <div>
                                <button 
                                    onClick={logout} 
                                    className="text-white bg-transparent border border-white px-3 py-1 rounded"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
