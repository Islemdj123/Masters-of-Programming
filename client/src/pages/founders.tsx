
import { Layout } from "@/components/layout";
import { MemberCard } from "@/components/member-card";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Founder } from "@shared/schema";

export default function Founders() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFounders();
  }, []);

  async function fetchFounders() {
    try {
      const response = await fetch("/api/founders");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setFounders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load founders");
      setFounders([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      {/* Animated Hero Section */}
      <section className="relative w-full h-80 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/40 to-purple-900/60" />
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-40 h-40 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        {/* Text Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Our Founding Members</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The visionaries who started it all. Their dedication laid the foundation for what Masters of Programming is today.
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

        {!loading && founders.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground">
            No founders found
          </div>
        )}

        {!loading && founders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {founders.map((founder) => (
              <MemberCard key={founder.id} member={founder} className="border-primary/20" />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
