import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";
import PopUpUpdates from "../component/popupupdates/page";
import PopUpDeleteDevice from "../component/popupdeletedevice/page";

const UpdatesPage = () => {
    return (
        <div>
            <Navbar currentPage="updates" />
            <div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-10" >
                    <PopUpUpdates/>
                    <PopUpDeleteDevice/>
                </div>
            </div>
                <h1>Welcome to the Updates!</h1>
            </div>
            <Footer/>
        </div>
    );
};

export default UpdatesPage;