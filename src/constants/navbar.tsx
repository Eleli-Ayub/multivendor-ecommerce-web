/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Close,
    FavoriteBorder,
    Menu,
    PersonOutline,
    Search,
    ShoppingBagOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser, setUser } from '../Redux/slices/AuthSlice';
import { AppDispatch } from '../Redux/store';
import logo from '../assets/logo.png';

type NavbarProps = {
    SetShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    SetShowAdsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const navigation = [
    { name: 'Home', url: '/' },
    { name: 'Marketplace', url: '/marketplace' },
    { name: 'Products', url: '/products' },
    { name: 'Promoted', url: '/sponsored_ads' },
    { name: 'About', url: '/services' },
    { name: 'Contact', url: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ SetShowAdsForm }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: any) => state.auth.user);
    const userToken = useSelector((state: any) => state.auth.userToken);

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, [dispatch, userToken]);

    const closeMobileMenu = () => setMobileOpen(false);

    const openSellForm = () => {
        closeMobileMenu();
        if (user) {
            SetShowAdsForm(true);
        } else {
            navigate('/login');
        }
    };

    const logout = async () => {
        localStorage.removeItem('userToken');
        await dispatch(setUser(null));
        setAccountOpen(false);
        navigate('/');
    };

    const isActive = (url: string) =>
        url === '/' ? location.pathname === '/' : location.pathname.startsWith(url);

    return (
        <header className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white text-gray-900 shadow-sm">
            <div className="hidden border-b border-gray-100 bg-[#fafafa] lg:block">
                <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 text-[11px] uppercase tracking-[0.14em] text-gray-500 xl:px-10">
                    <span>Shop confidently from trusted sellers</span>
                    <span>Secure checkout · Product marketplace</span>
                    <span>English · KES</span>
                </div>
            </div>

            <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-800 transition hover:border-gray-900 lg:hidden"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        {mobileOpen ? <Close /> : <Menu />}
                    </button>

                    <Link
                        to="/"
                        className="flex shrink-0 items-center"
                        aria-label="Marketplace home"
                        onClick={closeMobileMenu}
                    >
                        <img src={logo} alt="Marketplace" className="h-10 w-auto max-w-[170px] object-contain" />
                    </Link>
                </div>

                <nav className="hidden flex-1 items-center justify-center lg:flex" aria-label="Primary navigation">
                    <ul className="flex items-center gap-7 xl:gap-10">
                        {navigation.map((item) => (
                            <li key={item.url}>
                                <Link
                                    to={item.url}
                                    className={`relative py-7 text-sm font-medium transition-colors after:absolute after:bottom-4 after:left-0 after:h-px after:bg-gray-900 after:transition-all ${
                                        isActive(item.url)
                                            ? 'text-gray-950 after:w-full'
                                            : 'text-gray-600 after:w-0 hover:text-gray-950 hover:after:w-full'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    <button
                        type="button"
                        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-800 transition hover:bg-gray-100 sm:inline-flex"
                        aria-label="Search products"
                        onClick={() => navigate('/products')}
                    >
                        <Search />
                    </button>

                    <div className="relative hidden sm:block">
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition hover:bg-gray-100"
                            aria-label={user ? 'Open account menu' : 'Sign in'}
                            onClick={() => (user ? setAccountOpen((open) => !open) : navigate('/login'))}
                        >
                            {user?.userimage ? (
                                <img src={user.userimage} alt="Account" className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                                <PersonOutline />
                            )}
                        </button>
                        {user && accountOpen && (
                            <div className="absolute right-0 top-12 w-48 rounded-xl border border-gray-200 bg-white p-2 text-sm shadow-xl">
                                <button className="block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-50" onClick={() => navigate('/profile')}>
                                    Profile
                                </button>
                                <button className="block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-50" onClick={() => navigate('/profile/myads')}>
                                    My products
                                </button>
                                <button className="block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-50" onClick={() => navigate('/notifications')}>
                                    Notifications
                                </button>
                                <button className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50" onClick={logout}>
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-800 transition hover:bg-gray-100 md:inline-flex"
                        aria-label="Wishlist"
                        onClick={() => (user ? navigate('/profile') : navigate('/login'))}
                    >
                        <FavoriteBorder />
                    </button>

                    <button
                        type="button"
                        className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-800 transition hover:bg-gray-100 md:inline-flex"
                        aria-label="Cart"
                        onClick={() => navigate('/checkout')}
                    >
                        <ShoppingBagOutlined />
                    </button>

                    <button
                        type="button"
                        className="ml-1 rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-gray-700 sm:px-5"
                        onClick={openSellForm}
                    >
                        Sell product
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-lg lg:hidden">
                    <nav aria-label="Mobile navigation">
                        <ul className="space-y-1">
                            {navigation.map((item) => (
                                <li key={item.url}>
                                    <Link
                                        to={item.url}
                                        onClick={closeMobileMenu}
                                        className={`block rounded-lg px-3 py-3 text-base font-medium ${
                                            isActive(item.url) ? 'bg-gray-100 text-gray-950' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-sm font-medium"
                            onClick={() => {
                                navigate('/products');
                                closeMobileMenu();
                            }}
                        >
                            <Search fontSize="small" /> Search
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-sm font-medium"
                            onClick={openSellForm}
                        >
                            Sell product
                        </button>
                    </div>

                    {user ? (
                        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                            <button onClick={() => { navigate('/profile'); closeMobileMenu(); }} className="font-medium">
                                My account
                            </button>
                            <button onClick={logout} className="text-red-600">
                                Log out
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="mt-4 w-full rounded-lg bg-gray-950 px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white"
                            onClick={() => { navigate('/login'); closeMobileMenu(); }}
                        >
                            Sign in
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
