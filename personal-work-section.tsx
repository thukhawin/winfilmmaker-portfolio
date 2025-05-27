import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import ImageUpload from "./image-upload";
import type { Image } from "@shared/schema";

export default function PersonalWorkSection() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { data: images } = useQuery<Image[]>({
    queryKey: ["/api/images"],
  });

  return (
    <>
      <section className="py-32 bg-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-4">
                Personal Work
              </h2>
              <p className="text-white/60 text-sm font-light tracking-wide max-w-2xl">
                A collection of personal cinematography and photography exploring visual storytelling
              </p>
            </div>
            <Button
              onClick={() => setIsUploadOpen(true)}
              variant="ghost"
              size="sm"
              className="text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 font-extralight tracking-wider"
            >
              <Upload size={14} className="mr-2" />
              Upload Image
            </Button>
          </div>
          
          {images && images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {images.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`
                    group cursor-pointer overflow-hidden bg-black
                    ${index % 6 === 0 || index % 6 === 3 ? 'lg:col-span-2' : ''}
                    ${index % 7 === 0 ? 'md:row-span-2' : ''}
                  `}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={`/uploads/${image.filename}`}
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-light tracking-wide text-sm mb-1">
                          {image.title}
                        </h3>
                        {image.description && (
                          <p className="text-white/60 text-xs font-extralight tracking-wider line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="border border-white/20 rounded p-16 max-w-md mx-auto">
                <h3 className="text-white/80 font-light tracking-widest uppercase mb-4">
                  No Images Yet
                </h3>
                <p className="text-white/40 text-sm font-light tracking-wide mb-8">
                  Upload your first personal work to showcase your photography and cinematography
                </p>
                <Button
                  onClick={() => setIsUploadOpen(true)}
                  className="bg-white text-black hover:bg-gray-100 font-light tracking-wider uppercase text-xs px-8 py-3"
                >
                  Upload Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <ImageUpload 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </>
  );
}