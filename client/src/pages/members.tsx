
import { Layout } from "@/components/layout";
import { members } from "@/lib/data";
import { MemberCard } from "@/components/member-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Members() {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(member => 
    member.fullName.toLowerCase().includes(search.toLowerCase()) ||
    member.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Members</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No members found matching "{search}"
          </div>
        )}
      </div>
    </Layout>
  );
}
