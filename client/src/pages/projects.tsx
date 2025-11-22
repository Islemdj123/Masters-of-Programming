
import { Layout } from "@/components/layout";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";

export default function Projects() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Projects & Activities</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From hackathons to workshops, explore what we've been building and organizing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} className="h-[400px]" />
          ))}
        </div>
      </div>
    </Layout>
  );
}
