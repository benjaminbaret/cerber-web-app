import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20 bg-darkPurple sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div>
                        <img
                            src="./logo.png"  // Remplacez "/path/to/your/logo.png" par le chemin réel de votre logo
                            alt="Logo"
                            className="h-10 w-10"  // Ajustez la taille du logo selon vos besoins
                        />
                    </div>
                    <div className="flex justify-between items-center h-full">
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <Link href="/dashboard">
                                    <p>DASHBOARD</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/devices">
                                    <p>DEVICES</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates">
                                    <p>UPDATES</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/deployment">
                                    <p>DEPLOYMENT</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/historic">
                                    <p>HISTORIC</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;