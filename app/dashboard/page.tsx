import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";

const DashboardPage = () => {
    return (
        <div>
            <Navbar />

            <div className="container mx-auto px-4">
                <h1>Welcome to the Dashboard!</h1>
            </div>

            <Footer /> 
        </div>
    );
};

export default DashboardPage;