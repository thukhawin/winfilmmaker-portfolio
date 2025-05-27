import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import VideoUpload from "./video-upload";
import { Play, Pause, Volume2, Maximize, Upload } from "lucide-react";
import type { Video } from "@shared/schema";

export default function VideoPlayer() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: videos } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  const mainVideo = videos?.[0]; // Use the most recent video as the main video

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [mainVideo]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {mainVideo ? (
          <div
            className="relative w-full h-full group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={`/uploads/${mainVideo.filename}`}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
              loop
              muted
              autoPlay
            />
            
            {/* Video Controls Overlay */}
            <div className={`absolute bottom-8 left-8 right-8 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-black/30 backdrop-blur-sm rounded p-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={togglePlay}
                      className="text-white hover:text-gray-300 h-8 w-8"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>
                    <span className="text-xs font-light tracking-wide">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white hover:text-gray-300 h-8 w-8"
                    >
                      <Volume2 size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={toggleFullscreen}
                      className="text-white hover:text-gray-300 h-8 w-8"
                    >
                      <Maximize size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Button Overlay */}
            <div className="absolute top-8 right-8">
              <Button
                onClick={() => setIsUploadOpen(true)}
                variant="ghost"
                size="sm"
                className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/20 font-extralight tracking-wider"
              >
                <Upload size={14} className="mr-2" />
                Upload New
              </Button>
            </div>

            {/* Bottom overlay with title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-white text-xl md:text-2xl font-extralight tracking-widest uppercase mb-2">
                  {mainVideo?.title || "Cinematic Reel"}
                </h1>
                {mainVideo?.description && (
                  <p className="text-white/70 text-sm font-light max-w-2xl">
                    {mainVideo.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Upload Overlay */
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center text-white max-w-lg mx-auto px-8">
              <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-8">
                Upload Your Cinematic Reel
              </h2>
              <div className="border border-white/20 rounded p-16 transition-all duration-300 hover:border-white/40">
                <Upload className="h-12 w-12 mx-auto mb-8 opacity-60" />
                <p className="text-white/60 text-sm font-light mb-8 tracking-wide">
                  Showcase your vision with a compelling video
                </p>
                <Button
                  onClick={() => setIsUploadOpen(true)}
                  className="bg-white text-black hover:bg-gray-100 font-light tracking-wider uppercase text-xs px-8 py-3"
                >
                  Choose File
                </Button>
                <p className="text-xs text-white/40 mt-6 font-light tracking-wide">
                  MP4, MOV, AVI up to 500MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <VideoUpload 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </>
  );
}
