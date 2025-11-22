
import { Layout } from "@/components/layout";
import { administration } from "@/lib/data";
import { MemberCard } from "@/components/member-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Administration() {
  const executiveBoard = administration.filter(m => m.department === "Executive Board");
  const departments = administration.filter(m => m.department !== "Executive Board");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Administration Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated leaders managing our club's operations and initiatives for the current academic year.
          </p>
        </div>

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
      </div>
    </Layout>
  );
}
