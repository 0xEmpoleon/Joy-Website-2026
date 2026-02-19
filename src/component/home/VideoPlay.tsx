"use client";

import React, { forwardRef, useEffect } from "react";

interface VideoPlayProps {
  src?: string;
}

const VideoPlay = forwardRef<HTMLDivElement, VideoPlayProps>(
  ({ src = "/introVideo.mp4" }, ref) => {

    useEffect(() => {
      if (!ref || typeof ref === "function") return;

      // Access the video element inside the container
      const videoContainer = (ref as React.MutableRefObject<HTMLDivElement>).current;
      if (!videoContainer) return;

      const video = videoContainer.querySelector("video") as HTMLVideoElement;
      if (!video) return;

      // Reset and play the video
      video.currentTime = 0;
      video.load();

      const playVideo = async () => {
        try {
          await video.play();
          console.log("Video started playing successfully");
        } catch (err) {
          console.log("Video play failed, waiting for user interaction", err);

          // Fallback: play on user interaction
          const playOnInteraction = () => {
            video.play().catch(e => console.log("Play after interaction failed:", e));
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("touchstart", playOnInteraction);
          };

          document.addEventListener("click", playOnInteraction);
          document.addEventListener("touchstart", playOnInteraction);
        }
      };

      playVideo();
    }, [ref]);

    return (
      <div className="intro-video" ref={ref} style={{ display: "flex", opacity: 1 }}>
        <video
          src={src}
              controls={false}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "auto" }}
          controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            webkit-playsinline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

VideoPlay.displayName = "VideoPlay";

export default VideoPlay;
