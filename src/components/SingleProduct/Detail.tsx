/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { FetchProduct } from "../../Redux/slices/adSlice";
import { ChevronLeft, ChevronRight, LocationOn } from "@mui/icons-material";
// import { Rating } from '@mui/material';
import { AppDispatch } from "../../Redux/store";
import { IconButton } from "@mui/material";
import { createInquiry } from "../../Redux/hooks/inquiry";
import ImageLoader from "../Global/ImageLoader";
import DetailLoader from "../Global/DetailLoader";
import ListLoader from "../Global/ListLoader";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const [toggle, settoggle] = useState(false);
  const { ad, adImages, seller, isLoading } = useSelector(
    (state: any) => state.ad
  );

  console.log(ad, adImages, seller);
  console.log(adImages, "they go here");

  console.log(seller);

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (ad?.userid) {
      setFormData((prevData) => ({
        ...prevData,
        user: ad.userid,
      }));
    }
  }, [ad?.userid]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(FetchProduct(id));
    };

    fetchData();
  }, [dispatch, id]);

  const prevSlide = () => {
    const newIndex =
      (selectedImageIndex - 1 + adImages.length) % adImages.length;
    setSelectedImageIndex(newIndex);
  };
  const nextSlide = () => {
    const newIndex = (selectedImageIndex + 1) % adImages.length;
    setSelectedImageIndex(newIndex);
  };

  // inquiries

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    user: ad?.userid,
    product: id,
  });
  console.log(ad?.userid);
  console.log(formData);

  const updateFormData = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };
  console.log(formData);

  const handleInquirySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const response = await createInquiry(formData);
    console.log(response);
    formRef?.current?.reset();
    reset();
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      phone: "",
      user: "",
      product: "",
    });
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row lg:gap-5 mb-10">
        {/* Part 1 - Images + Metadata */}
        <div className="md:flex-1">
          {/* Image Carousel */}
          <div className="relative w-full">
            {isLoading ? (
              <ImageLoader count={1} />
            ) : (
              <img
                src={adImages?.[selectedImageIndex]}
                className="w-full h-auto max-h-[30rem] rounded-md object-cover"
                alt="Product"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              <IconButton
                className="bg-[#eee] text-primary-orange"
                onClick={prevSlide}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                className="bg-[#eee] text-primary-orange"
                onClick={nextSlide}
              >
                <ChevronRight />
              </IconButton>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 py-4">
            {adImages?.map((image: any, index: number) => (
              <img
                key={index}
                src={image}
                className={`h-16 w-16 object-cover rounded-md cursor-pointer ${
                  index === selectedImageIndex
                    ? "border-2 border-secondary-orange"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>

          {/* Category & Brand */}
          <div className="flex flex-col md:flex-row gap-4 px-2">
            <span>
              Category: <i className="text-primary-orange">{ad?.category}</i>
            </span>
            <span>
              Brand: <i className="text-primary-orange">{ad?.brand}</i>
            </span>
          </div>
        </div>

        {/* Part 2 - Product Info + Call + Seller Details */}
        <div className="md:flex-1 p-4">
          {isLoading ? (
            <ListLoader count={1} />
          ) : (
            <>
              <h2 className="text-2xl font-bold capitalize">
                {ad?.productname}
              </h2>
              <h3 className="text-2xl font-bold text-secondary-orange">
                KSh {ad?.productprice}
              </h3>

              <p className="text-gray-600 mt-2">{ad?.productdescription}</p>

              <div className="flex items-center mt-2">
                <LocationOn className="text-secondary-orange" />
                <p className="text-gray-700 capitalize ml-1">
                  {seller?.seller_location}
                </p>
              </div>

              <button
                className="mt-4 p-2 bg-primary-orange text-white px-12 py-3 rounded hover:bg-secondary-orange transition-colors"
                onClick={() => settoggle(!toggle)}
              >
                <Link to={`tel:${seller?.seller_phonenumber}`} target="_blank">
                  {!toggle ? "Call seller" : `${seller?.seller_phonenumber}`}
                </Link>
              </button>

              {/* Moved Seller Details Here */}
              <div className="mt-6 border rounded shadow-sm p-4 bg-gray-50 ">
                <h3 className="text-lg font-semibold text-primary-orange mb-2">
                  Seller Details
                </h3>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{seller?.seller_name}</p>
                    <p className="text-sm text-gray-600">
                      {seller?.seller_email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {seller?.seller_phonenumber}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Part 3 - Inquiry Form */}
        <div className="md:flex-1 p-4">
          {isLoading ? (
            <DetailLoader count={4} />
          ) : (
            ad?.userid && (
              <div
                className="p-4 rounded mt-2"
                style={{ backgroundColor: "#0c2e4e" }}
              >
                <h1 className="text-white font-bold">Make Inquiry</h1>
                <p className="text-gray-400 mb-3">
                  Send the seller an inquiry for this product
                </p>
                <form onSubmit={handleInquirySubmit} ref={formRef}>
                  <input
                    type="text"
                    className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                    placeholder="Your name"
                    onChange={(e) => updateFormData("name", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                    placeholder="Your email"
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                  />
                  <textarea
                    className="h-12 rounded px-4 mb-2 shadow-custom w-full"
                    placeholder="Your message"
                    onChange={(e) => updateFormData("message", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="h-10 rounded px-4 mb-2 shadow-custom w-full"
                    placeholder="Your phone"
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    required
                  />
                  <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover:bg-white transition-colors">
                    Inquire
                  </button>
                </form>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
