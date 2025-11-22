
import { Layout } from "@/components/layout";
import { MemberCard } from "@/components/member-card";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { Member } from "@shared/schema";

export default function Members() {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const response = await fetch("/api/members");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load members");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(search.toLowerCase()) ||
    member.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Video Hero Section */}
      <section className="relative w-full h-80 overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          data-testid="members-hero-video"
        >
          <source
            src="https://videos.pexels.com/video-files/3209828/3209828-hd_1080_1920_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-indigo-600/30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Our Members</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A diverse community of students passionate about technology.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search members by name or specialty..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">{error}</div>
        )}

        {!loading && filteredMembers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {!loading && filteredMembers.length === 0 && !error && (
          <div className="text-center py-12 text-muted-foreground">
            {members.length === 0 ? "No members found" : `No members found matching "${search}"`}
          </div>
        )}
      </div>
    </Layout>
  );
}
