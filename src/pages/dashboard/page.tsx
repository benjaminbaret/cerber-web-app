import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const DashboardPage = () => {
    return (
        <div>
            <Navbar currentPage="dashboard" />
            <div className="container mx-auto px-4">
                <h1>Welcome to the Dashboard!</h1>
            </div>

            <Footer /> 
        </div>
    );
};

export default DashboardPage;