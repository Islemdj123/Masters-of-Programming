
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Trash2, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Member, Project, JoinRequest } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      setLocation("/login");
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [setLocation]);

  async function fetchData() {
    setLoading(true);
    try {
      const [membersRes, projectsRes, requestsRes] = await Promise.all([
        fetch("/api/members"),
        fetch("/api/projects"),
        fetch("/api/join-requests"),
      ]);

      if (membersRes.ok) {
        const data = await membersRes.json();
        setMembers(data);
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        setProjects(data);
      }
      if (requestsRes.ok) {
        const data = await requestsRes.json();
        setJoinRequests(data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteMember(id: string) {
    try {
      const response = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setMembers(members.filter(m => m.id !== id));
      toast({
        title: "Success",
        description: "Member deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  }

  async function deleteProject(id: string) {
    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  }

  async function approveRequest(id: string) {
    try {
      const response = await fetch(`/api/join-requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!response.ok) throw new Error("Failed to approve");
      setJoinRequests(joinRequests.map(r => r.id === id ? { ...r, status: "approved" } : r));
      toast({
        title: "Success",
        description: "Request approved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive",
      });
    }
  }

  async function deleteRequest(id: string) {
    try {
      const response = await fetch(`/api/join-requests/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setJoinRequests(joinRequests.filter(r => r.id !== id));
      toast({
        title: "Success",
        description: "Request deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your club content and members</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : (
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
              <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="requests">Requests ({joinRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Members Management</CardTitle>
                  <CardDescription>View and manage club members</CardDescription>
                </CardHeader>
                <CardContent>
                  {members.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No members yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.fullName}</TableCell>
                            <TableCell>{member.specialty || "-"}</TableCell>
                            <TableCell>Year {member.studyYear || "-"}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteMember(member.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Management</CardTitle>
                  <CardDescription>Update project listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No projects yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.date}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Requests</CardTitle>
                  <CardDescription>Review new membership applications</CardDescription>
                </CardHeader>
                <CardContent>
                  {joinRequests.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No join requests</p>
                  ) : (
                    <div className="space-y-4">
                      {joinRequests.map((request) => (
                        <Card key={request.id} className="p-4">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <p className="font-medium">{request.fullName}</p>
                              <p className="text-sm text-muted-foreground">{request.email}</p>
                              <p className="text-sm text-muted-foreground">{request.fieldOfStudy}</p>
                              <p className="text-sm mt-2 italic">"{request.motivation}"</p>
                            </div>
                            <div className="flex gap-2">
                              {request.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="text-green-600 border-green-600/20 hover:bg-green-50"
                                    variant="outline"
                                    onClick={() => approveRequest(request.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive"
                                    onClick={() => deleteRequest(request.id)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                              {request.status === "approved" && (
                                <span className="text-green-600 font-medium">✓ Approved</span>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
