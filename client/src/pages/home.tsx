
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Code, Terminal, Users, Cpu } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { AnimatedBackground } from "@/components/animated-background";
import heroBg from "@assets/generated_images/hero_background_for_programming_club.png";
import { useEffect, useState } from "react";
import type { ClubSettings } from "@shared/schema";

export default function Home() {
  const [clubSettings, setClubSettings] = useState<ClubSettings | null>(null);

  useEffect(() => {
    fetch("/api/club-settings")
      .then(res => res.json())
      .then(data => setClubSettings(data))
      .catch(err => console.error("Failed to load club settings:", err));
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Club Logo/Banner (Priority) */}
        {clubSettings?.heroBannerUrl ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={clubSettings.heroBannerUrl} 
              alt="Masters of Programming Background" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
          </div>
        ) : (
          <>
            {/* Background Video Fallback */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
              data-testid="hero-background-video"
            >
              <source
                src="https://videos.pexels.com/video-files/3196782/3196782-hd_720_1280_25fps.mp4"
                type="video/mp4"
              />
            </video>
            {/* Dynamic Animated Background Fallback */}
            <AnimatedBackground />
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-background/90 via-background/60 to-background pointer-events-none" />
          </>
        )}

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="hero-badge drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }} data-testid="hero-badge">
            Welcome to the future of code
          </div>
          <h1 className="hero-title text-foreground drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }} data-testid="hero-title">
            Masters of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Programming</span>
          </h1>
          <p className="hero-subtitle text-foreground font-semibold drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }} data-testid="hero-subtitle">
            We build, innovate, learn, and share knowledge. Join the premier community for developers at University Abbas Laghrour Khenchela.
          </p>
          <div className="hero-buttons" data-testid="hero-buttons">
            <Link href="/join">
              <Button size="lg" className="modern-button text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20" data-testid="button-join-hero">
                Join Us <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="modern-button text-lg px-8 h-14 border-primary/20 hover:bg-primary/10" data-testid="button-projects-hero">
                See Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Join Masters of Programming?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Unlock your potential through learning, innovation, and collaboration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card group" data-testid="feature-card-workshops">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                <Terminal className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Workshops & Training</h3>
              <p className="text-muted-foreground leading-relaxed">
                Regular hands-on sessions on the latest technologies, from web development to AI and cybersecurity.
              </p>
            </div>
            <div className="feature-card group" data-testid="feature-card-hackathons">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hackathons & Competitions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Participate in intense coding competitions, solve real-world problems, and win amazing prizes.
              </p>
            </div>
            <div className="feature-card group" data-testid="feature-card-community">
              <div className="h-16 w-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Community & Networking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with like-minded students, alumni, and industry professionals. Build your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="projects-title">Recent Projects</h2>
              <p className="text-xl text-muted-foreground">Explore the innovative projects built by our community</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="mt-4 md:mt-0 text-lg" data-testid="button-view-all-projects">View All Projects <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="project-card-animated" data-testid={`project-card-${project.id}`}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700" data-testid="cta-title">Ready to start your journey?</h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Whether you're a beginner or an expert, there's a place for you at Masters of Programming. Join our growing community of innovators and builders today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <Link href="/join">
              <Button size="lg" className="modern-button text-lg px-10 h-14 w-full sm:w-auto" data-testid="button-join-cta">Start Your Journey</Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="modern-button text-lg px-10 h-14 w-full sm:w-auto" data-testid="button-explore-cta">Explore Projects</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
