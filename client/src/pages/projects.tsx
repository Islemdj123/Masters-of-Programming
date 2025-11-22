
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Projects & Activities</h1>
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
