/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEyeSlash,
  FaEye,
  FaCartPlus,
  FaUserAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

import { RegisteringUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import { locations } from "../../data/Location";
import Icon from "../Global/Icon";

interface Location {
  id: number;
  name: string;
  subLocations: { id: number; name: string }[];
}

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);

  useEffect(() => {
    const sortedCounties = [...locations].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedLocations(sortedCounties);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.location) {
      toast.error("Please select a county.");
      return;
    }

    try {
      await dispatch(RegisteringUser({ formData, navigate })).unwrap();

      setFormData({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        phone: "",
        location: "",
        password: "",
      });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-6">
      {isLoading && <Loader />}

      <div className="mx-auto flex min-h-[85vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* Left side */}
        <div className="hidden w-1/2 md:flex bg-gradient-to-br from-primary-orange to-secondary-orange text-white">
          <div className="flex w-full flex-col items-center justify-center px-10 text-center">
            <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-white p-4 shadow-lg">
              <Icon icon={FaCartPlus} />
            </div>

            <h2 className="mb-4 text-4xl font-bold leading-tight">
              Create Your Account
            </h2>

            <p className="max-w-md text-sm leading-7 text-white/90">
              Join us today to start exploring, managing your account, and
              enjoying a seamless experience.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 md:w-1/2 md:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-semibold text-gray-900">
                <FaUserAlt className="mr-2 inline-block text-blue-600" />
                Sign Up
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <HiMiniUser className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                    placeholder="First name"
                    minLength={2}
                    required
                  />
                </div>

                <div className="relative">
                  <HiMiniUser className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                  <input
                    type="text"
                    id="middlename"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                    placeholder="Middle name"
                    minLength={2}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <HiMiniUser className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                  placeholder="Last name"
                  minLength={2}
                  required
                />
              </div>

              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 font-medium outline-none transition focus:border-primary-orange"
                  required
                >
                  <option value="">Select County</option>
                  {sortedLocations.map((county: Location) => (
                    <option key={county.id} value={county.name}>
                      {county.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="relative">
                  <MdPassword className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-12 font-medium outline-none transition focus:border-primary-orange"
                    placeholder="Enter password"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <p className="px-2 pt-2 text-sm text-gray-500">
                  Enter a secure password
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary-orange px-4 py-3 font-semibold text-white transition duration-300 hover:bg-secondary-orange"
              >
                Register
              </button>

              <p className="text-center text-gray-500">
                Already have an account?
                <Link to="/login" className="ml-2 text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;