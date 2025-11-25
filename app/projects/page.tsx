'use client';

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";
import { projects, type Project } from "@/lib/utils";

export default function ProjectsPage() {
  const [apiProjects, setApiProjects] = useState<Project[]>([]);
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
      setApiProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      setApiProjects([]);
    } finally {
      setLoading(false);
    }
  }

  const displayProjects = apiProjects.length > 0 ? apiProjects : projects;

  return (
    <Layout>
      {/* Animated Hero Section */}
      <section className="relative w-full h-80 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/40 to-pink-900/60" />
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-40 h-40 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        {/* Text Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Our Projects</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the exciting projects and events organized by Masters of Programming. From hackathons to workshops, we're building the future.
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

        {!loading && displayProjects.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found
          </div>
        )}

        {!loading && displayProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}