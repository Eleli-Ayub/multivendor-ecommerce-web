import { useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Profile from '../../components/Dashboard/profile';
import { useNavigate } from 'react-router-dom';

const profile = () => {
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
            <div className="flex-1 p-5 mx-auto my-body">
                <Profile />
            </div>
        </div>
    );
};

export default profile;
