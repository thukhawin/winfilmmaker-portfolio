import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", projectType: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-32 bg-black text-white border-t border-white/10">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-4">
            Contact
          </h2>
          <p className="text-white/60 text-sm font-light tracking-wide max-w-2xl mx-auto">
            Ready to collaborate on your next cinematic project? Let's discuss your vision
          </p>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 font-light tracking-wide text-sm pb-3"
                  required
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 font-light tracking-wide text-sm pb-3"
                  required
                />
              </div>
            </div>
            
            <div>
              <Input
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                placeholder="Project Type"
                className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 font-light tracking-wide text-sm pb-3"
              />
            </div>
            
            <div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell me about your project"
                className="bg-transparent border-0 border-b border-white/20 rounded-none text-white placeholder-white/40 focus:border-white/60 focus:ring-0 resize-none font-light tracking-wide text-sm pb-3"
                required
              />
            </div>
            
            <div className="pt-8">
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black font-extralight tracking-widest uppercase text-xs px-12 py-4 transition-all duration-300"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Footer Info */}
        <div className="text-center mt-20 pt-16 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8 text-xs font-extralight tracking-widest uppercase text-white/40">
            <div>
              <p>Email</p>
              <p className="mt-2 text-white/60">hello@cinematographer.com</p>
            </div>
            <div>
              <p>Phone</p>
              <p className="mt-2 text-white/60">+1 (555) 123-4567</p>
            </div>
            <div>
              <p>Location</p>
              <p className="mt-2 text-white/60">Los Angeles, CA</p>
            </div>
          </div>
          
          <div className="mt-16 text-xs font-extralight tracking-widest text-white/30">
            <p>© 2024 Cinematographer Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
