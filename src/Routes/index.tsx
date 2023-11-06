import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import UserDashboard from '../pages/userDash/Dashboard';
import MyAds from '../pages/userDash/MyAds';
import Pending from '../pages/userDash/Pending';
import Declined from '../pages/userDash/Declined';
import Closed from '../pages/userDash/Closed';
import Drafts from '../pages/userDash/Drafts';
import Pricing from '../pages/Pricing';
import CreateAds from '../pages/CreateAds';
import { useEffect, useState } from 'react';
import AdsForm from '../components/Ad/AdForm';
import Footer from '../constants/footer';
import Contact from '../pages/Contact';
import Services from '../pages/services';
import { ToastContainer } from 'react-toastify';
import AdInfo from '../pages/AdInfo';
import Terms from '../pages/Terms';
import Navbar from '../constants/navbar';
import AdsPage from '../pages/AdsPage';
import SellersAds from '../pages/SellersAds';
import FAQSPage from '../pages/FAQSPage';
import Profile from '../pages/userDash/profile';
import Login from '../pages/login';
import Register from '../pages/Register';
import ScrollToTop from '../components/ScrollToTop';
// import ProtectedRoutes from "./ProtectedRoutes";

const Index = () => {
    const [, setShowLogin] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const auth = localStorage.getItem("userToken")
        console.log(auth);

        if (auth == "" || auth == null || auth == undefined) {
            setLoggedIn(false)
        } else {
            setLoggedIn(true)
        }
    }, [])

    const [showAdsForm, setShowAdsForm] = useState<boolean>(false);
    return (
        <div className=" ">
            <Navbar SetShowLogin={setShowLogin} SetShowAdsForm={setShowAdsForm} />

            <ToastContainer position="top-center" />
            <AdsForm showAdsForm={showAdsForm} setShowAdsForm={setShowAdsForm} />
            <div className=" mt-20 md:mt-[9.5rem]">
                <ScrollToTop>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Landing />} />
                        <Route path="/Dashboard" element={<UserDashboard />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/ads" element={<AdsPage />} />
                        <Route path="/terms_and_conditions" element={<Terms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/eduka/faq" element={<FAQSPage />} />
                        <Route path="/ad_info/:id" element={<AdInfo />} />
                        <Route path="/seller/store/" element={<SellersAds />} />
                        <Route path="/profile" element={loggedIn ? <Profile /> : <Login />} />
                        <Route path="/profile/myads" element={<MyAds />} />
                        <Route path="/profile/pending" element={<Pending />} />
                        <Route path="/profile/declined" element={<Declined />} />
                        <Route path="/new-ad" element={<CreateAds />} />
                        <Route path="/profile/closed" element={<Closed />} />
                        <Route path="/profile/drafts" element={<Drafts />} />
                    </Routes>
                </ScrollToTop>
            </div>
            <Footer />
        </div>
    );
};

export default Index;
