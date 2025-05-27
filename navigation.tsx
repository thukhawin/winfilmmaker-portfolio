import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-light tracking-widest text-sm uppercase">
            YOUR NAME NSC
            <div className="text-xs font-extralight tracking-wider opacity-60">
              CINEMATOGRAPHER
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-12">
            <li>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white transition-colors duration-300"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('credits')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white transition-colors duration-300"
              >
                Credits
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('personal-work')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white transition-colors duration-300"
              >
                Personal Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white transition-colors duration-300"
              >
                Contact
              </button>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden nav-link text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection('portfolio')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('credits')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white text-left"
              >
                Credits
              </button>
              <button
                onClick={() => scrollToSection('personal-work')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white text-left"
              >
                Personal Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link font-extralight uppercase tracking-widest text-xs text-white/80 hover:text-white text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
