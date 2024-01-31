"use client"
import Navbar from "../component/header/navbar";
import React, { useEffect, useState } from 'react';
import Footer from "../component/footer/footer";
import SearchIcon from '@mui/icons-material/Search';
import DisplayContent from "../component/displayContent/displayHistoric";
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import LinearProgress from '@mui/material/LinearProgress';

const HistoricPage = () => {

    return (
        <div className="bg-darkPurple text-white">
            <Navbar currentPage="historic" />
            <div id="pageContent" className="w-full bg-darkPurple text-white justify-between items-center min-h-screen">
                <table className="w-full mt-5 mb-6 justify-between items-center relative">
                    <thead className="h-16 top-20 w-full bg-darkPurple z-50 bg-intermediatePurple text-md">
                    <th key="column1" className="w-1/4">
                        <div>Device Name</div>
                        <div className="flex items-center justify-center">
                            <SearchIcon fontSize="medium" className="h-5" />
                            <input type="text" id="searchInputDeviceName" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft: '8px', marginRight: '8px' }} />
                        </div>
                    </th>
                    <th key="column2" className="w-1/4">
                        
                        <div>Update Name</div>
                        <div className="flex items-center justify-center">
                            <SearchIcon fontSize="medium" className="h-5" />
                            <input type="text" id="searchInputUpdateId" className="text-black text-xs rounded-full" style={{ paddingLeft: '8px', paddingRight: '8px', marginLeft: '8px', marginRight: '8px' }} />
                        </div>
                    </th>
                    <th key="column3" id="typeID" className="w-1/4">
                        <div>Type</div>
                        <select id="changeInputType" className="text-black text-xs rounded-full">
                            <option value="all">All</option>
                            <option value="rasp">rasp3457</option>
                            <option value="esp">esp32</option>
                        </select>
                    </th>
                    <th key="column4" className="w-1/4">
                                <div className="flex flex-col items-center justify-center">
                                    <div>Date/Time</div>
                                    <div className="flex items-center justify-center pt-2 pb-2">
                                        <button className="flex items-center" >
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <SouthIcon />
                                            </span>
                                        </button>
                                        <button className="flex items-center" >
                                            <span style={{ background: 'rgb(153, 27, 27)', padding: '4px', borderRadius: '50%', marginRight: '4px' }}>
                                                <NorthIcon />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </th>
                    </thead>
                    {DisplayContent()}
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default HistoricPage;