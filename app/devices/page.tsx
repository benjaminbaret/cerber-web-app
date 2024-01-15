import Navbar from "../component/header/navbar";

const devicesPage = () => {
    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="devices" />
            <div>
                <div className="flex justify-center items-center">
                    <button className="bg-rose-800 bg-opacity-75 text-white px-6 py-3 rounded mr-16">New Device</button>
                    <button className="bg-rose-800  bg-opacity-75 text-white px-6 py-3 rounded mr-16">New Group</button>
                    <button className="bg-rose-800 bg-opacity-75 text-white px-6 py-3 rounded">Delete</button>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <h1>Welcome to the Devices!</h1>
            </div>
        </div>
    );
};

export default devicesPage;