import Navbar from "../component/header/navbar";

const UpdatesPage = () => {
    return (
        <div>
            <Navbar currentPage="updates" />
            <div className="container mx-auto px-4">
                <h1>Welcome to the Updates!</h1>
            </div>
        </div>
    );
};

export default UpdatesPage;