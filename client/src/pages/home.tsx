
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Code, Terminal, Users, Cpu } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import heroBg from "@assets/generated_images/hero_background_for_programming_club.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Masters of Programming Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            Welcome to the future of code
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Masters of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Programming</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            We build, innovate, learn, and share knowledge. Join the premier community for developers at University Abbas Laghrour Khenchela.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Link href="/join">
              <Button size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                Join Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 border-primary/20 hover:bg-primary/10">
                See Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Workshops & Training</h3>
              <p className="text-muted-foreground">
                Regular hands-on sessions on the latest technologies, from web development to AI and cybersecurity.
              </p>
            </div>
            <div className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hackathons</h3>
              <p className="text-muted-foreground">
                Participate in intense coding competitions, solve real-world problems, and win amazing prizes.
              </p>
            </div>
            <div className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded students, alumni, and industry professionals. Build your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Projects</h2>
              <p className="text-muted-foreground">See what we've been working on</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Whether you're a beginner or an expert, there's a place for you at Masters of Programming.
          </p>
          <Link href="/join">
            <Button size="lg" className="text-lg px-10 h-14">Join the Club</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
