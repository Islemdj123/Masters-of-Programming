
import { Layout } from "@/components/layout";
import { MemberCard } from "@/components/member-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Administration } from "@shared/schema";

export default function AdministrationPage() {
  const [administration, setAdministration] = useState<Administration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdministration();
  }, []);

  async function fetchAdministration() {
    try {
      const response = await fetch("/api/administration");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAdministration(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load administration");
      setAdministration([]);
    } finally {
      setLoading(false);
    }
  }

  const executiveBoard = administration.filter(m => m.department === "Executive Board");
  const departments = administration.filter(m => m.department !== "Executive Board");

  return (
    <Layout>
      {/* Video Hero Section */}
      <section className="relative w-full h-80 bg-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="admin-hero-video"
        >
          <source
            src="https://videos.pexels.com/video-files/3196782/3196782-hd_720_1280_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Administration Team</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated leaders managing our club's operations and initiatives for the current academic year.
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

        {!loading && !error && administration.length > 0 && (
          <Tabs defaultValue="all" className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Team</TabsTrigger>
                <TabsTrigger value="executive">Executive Board</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {administration.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="executive" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {executiveBoard.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="departments" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {departments.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
