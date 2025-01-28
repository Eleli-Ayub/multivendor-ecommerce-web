import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import { UpdattingOfUser } from '../../Redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../constants/loader';
import { Avatar } from '@mui/material';

type FormData = {
    firstname: string;
    middlename: string;
    lastname: string;
    location: string;
    phone: string;
    email: string;
    userimage: string;
};

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, isLoading } = useSelector((state: any) => state.auth);
    const userid = user?.userid;
    // const { isLoading } = useSelector((state: any) => state.loaders);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    const [formData, setFormData] = useState<FormData>({
        firstname: user?.firstname,
        middlename: user?.middlename,
        lastname: user?.lastname,
        location: user?.location,
        phone: user?.phone,
        email: user?.email,
        userimage: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(UpdattingOfUser({ userid, formData }));
        navigate('/');
        setIsEditing(false); // Toggle editing off after submission
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    // Function to handle user image upload
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            // Convert the new image to base64
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                const base64Data = result.split(',')[1]; // Get the base64 string after the comma
                setFormData((prevData) => ({
                    ...prevData,
                    userimage: base64Data,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex bg-slate-100 w-fit flex-col md:flex-row gap-7 md:gap-10 ">
            {/* linkings */}
            <div className="  h-full w-full p-7 pb-5 flex flex-col gap-2 capitalize">
                <div
                    className="price bg-primary-orange p-4 text-white"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>Account Settings</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                    onClick={() => navigate('/notifications')}
                >
                    <p>Notifications</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>Membership plan</p>
                </div>
                <div
                    className="price bg-white p-4 text-gray-500"
                    style={{ borderRadius: '0.25rem' }}
                >
                    <p>password and security</p>
                </div>

                {/* userpic */}
                <div className="flex flex-col bg-white p-5 gap-3 text-gray-500 price h-64 w-full mt-8 items-center justify-center " >

                    <Avatar src={` ${user?.userimage}`} className=" border h-48 w-48 border-primary-orange" />
                    <div className="text-center">
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                </div>

            </div>

            {/* userinfo */}
            <div className=" h-full w-full  flex-col p-5 pb-5 ">
                
                {/* more userInfo */}
                <div
                    className="mt-2 text-gray-500 bg-white p-4 w-96 h-3/4"
                    style={{ borderRadius: '0.25rem' }}
                >
                    
                    <form onSubmit={handleSubmit} className="my-form pb-5 pt-7 px-3">
                        <div className="flex flex-col gap-8">

                            <div className='flex gap-2 items-center'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="firstName">First Name:</label>
                                </div>
                               

                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            className="bg-gray-100 tracking-wider w-full h-10  p-2 rounded"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span className=''>{user?.firstname}</span>
                                    )}
                                </div>
                               
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />

                            <div className='flex gap-2'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="middleName">Middle Name:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="middlename"
                                            name="middlename"
                                            className="bg-gray-100 tracking-wider w-full h-10 p-2 rounded"
                                            value={formData.middlename}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.middlename}</span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />

                            <div className='flex gap-2'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="lastName">Last Name:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            className="bg-gray-100 tracking-wider h-10 w-full p-3 rounded"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.lastname}</span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />

                            <div className='flex gap-2'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="location">Location:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            className="bg-gray-100 tracking-wider h-10 w-full p-2 rounded"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.location}</span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />

                            <div className='flex gap-2'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="phone">Phone Number:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="bg-gray-100 tracking-wider h-10 w-full p-3 rounded"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.phone}</span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />

                            <div className='flex gap-1'>
                                <div className='font-bold w-full'>
                                    <label htmlFor="email">Email:</label>
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="bg-gray-100 tracking-wider h-10 w-fit p-2 rounded"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{user?.email}</span>
                                    )}
                                </div>
                            </div>
                            <hr className="border-t-2 border-gray-300 w-full" />
                            
                        </div>
                        {isEditing && (
                            <button
                                type="submit"
                                className="w-full bg-primary-orange font-bold hover:bg-secondary-orange transition-colors delay-300  p-3 rounded mt-5 text-white"
                            >
                                Save Changes
                            </button>
                        )}
                    </form>

                    <div className="text-center my-5">
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="bg-primary-orange font-bold p-3 text-white rounded hover:bg-secondary-orange transition-colors delay-300 "
                            >
                                Update your Info
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-primary-orange p-3 font-bold text-white rounded hover:bg-secondary-orange transition-colors delay-300 "
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
