import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { ConfirmCode } from '../../Redux/hooks/user.actions'; // Import the appropriate action for confirming the code
import Loader from '../../constants/loader';

const ConfirmCodeForm: React.FC = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Call the function to confirm the code
        // const response = await ConfirmCode(code);
        setLoading(false);
        // console.log(response);
    };

    return (
        <div className="px-[5px] lg:px-0">
            <div className="w-full max-w-xl mx-auto bg-white rounded-lg ">
                {loading && <Loader />}
                <form className="  rounded px-4 lg:px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center">
                        {' '}
                        <p className="mb-4 text-sm text-black-main">
                            Please enter the confirmation code sent to your email address.
                        </p>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="code"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Confirmation Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter confirmation code"
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline items-center w-full"
                            type="submit"
                        >
                            Confirm Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmCodeForm;
