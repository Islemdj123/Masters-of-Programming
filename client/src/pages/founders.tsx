
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Founding Members</h1>
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
