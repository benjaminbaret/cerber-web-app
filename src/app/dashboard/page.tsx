"use client"
import Navbar from "../component/header/navbar";
import Footer from "../component/footer/footer";

const DashboardPage = () => {
    return (
        <div>
            <Navbar currentPage="dashboard" />
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center h-full">
                <div id="devicesDeploymentGroup" className="flex">
                    <div id="devicesDeployment" className="w-full" >
                        <div id="devices" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 m-3">
                            <div id="title1" className="flex">
                                <img src="images/up.png" className="h-4 mr-2" />
                                <h1>DEVICES</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="acceptedDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Accepted</h3>
                                    <p className="text-3xl text-yellow-500 text-right">10</p>
                                </div>
                                <div id="pendingDevices" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Pending</h3>
                                    <p className="text-3xl text-yellow-500 text-right">90</p>
                                </div>
                            </div>
                        </div>
                        <div id="deployment" className="w-full bg-intermediatePurple bg-opacity-30 rounded-md m-3">
                            <div id="title1" className="flex">
                                <img src="images/up.png" className="h-4 mr-2" />
                                <h1>DEPLOYMENT</h1>
                            </div>
                            <div className="flex p-2">
                                <div id="DeploymentProgress" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>In Progress</h3>
                                    <p className="text-3xl text-yellow-500 text-right">10</p>
                                </div>
                                <div id="pendingDeployment" className="w-full bg-intermediatePurple bg-opacity-100 p-2 m-2 rounded-md">
                                    <h3>Pending</h3>
                                    <p className="text-3xl text-yellow-500 text-right">90</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="group" className="m-3 mr-3 ml-6 bg-intermediatePurple bg-opacity-30 rounded-md flex w-full">
                        <div id="title1" className="flex">
                            <img src="images/up.png" className="h-4 mr-2" />
                            <h1>GROUP</h1>
                        </div>
                    </div>
                </div>
                <div id="errors" className=" ml-3 w-full bg-intermediatePurple bg-opacity-30 rounded-md pt-1 pb-1">
                    <div id="title1" className="flex">
                        <img src="images/up.png" className="h-4 mr-2" />
                        <h1>ERRORS</h1>
                    </div>
                    <div className="p-2 m-2">
                        <div id="acceptedDevices" className="flex w-full bg-intermediatePurple bg-opacity-100 p-2 rounded-md items-center">
                            <img src="images/attention.png" className="h-16 items-center"/>
                            <div className="ml-3">
                                <p className="text-lg">L'erreur est la suivante et elle nous embête pas mal parce que c'est galère</p>
                                <p className="ml-2 text-xs">fghjklkjhgfdsfghjk</p>
                            </div>
                        </div>
                        <p className="text-xs text-blue-600 underline ml-3">+more</p>
                    </div>
                </div>
            </div>
            <Footer /> 
        </div>
    );
};
export default DashboardPage;