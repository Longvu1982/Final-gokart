import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";

const VideoSection = ({ frame }) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const startProcessing = () => {
    setLoading(true);
    fetch("http://localhost:5000/start_processing", {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };
  const renderLoadingBtn = () => {
    if (!isLoading) {
      return isError ? "Fail to connect" : "Connect to camera";
    }
    return (
      <>
        <span className="loader"></span>
        <span className="">Connecting...</span>
      </>
    );
  };

  return (
    <div className="bg-gray-300 p-2 sticky md:static top-2 md:top-0">
      <div className="aspect-video w-full overflow-hidden bg-[#393743] flex items-center justify-center">
        {frame ? (
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt=""
            className="w-full h-full"
          />
        ) : (
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={startProcessing}
          >
            <AiFillPlayCircle
              size={35}
              className="text-red-400 group-hover:opacity-70 transition-all"
            />
            <p className="w-0 group-hover:w-28 text-gray-200 text-xs flex items-center gap-2 transition-all overflow-hidden whitespace-nowrap">
              {renderLoadingBtn()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
