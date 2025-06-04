"use client";

import React from "react";
import Photo from "../../assets/gallery.png";
import Robot from "../../assets/robot.avif";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#001e2b] text-white w-full py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {/* Section 1: Starting a Business */}
        <div className="md:flex md:items-center md:gap-10">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src={Photo}
              alt="Starting a business illustration"
              className="w-full h-auto object-cover rounded-full shadow-xl"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl font-bold mb-4 text-center md:text-left">
              Starting a Business?
            </h2>
            <p className="text-center md:text-left text-lg text-gray-300">
              E-commerce has your back...
            </p>
            <p className="my-6 text-base leading-relaxed text-gray-300">
              Embarking on a new business venture can be both exhilarating and
              challenging. E-commerce, a modern online advertisement platform,
              serves as a valuable ally for newcomers, reducing the cost of
              physical stores through smart digital marketing solutions. With
              E-commerce, new entrepreneurs access a wider audience and focus on
              their vision — all while avoiding the hefty costs of traditional
              storefronts.
            </p>
            <p className="text-lg text-gray-100">
              E-commerce bridges innovation and success by offering powerful,
              affordable, and beginner-friendly tools for digital advertising.
              Entrepreneurs can rely on E-commerce to engage the right audience
              while they focus on growing their dream.
            </p>
          </div>
        </div>

        {/* Section 2: Already in Business */}
        <div className="md:flex md:items-center md:gap-10 flex-col-reverse md:flex-row">
          <div className="md:w-2/3 mt-10 md:mt-0">
            <h2 className="text-4xl font-bold mb-4 text-center md:text-left">
              Already in Business?
            </h2>
            <p className="text-center md:text-left text-lg text-gray-300">
              Elevate your sales with E-commerce...
            </p>
            <p className="my-6 text-base leading-relaxed text-gray-300">
              For seasoned entrepreneurs, the business world moves fast. That's
              where E-commerce comes in — your digital partner offering advanced
              marketing tools and strategies. With deep market insight,
              E-commerce helps established businesses sharpen their digital
              presence and stay ahead of the curve.
            </p>
            <p className="text-lg text-gray-100">
              From fine-tuning branding to precise audience targeting,
              E-commerce provides tailored advertising solutions to boost
              engagement and conversions. Focus on scaling your business —
              E-commerce will handle the digital journey.
            </p>
          </div>
          <div className="md:w-1/3 mb-10 md:mb-0">
            <img
              src={Robot}
              alt="Digital marketing technology illustration"
              className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-cover rounded-full shadow-xl mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
