import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSellerProducts } from '../Redux/slices/AdsSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../Redux/store';
import Productcard from './Global/SellerProduct.Card';
import Loader from '../constants/loader';
import { ProductData } from '../interface/common';
import { GettingUserById } from '../Redux/slices/AuthSlice';
import { Avatar } from 'antd';
import { WhatsApp, Facebook, YouTube, Phone } from '@mui/icons-material';
import { products } from '../data/sponsered';

const SellersAdsComp = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: any) => state.AllAds);
    const Ads = products;
    const theSeller = useSelector((state: any) => state.auth.theSeller);
    const { id } = useParams();
    const image =
        'https://images.unsplash.com/photo-1603988089669-c041ac2fe196?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdpcmwlMjBmYWNlfGVufDB8fDB8fHww';

    useEffect(() => {
        dispatch(GettingUserById(id)).then((action) => {
            if (GettingUserById.fulfilled.match(action)) {
                console.log(theSeller);
                dispatch(FetchSellerProducts(id));
            }
        });
    }, [dispatch, id]);

    return (
        <div className="flex flex-col ">
            <div className="p-5 m-5 border rounded-lg sm:flex md:justify-around price ">
                {/* User Image and Join Date */}
                <div className=" mb-4 sm:mb-0">
                    <Avatar
                        // src={`data:image/jpeg;base64, ${theSeller?.userimage}`}
                        src={image}
                        className="w-24 h-24 object-cover mx-auto"
                    />
                    <p className="text-gray-700">
                        Joined Eduka:{' '}
                        <span className="text-gray-500 underline font-bold">
                            {/* {theSeller?.CreatedAt
                                ? new Date(theSeller?.CreatedAt).toLocaleDateString()
                                : 'Date Not Available'} */}
                            22/09/2023
                        </span>
                    </p>
                </div>

                {/* User Information */}
                <div className="flex flex-col sm:items-start sm:pl-4">
                    <p className="mb-2">
                        Name:{' '}
                        <span className="capitalize font-bold text-secondary-orange">
                            {/* {`${theSeller?.firstname} ${theSeller?.middlename} ${theSeller?.lastname}`} */}
                            Emma Marcy
                        </span>
                    </p>
                    <p className="mb-2">
                        Email:
                        {/* {theSeller?.email    } */}
                        emma@gmail.com
                    </p>
                    <button className="p-2 bg-green-500 text-white my-2 hover:bg-green-700 rounded-md">
                        {/* {theSeller?.phone} */}
                        0791076354
                    </button>
                    <div className="flex mt-2 space-x-2">
                        <button className="p-2 bg-gray-200 rounded-full">
                            <WhatsApp className="text-green-500" />
                        </button>
                        <button className="p-2 bg-gray-200 rounded-full">
                            <Facebook className="text-blue-500" />
                        </button>
                        <button className="p-2 bg-gray-200 rounded-full">
                            <YouTube className="text-red-500" />
                        </button>
                        <button className="p-2 bg-gray-200 rounded-full">
                            <Phone />
                        </button>
                    </div>
                </div>
            </div>

            {/* seller's ads */}
            <div>
                <div className="flex flex-wrap gap-3 mx-auto p-5 ">
                    {isLoading ? (
                        // Show loading indicator or message
                        <div>
                            <Loader />
                        </div>
                    ) : (
                        // Render products if not loading
                        Ads.map((product: ProductData) => (
                            <Productcard
                                key={product.name}
                                // image={`data:image/jpeg;base64, ${product.mainimage}`}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                seller="John Doe"
                                id={product.name}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellersAdsComp;
