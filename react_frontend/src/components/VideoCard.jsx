import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      {/* Placeholder for thumbnail */}
      <div className="thumbnail">
        {/* You can replace this with an actual image */}
        <img src="placeholder_image_url" alt="Video Thumbnail" /> 
      </div>
      <div className="video-info">
        <h3>{video.title || "Video Title"}</h3>
        <p>{video.channel || "Channel Name"}</p>
        {/* Add more video details as needed */}
      </div>
    </div>
  );
};

export default VideoCard;