/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye, FaSignInAlt, FaCartPlus } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { LoggingUser } from "../../Redux/slices/AuthSlice";
import { AppDispatch } from "../../Redux/store";
import Loader from "../../constants/loader";
import Icon from "../Global/Icon";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state: any) => state.auth.isLoading);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(LoggingUser({ formData, navigate })).unwrap();
      setFormData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.log("Login failed:", error);
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
              Welcome Back
            </h2>

            <p className="max-w-md text-sm leading-7 text-white/90">
              Sign in to access your account, manage your activity, and continue
              where you left off.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 md:px-10 md:w-1/2">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-semibold text-gray-900">
                <FaSignInAlt className="mr-2 inline-block text-blue-600" />
                Sign In
              </h1>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 font-medium outline-none transition focus:border-primary-orange"
                  placeholder="Enter your email address"
                  required
                />
              </div>

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
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  to="/reset_password_request"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary-orange px-4 py-3 font-semibold text-white transition duration-300 hover:bg-secondary-orange"
              >
                Login
              </button>

              <p className="text-center text-gray-500">
                You do not have an account?
                <Link to="/register" className="ml-2 text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;