
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Code2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Founders", href: "/founders" },
    { name: "Administration", href: "/administration" },
    { name: "Members", href: "/members" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-border/40 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
            <Code2 className="h-8 w-8" />
            <span className="hidden sm:inline">Masters of Programming</span>
            <span className="sm:hidden">MOP</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </a>
            </Link>
          ))}
          <Link href="/join">
            <Button size="sm" className="font-semibold">Join Us</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-base font-medium py-2 border-b border-border/50 transition-colors",
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </Link>
            ))}
            <Link href="/join">
              <Button className="w-full mt-2" onClick={() => setIsOpen(false)}>Join Us</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
            <Code2 className="h-6 w-6" />
            Masters of Programming
          </div>
          <p className="text-muted-foreground max-w-md mb-6">
            We are a community of passionate student developers, designers, and innovators building the future of technology together.
          </p>
          <div className="flex gap-4">
            {/* Social icons would go here */}
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="sr-only">Twitter</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
              <span className="sr-only">GitHub</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Club</h3>
          <ul className="space-y-2">
            <li><Link href="/about"><a className="text-muted-foreground hover:text-primary transition-colors">About Us</a></Link></li>
            <li><Link href="/founders"><a className="text-muted-foreground hover:text-primary transition-colors">History</a></Link></li>
            <li><Link href="/administration"><a className="text-muted-foreground hover:text-primary transition-colors">Team</a></Link></li>
            <li><Link href="/contact"><a className="text-muted-foreground hover:text-primary transition-colors">Contact</a></Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Activities</h3>
          <ul className="space-y-2">
            <li><Link href="/projects"><a className="text-muted-foreground hover:text-primary transition-colors">Projects</a></Link></li>
            <li><Link href="/projects"><a className="text-muted-foreground hover:text-primary transition-colors">Hackathons</a></Link></li>
            <li><Link href="/projects"><a className="text-muted-foreground hover:text-primary transition-colors">Workshops</a></Link></li>
            <li><Link href="/join"><a className="text-muted-foreground hover:text-primary transition-colors">Join Us</a></Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
        &copy; {new Date().getFullYear()} Masters of Programming. All rights reserved.
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
