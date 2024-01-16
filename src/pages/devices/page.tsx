"use client"

import Navbar from "../../components/navbar";

const handleDelete = () => {
    console.log('delete command');
};
const createnewgroup = () => {
    console.log('new group command');
};
const newdeviceadd = () => {
    console.log('new device command');
};


const devicesPage = () => {
    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div>
                <div className="flex justify-center items-center">
                    <button onClick={newdeviceadd} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="plus.png" className="h-6"/>
                        <p className="ml-2">New Device</p>
                    </button>
                    <button onClick={createnewgroup} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="plus.png" className="h-6"/>
                        <p className="ml-2">New Group</p>
                    </button>
                    <button onClick={handleDelete} className="flex items-center bg-intermediatePurple text-white rounded mr-16 h-12 w-35 p-2">
                        <img src="bin.png" className="h-6"/>
                        <p className="ml-2">Delete</p>
                    </button>
                </div>
            </div>

            
            <div className="container mx-auto px-4">
                <h1>Welcome to the Devices!</h1>
            </div>
        </div>
    );
};

export default devicesPage;