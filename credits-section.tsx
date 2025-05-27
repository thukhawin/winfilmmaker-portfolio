export default function CreditsSection() {
  const credits = [
    {
      category: "Short Films",
      projects: [
        {
          title: "The Silent Hour",
          year: "2024",
          role: "Director of Photography",
          director: "Jane Smith"
        },
        {
          title: "Urban Dreams",
          year: "2023",
          role: "Cinematographer",
          director: "Mike Johnson"
        },
        {
          title: "Echoes",
          year: "2023",
          role: "Camera Operator",
          director: "Sarah Chen"
        }
      ]
    },
    {
      category: "Documentaries",
      projects: [
        {
          title: "Voices of the City",
          year: "2024",
          role: "Director of Photography",
          director: "David Rodriguez"
        },
        {
          title: "The Last Workshop",
          year: "2023",
          role: "Cinematographer",
          director: "Elena Petrov"
        }
      ]
    },
    {
      category: "Music Videos",
      projects: [
        {
          title: "Midnight Drive",
          year: "2024",
          role: "Director of Photography",
          director: "Alex Turner",
          artist: "The Neon Collective"
        },
        {
          title: "Static Dreams",
          year: "2023",
          role: "Cinematographer",
          director: "Maya Patel",
          artist: "Luna Park"
        },
        {
          title: "Golden Hour",
          year: "2023",
          role: "Camera Operator",
          director: "Chris Wong",
          artist: "River Stone"
        }
      ]
    },
    {
      category: "Commercials",
      projects: [
        {
          title: "Brand Campaign 2024",
          year: "2024",
          role: "Director of Photography",
          director: "Lisa Park",
          client: "Tech Solutions Inc."
        },
        {
          title: "Lifestyle Series",
          year: "2023",
          role: "Cinematographer",
          director: "Robert Kim",
          client: "Modern Living Co."
        }
      ]
    }
  ];

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-extralight tracking-widest uppercase mb-4">
            Selected Credits
          </h2>
          <p className="text-white/60 text-sm font-light tracking-wide max-w-2xl mx-auto">
            A curated selection of collaborative works spanning multiple formats and genres
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          {credits.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <h3 className="text-lg font-light tracking-widest uppercase text-white/80 border-b border-white/20 pb-4">
                {category.category}
              </h3>
              
              <div className="space-y-6">
                {category.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-light tracking-wide group-hover:text-white/80 transition-colors duration-300">
                        {project.title}
                      </h4>
                      <span className="text-white/60 text-sm font-light">
                        {project.year}
                      </span>
                    </div>
                    
                    <div className="text-white/60 text-xs font-extralight tracking-wider space-y-1">
                      <p>{project.role}</p>
                      <p>Directed by {project.director}</p>
                      {(project as any).artist && (
                        <p>Artist: {(project as any).artist}</p>
                      )}
                      {(project as any).client && (
                        <p>Client: {(project as any).client}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}