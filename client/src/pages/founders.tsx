
import { Layout } from "@/components/layout";
import { founders } from "@/lib/data";
import { MemberCard } from "@/components/member-card";

export default function Founders() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Founding Members</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The visionaries who started it all. Their dedication laid the foundation for what Masters of Programming is today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((founder) => (
            <MemberCard key={founder.id} member={founder} className="border-primary/20" />
          ))}
        </div>
      </div>
    </Layout>
  );
}
