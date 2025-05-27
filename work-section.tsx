import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { Video } from "@shared/schema";

export default function WorkSection() {
  const { data: videos } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-4">
            Portfolio
          </h2>
          <p className="text-white/60 text-sm font-light tracking-wide max-w-2xl mx-auto">
            A curated collection of cinematic works showcasing visual storytelling and technical excellence
          </p>
        </div>
        
        {videos && videos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative aspect-video bg-black border border-white/10 overflow-hidden mb-4 hover:border-white/30 transition-colors duration-500">
                  <video
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    src={`/uploads/${video.filename}`}
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-white/60 text-xs font-extralight tracking-wider line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <p className="text-white/40 text-xs font-light">
                    {new Date(video.uploadedAt || '').getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="border border-white/20 rounded p-16 max-w-md mx-auto">
              <h3 className="text-white/80 font-light tracking-widest uppercase mb-4">
                No Videos Yet
              </h3>
              <p className="text-white/40 text-sm font-light tracking-wide mb-8">
                Upload your first portfolio video to showcase your work
              </p>
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-black hover:bg-gray-100 font-light tracking-wider uppercase text-xs px-8 py-3"
              >
                Upload Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
