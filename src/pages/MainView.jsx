import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import InfoSection from "../components/InfoSection";

const MainView = () => {
  const [socket, setSocket] = useState();
  const [frame, setFrame] = useState();
  const [data, setData] = useState();

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
        setData(data);
      });
    }
  }, [socket]);

  const handleDetectedFrame = (frame) => {
    setFrame(frame);
  };

  return <InfoSection data={data} frame={frame} />;
};

export default MainView;
