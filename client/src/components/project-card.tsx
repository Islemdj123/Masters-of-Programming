
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn("overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-300 group", className)}>
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-60" />
        <img 
          src={project.bannerUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
          <Calendar className="w-3 h-3 mr-1" />
          {project.date}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}
