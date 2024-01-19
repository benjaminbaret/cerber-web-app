import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";
import PopUpDeploy from "../component/popupdeploy/page";

const DeploymentPage = () => {
    return (
        <div>
            <Navbar currentPage="deployment" />
            <div className="container mx-auto px-4 flex justify-center items-center">
            <PopUpDeploy/>
            </div>
            <h1>Welcome to the deployment!</h1>

            <Footer /> 
        </div>
    );
};

export default DeploymentPage;