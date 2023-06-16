import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "./components/Header";
import InfoSection from "./components/InfoSection";

const App = () => {
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
				console.log(data);
				setData(data);
			});
		}
	}, [socket]);

	const handleDetectedFrame = (frame) => {
		setFrame(frame);
	};

	return (
		// <div>
		// 	<h1 className="text-center mt-10 text-2xl font-semibold">Go kart</h1>
		// 	<img src={`data:image/jpeg;base64,${frame}`} alt="" className="mx-auto" />
		// </div>
		<>
			<Header />
			<InfoSection data={data} frame={frame} />
		</>
	);
};

export default App;
