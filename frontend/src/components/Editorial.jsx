import { useState, useRef, useEffect } from "react";
import { Pause, Play, VideoOff } from "lucide-react";

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  if (!secureUrl) {
    return (
      <div
        className="w-full max-w-3xl mx-auto rounded-2xl
                   bg-black/60 backdrop-blur-xl border border-white/10
                   shadow-[0_0_15px_rgba(157,0,255,0.25)]
                   flex flex-col items-center justify-center
                   py-16 px-6 text-center"
      >
        <VideoOff className="w-12 h-12 text-purple-400 mb-4" />
        <h3 className="text-lg font-semibold text-purple-300 mb-1">
          No Editorial Video Available
        </h3>
        <p className="text-sm text-gray-400 max-w-md">
          An editorial video has not been uploaded for this problem yet.
          Please check back later.
        </p>
      </div>
    );
  }

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden
                 bg-black/60 backdrop-blur-xl border border-white/10
                 shadow-[0_0_15px_rgba(157,0,255,0.25)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 p-4
          bg-linear-to-t from-black/80 via-black/40 to-transparent
          transition-opacity duration-300
          ${isHovering || !isPlaying ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Controls */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 flex items-center justify-center
                       rounded-full bg-purple-600/80 hover:bg-purple-600
                       transition shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          <span className="text-xs text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Progress */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            if (videoRef.current) {
              videoRef.current.currentTime = Number(e.target.value);
            }
          }}
          className="range range-xs w-full accent-purple-500"
        />
      </div>
    </div>
  );
};

export default Editorial;
