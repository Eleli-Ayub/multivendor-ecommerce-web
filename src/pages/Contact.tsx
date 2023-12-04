// import { useState } from 'react';
import { IconButton } from '@mui/material';
import { FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { IconButton } from '@mui/material';

const Contact = () => {
    // const [loading] = useState(false);

    return (
        <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 p-[5px]  lg:p-20  ">
            {/* Contact card */}
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 border-r-2 px-[10px] price rounded-[0.25rem]">
                <form className="bg-white rounded px-8 pt-6 pb-8">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Phone
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="name"
                            type="text"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none bg-gray-100"
                            id="message"
                            placeholder="Your message here"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            {/* Message */}
            <div className="px-[20px] price h-[fit-content] rounded-[0.25rem] lg:px-20 py-5 bg-black-main text-white">
                <h1 className="text-2xl font-bold text-primary mb-6">Need to make an enquiry?</h1>
                <p className=" mb-6">We respond between 9 a.m. and 9 p.m.</p>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4">
                    <h1 className="text-lg font-semibold mb-2 w-full bg-yellow">Quick Links</h1>
                    <ul className="list-none flex gap-1">
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    color: 'blue',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to="https://www.facebook.com/eduka.ke.9"
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaFacebook color="blue" />
                                </Link>
                            </IconButton>
                        </li>
                        <li className="mb-1">
                            {/* <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to="tel:+254706244557"
                                    className="text-white flex items-center"
                                    target="_blank"
                                >
                                    <FaPhone color="gray" />
                                </Link>
                            </IconButton> */}
                        </li>
                        <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to={`mailto:innovialtd@gmail.com`}
                                    target="_blank"
                                    className="text-white flex items-center"
                                >
                                    <FaEnvelope color="orange" />
                                </Link>
                            </IconButton>
                        </li>
                        {/* <li className="mb-1">
                            <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <a href="#" className="text-white flex items-center">
                                    <FaYoutube color="red" />
                                </a>
                            </IconButton>
                        </li> */}
                        <li className="mb-1">
                            {/* <IconButton
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.4rem',
                                    borderRadius: '0.25rem',
                                }}
                            >
                                <Link
                                    to="https://wa.me/+254706244557/?"
                                    className="text-white flex items-center"
                                >
                                    <FaWhatsapp color="green" />
                                </Link>
                            </IconButton> */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Contact;
