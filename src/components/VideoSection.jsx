import React from "react";

const VideoSection = ({ frame }) => {
	return (
		<div className="bg-gray-300 p-2">
			<div className="aspect-video w-full overflow-hidden bg-[#393743]">
				{frame && <img src={`data:image/jpeg;base64,${frame}`} alt="" className="w-full h-full" />};
			</div>
		</div>
	);
};

export default VideoSection;
