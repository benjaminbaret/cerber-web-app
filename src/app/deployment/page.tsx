import Navbar from "../component/header/navbar";

const DeploymentPage = () => {
    return (
        <div>
            <Navbar currentPage="deployment" />
            <div className="container mx-auto px-4">
                <h1>Welcome to the deployment!</h1>
            </div>
        </div>
    );
};

export default DeploymentPage;