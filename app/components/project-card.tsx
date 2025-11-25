"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-300 group", className)}>
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
        <img 
          src={project.bannerUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 right-4 z-20 inline-flex items-center rounded-full border border-input bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground hover:bg-background/90">
          <Calendar className="w-3 h-3 mr-1" />
          {project.date}
        </div>
      </div>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
      </div>
      <div className="p-6 pt-0 flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex items-center p-6 pt-0">
        <button className="w-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary group-hover:bg-primary/10 group-hover:text-primary">
          Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
