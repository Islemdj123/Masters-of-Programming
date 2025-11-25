"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          <Code2 className="h-8 w-8" />
          <span className="hidden sm:inline">Masters of Programming</span>
          <span className="sm:hidden">MOP</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/40">
            <Link href="/login">
              <Button variant="outline" size="sm" data-testid="button-admin-login">Admin</Button>
            </Link>
            <Link href="/join">
              <Button size="sm" className="font-semibold" data-testid="button-join-us">Join Us</Button>
            </Link>
          </div>
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-menu-toggle"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-border/50 transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full" data-testid="button-mobile-admin">Admin Login</Button>
            </Link>
            <Link href="/join" onClick={() => setIsOpen(false)}>
              <Button className="w-full" data-testid="button-mobile-join">Join Us</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
