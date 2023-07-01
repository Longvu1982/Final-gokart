import React from "react";
import Images from "../assets/images/Image";
import { BsChevronRight, BsHexagon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-slate-800 overflow-hidden relative">
      <img
        src={Images.gokartBg}
        alt=""
        className="w-full h-full object-cover brightness-50 xl:brightness-100"
      />
      <div className="custom-clip-path absolute top-0 left-0 h-full w-3/5 bg-black bg-opacity-80 text-white">
        <div className="absolute top-[35%] xl:top-[40%] left-4 xl:left-20">
          <h1 className="text-xl ml-2 font-semibold mb-6">
            Experience the most advance tracking system
          </h1>
          <h1 className="text-5xl xl:text-8xl ml-2 xl:ml-0 font-bold mb-2">KARTRACING</h1>
          <h1 className="text-3xl xl:text-4xl font-semibold ml-2 mb-10">START NOW</h1>
          <div className="flex items-center">
            <div onClick={() => {
                navigate("tracking")
            }} className="flex items-center justify-center relative p-1 group cursor-pointer">
              <BsHexagon
                size={50}
                className="text-white group-hover:opacity-50 trasition-all"
              />
              <BsChevronRight
                size={15}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <p className="absolute top-1/2 left-16 whitespace-nowrap -translate-y-1/2 w-0 group-hover:w-28 transition-all overflow-hidden">
                Let's get started
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
