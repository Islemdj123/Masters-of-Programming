
import { Layout } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      {/* Video Hero Section */}
      <section className="relative w-full h-80 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="projects-hero-video"
        >
          <source
            src="https://videos.pexels.com/video-files/8437842/8437842-hd_1080_1920_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/20" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Projects & Activities</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From hackathons to workshops, explore what we've been building and organizing.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">{error}</div>
        )}

        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} className="h-[400px]" />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
