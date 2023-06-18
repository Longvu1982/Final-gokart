import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoSection from "../components/InfoSection";
import { useTrackInfoStore } from "../hooks/useTrackInfo";

const MainView = () => {
  const [socket, setSocket] = useState();
  const [frame, setFrame] = useState();
  const [data, setData] = useState();

  const trackInfo = useTrackInfoStore();

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("frame", handleDetectedFrame);
      socket.on("data", (data) => {
        console.log(data);
        setData(data);
      });
    }
  }, [socket]);

  const handleDetectedFrame = (frame) => {
    setFrame(frame);
  };

  console.log(trackInfo);
  return <InfoSection data={data} frame={frame} />;
};

export default MainView;
