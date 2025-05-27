import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CloudUpload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageUpload({ isOpen, onClose }: ImageUploadProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Image uploaded successfully",
        description: "Your personal work image has been uploaded.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      handleClose();
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select an image file.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title.trim());
    formData.append('description', description.trim());

    uploadMutation.mutate(formData);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    onClose();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-black border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white font-extralight tracking-widest uppercase text-sm">
            Upload Personal Work
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-white/60 font-light tracking-wide text-xs uppercase">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 font-light tracking-wide text-sm mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-white/60 font-light tracking-wide text-xs uppercase">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter image description (optional)"
              className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 resize-none font-light tracking-wide text-sm mt-2"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-white/60 font-light tracking-wide text-xs uppercase">
              Image File *
            </Label>
            {!selectedFile ? (
              <div
                {...getRootProps()}
                className={`border border-white/20 rounded p-8 text-center transition-all duration-300 cursor-pointer mt-2 ${
                  isDragActive 
                    ? 'border-white/40 bg-white/5' 
                    : 'hover:border-white/40 hover:bg-white/5'
                }`}
              >
                <input {...getInputProps()} />
                <CloudUpload className="h-8 w-8 mx-auto mb-4 text-white/40" />
                <p className="text-white font-light mb-2">
                  {isDragActive ? 'Drop your image here' : 'Upload your image'}
                </p>
                <p className="text-white/40 text-xs font-light mb-4">
                  Drag and drop your image file here, or click to browse
                </p>
                <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
                  Choose File
                </Button>
                <p className="text-white/30 text-xs font-light mt-4">
                  Supports JPG, PNG, WebP up to 10MB
                </p>
              </div>
            ) : (
              <div className="border border-white/20 rounded p-4 bg-white/5 mt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-light">{selectedFile.name}</p>
                    <p className="text-white/40 text-xs">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-white hover:text-white/60"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-white/20 text-white hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedFile || !title.trim() || uploadMutation.isPending}
              className="bg-white text-black hover:bg-gray-100 font-light tracking-wider uppercase text-xs"
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}