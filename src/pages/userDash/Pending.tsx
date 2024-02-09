import { useState } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Navbar from '../../components/Dashboard/MyAds/Navbar';
import AdsComp from '../../components/Dashboard/PendingComp';
import AdsTable from '../../components/Dashboard/MyAds/Pending.table';

import { MdChecklist } from 'react-icons/md';
import { CgMenuGridR } from 'react-icons/cg';

const Pending = () => {
    const [showTable, setShowTable] = useState(false);
    return (
        <div className="flex parent max-w-[90rem] mx-auto">
            <Sidebar />
            <div className="flex-1  mx-auto my-body">
                <Navbar />
                <div className="flex justify-end mr-5">
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

export default Pending;
