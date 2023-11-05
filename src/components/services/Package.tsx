import Photo from '../../assets/M-PESA.jpeg';
import { sliderContent } from '../../data/package';

const Package = () => {
    return (
        <section className="m-2 bg-gray-light" style={{ borderRadius: '0.24rem' }}>
            <div className="max-w-6xl mx-auto w-full px-2 py-4">
                <h2 className="text-3xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-600 text-center">
                    Packages
                </h2>
                <div className="grid gap-6 lg:grid-cols-4 text-sm">
                    {sliderContent.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
                        >
                            <div className="relative">
                                <img
                                    src={Photo}
                                    alt="Sample Musician"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-gray-800 p-4">
                                    <h3 className="text-white text-xl font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-6 flex-grow">
                                <p className="text-gray-700">
                                    {' '}
                                    &#x2713; Get up to 20 free ads per month
                                </p>
                                <p className="text-gray-700"> &#x2716; Priority Ads per week</p>
                                <p className="text-gray-700"> &#x2716; Priority Ads per month</p>
                                <p className="text-gray-700"> &#x2716; Ads per month</p>
                            </div>
                            <div className="p-6 mt-auto">
                                {' '}
                                {/* Pushes buttons to the bottom */}
                                <button className="bg-primary-orange text-white py-2 px-4 rounded-md hover-bg-secondary-orange transition-colors duration-300">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Add more event cards as needed */}
                </div>
            </div>
        </section>
    );
};

export default Package;
