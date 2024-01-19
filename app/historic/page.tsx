import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";


const HistoricPage = () => {
    return (
        <div>
            <Navbar currentPage="historic" />
            <div className="container mx-auto px-4">
                <h1>Welcome to the historic!</h1>
            </div>
            <Footer /> 
        </div>
    );
};

export default HistoricPage;