import Navbar from "../component/header/navbar";

const devicesPage = () => {
    return (
        <div>
            <Navbar currentPage="devices" />
            <div className="container mx-auto px-4">
                <h1>Welcome to the Devices!</h1>
            </div>
        </div>
    );
};

export default devicesPage;