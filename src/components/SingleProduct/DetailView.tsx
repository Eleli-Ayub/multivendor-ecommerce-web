import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { FetchProductBySeller } from '../../Redux/slices/adSlice';
import { ChevronLeft, ChevronRight, LocationOn } from '@mui/icons-material';
// import { Rating } from '@mui/material';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';
import { IconButton } from '@mui/material';

const ProductInfo = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    // const navigate = useNavigate();

    // const formRef = useRef<HTMLFormElement>(null);
    const [toggle, settoggle] = useState(false);
    const { ad, adImages, seller, isLoading } = useSelector((state: any) => state.ad);
    console.log(ad, adImages, isLoading);

    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(FetchProductBySeller(id));
        };

        fetchData();
    }, [dispatch, id]);

    const prevSlide = () => {
        const newIndex = (selectedImageIndex - 1 + adImages.length) % adImages.length;
        setSelectedImageIndex(newIndex);
    };
    const nextSlide = () => {
        const newIndex = (selectedImageIndex + 1) % adImages.length;
        setSelectedImageIndex(newIndex);
    };

    // inquiries

    return (
        <div className="flex flex-col md:flex-row lg:gap-5 p-3 lg:p-5 w-[100%] mb-10 h-auto ">
            {isLoading && <Loader />}
            {/* Part 1 */}

            <div className="  w-1/2">
                <div className="flex flex-col md:flex-row md:gap-5">
                    <div className="">
                        <div className="flex flex-col md-gap-4 ">
                            <div className="relative">
                                <img
                                    src={` ${adImages && adImages[selectedImageIndex]}`}
                                    className="h-auto w-full max-h-[300px] lg:max-h-[30rem] rounded-md object-cover object-center top"
                                    alt=""
                                />

                                <div className="flex items-center justify-between absolute inset-0 px-1">
                                    <IconButton
                                        className="bg-[#eee] text-primary-orange"
                                        style={{ color: '#f75a0d', backgroundColor: '#eee' }}
                                        onClick={prevSlide}
                                    >
                                        <ChevronLeft />
                                    </IconButton>

                                    {/* Next button */}
                                    <IconButton
                                        className="bg-[#eee] text-primary-orange"
                                        onClick={nextSlide}
                                        style={{ color: '#f75a0d', backgroundColor: '#eee' }}
                                    >
                                        <ChevronRight />
                                    </IconButton>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4">
                                {/* {adImages.map((image: any, index: number) => ( */}
                                {adImages?.map((image: any, index: number) => (
                                    <img
                                        key={index}
                                        src={` ${image}`}
                                        // src={image}
                                        className={
                                            'h-16 w-16 object-cover rounded-md bg-gray-100 cursor-pointer' +
                                            (index === selectedImageIndex
                                                ? ' border-2 border-secondary-orange'
                                                : '')
                                        }
                                        alt=""
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:gap-5 p-5">
                    <span>
                        Category: <i className="text-primary-orange">{ad?.category}</i>
                    </span>
                    <span>
                        Brand: <i className="text-primary-orange">{ad?.brand}</i>{' '}
                    </span>
                </div>
            </div>
            {/* part2*/}
            <div className=" h-full p-4 w-[200px]">
                <div>
                    <div>
                        <h2 className=" text-2xl capitalize font-bold">{ad?.productname}</h2>
                    </div>
                    <div className="text-2xl font-bold text-secondary-orange">
                        {' '}
                        <h2> KSh {ad?.productprice}</h2>
                        <span className="text-sm text-gray-500">
                            {' '}
                            {'{'}Fixed price{'}'}
                        </span>
                    </div>

                    <div className="">
                        <p className="text-gray-600">
                            <p className="text-gray-600 ">{ad?.productdescription}</p>
                        </p>
                    </div>
                    <div className="flex mt-2">
                        <LocationOn className="text-secondary-orange" />
                        <p className="text-gray-700 capitalize">{seller?.seller_location} </p>
                    </div>
                    <div className="mt-2">
                        <p className="capitalize text-sm text-gray-700"> </p>
                    </div>
                    <div>
                        {' '}
                        <button
                            className="p-2  bg-primary-orange text-white px-12 py-3 mt-4 rounded  hover:secondary transition-colors delay-300"
                            onClick={() => settoggle(!toggle)}
                        >
                            <Link to={`tel:${seller?.seller_phonenumber}`} target="_blank">
                                {!toggle ? 'Call seller' : `${seller?.seller_phonenumber}`}
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            {/* Part 2 */}
        </div>
    );
};

export default ProductInfo;
