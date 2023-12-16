import { useEffect, useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Navbar from '../../components/Dashboard/MyAds/Navbar';
import AdsComp from '../../components/Dashboard/userAds';
import AdsTable from '../../components/Dashboard/MyAds.Table';
import { useNavigate } from 'react-router-dom';

import { MdChecklist } from 'react-icons/md';
import { CgMenuGridR } from 'react-icons/cg';
const MyAds = () => {
    const [showTable, setShowTable] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');
    useEffect(() => {
        if (token === null) {
            navigate('/login');
        }
    }, []);
    return (
        <div className="flex parent">
            <Sidebar />
            <div className="flex-1 my-body">
                <Navbar />
                <div className="flex justify-end mr-2">
                    <button
                        className="mt-2 mb-2 flex bg-primary-orange rounded p-[2px] text-white capitalize hover:bg-secondary-orange transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => {
                            setShowTable(!showTable);
                        }}
                    >
                        {showTable ? <MdChecklist size="40" /> : <CgMenuGridR size="40" />}
                    </button>
                </div>

                {!showTable && <AdsComp />}
                {showTable && <AdsTable />}
            </div>
        </div>
    );
};

export default MyAds;
