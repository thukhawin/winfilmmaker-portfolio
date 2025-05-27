import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Work</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                With over a decade of experience in visual storytelling, the focus remains on creating authentic narratives that resonate with audiences across diverse platforms and mediums.
              </p>
              <p>
                From intimate documentaries to large-scale commercial productions, each project is approached with meticulous attention to detail and a commitment to artistic excellence.
              </p>
              <p>
                The work has been featured in international film festivals and has garnered recognition for its innovative approach to cinematography and narrative structure.
              </p>
            </div>
            
            {/* Skills/Services */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Services</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium">Cinematography</p>
                  <p className="font-medium">Documentary</p>
                  <p className="font-medium">Commercial</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Post-Production</p>
                  <p className="font-medium">Color Grading</p>
                  <p className="font-medium">Sound Design</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
              alt="Professional filmmaker portrait" 
              className="rounded-lg shadow-2xl w-full" 
            />
            
            {/* Floating Achievement Card */}
            <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl max-w-xs">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Festival Winner</p>
                    <p className="text-sm text-gray-600">Best Cinematography 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
