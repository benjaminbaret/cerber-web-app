import Navbar from "../component/header/navbar";

const DashboardPage = () => {
    return (
        <div>
            <Navbar />

            <div className="container mx-auto px-4">
                <h1>Welcome to the Dashboard!</h1>
            </div>
        </div>
    );
};

export default DashboardPage;