import Navigation from "@/components/navigation";
import VideoPlayer from "@/components/video-player";
import WorkSection from "@/components/work-section";
import CreditsSection from "@/components/credits-section";
import PersonalWorkSection from "@/components/personal-work-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Video Section */}
      <section id="home" className="relative">
        <VideoPlayer />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <WorkSection />
      </section>

      {/* Credits Section */}
      <section id="credits">
        <CreditsSection />
      </section>

      {/* Personal Work Section */}
      <section id="personal-work">
        <PersonalWorkSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
