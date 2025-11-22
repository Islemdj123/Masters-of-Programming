
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Trash2, LogOut, Loader2, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Member, Project, JoinRequest, Founder, Administration } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const [founders, setFounders] = useState<Founder[]>([]);
  const [administration, setAdministration] = useState<Administration[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Founder Dialog
  const [showAddFounder, setShowAddFounder] = useState(false);
  const [newFounder, setNewFounder] = useState({ fullName: "", role: "", photoUrl: "", description: "" });
  const [founderPhotoPreview, setFounderPhotoPreview] = useState<string>("");
  const [addingFounder, setAddingFounder] = useState(false);

  // Add Admin Dialog
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ fullName: "", role: "", department: "", photoUrl: "", description: "" });
  const [adminPhotoPreview, setAdminPhotoPreview] = useState<string>("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  // Add Member Dialog
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ fullName: "", specialty: "", studyYear: "1", photoUrl: "" });
  const [memberPhotoPreview, setMemberPhotoPreview] = useState<string>("");
  const [addingMember, setAddingMember] = useState(false);

  // Add Project Dialog
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", date: "", description: "", bannerUrl: "" });
  const [projectBannerPreview, setProjectBannerPreview] = useState<string>("");
  const [addingProject, setAddingProject] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const [foundersRes, adminRes, membersRes, projectsRes, requestsRes] = await Promise.all([
        fetch("/api/founders"),
        fetch("/api/administration"),
        fetch("/api/members"),
        fetch("/api/projects"),
        fetch("/api/join-requests"),
      ]);

      if (foundersRes.ok) {
        const data = await foundersRes.json();
        console.log("Founders loaded:", data.length);
        setFounders(data);
      }
      if (adminRes.ok) {
        const data = await adminRes.json();
        console.log("Administration loaded:", data.length);
        setAdministration(data);
      }
      if (membersRes.ok) {
        const data = await membersRes.json();
        console.log("Members loaded:", data.length);
        setMembers(data);
      }
      if (projectsRes.ok) {
        const data = await projectsRes.json();
        console.log("Projects loaded:", data.length);
        setProjects(data);
      }
      if (requestsRes.ok) {
        const data = await requestsRes.json();
        console.log("Requests loaded:", data.length);
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

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      setLocation("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string) => void, setData: (fn: (prev: any) => any) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setPreview(base64String);
        setData((prev: any) => ({ ...prev, photoUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setProjectBannerPreview(base64String);
        setNewProject((prev: any) => ({ ...prev, bannerUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  async function addFounder() {
    if (!newFounder.fullName || !newFounder.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddingFounder(true);
    try {
      const response = await fetch("/api/founders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newFounder.fullName,
          role: newFounder.role,
          photoUrl: newFounder.photoUrl || `https://i.pravatar.cc/300?u=${newFounder.fullName}`,
          description: newFounder.description,
        }),
      });

      if (!response.ok) throw new Error("Failed to add founder");
      
      const addedFounder = await response.json();
      setFounders([...founders, addedFounder]);
      setShowAddFounder(false);
      setNewFounder({ fullName: "", role: "", photoUrl: "", description: "" });
      setFounderPhotoPreview("");
      
      toast({
        title: "Success",
        description: "Founder added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add founder",
        variant: "destructive",
      });
    } finally {
      setAddingFounder(false);
    }
  }

  async function addAdmin() {
    if (!newAdmin.fullName || !newAdmin.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddingAdmin(true);
    try {
      const response = await fetch("/api/administration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newAdmin.fullName,
          role: newAdmin.role,
          department: newAdmin.department,
          photoUrl: newAdmin.photoUrl || `https://i.pravatar.cc/300?u=${newAdmin.fullName}`,
          description: newAdmin.description,
        }),
      });

      if (!response.ok) throw new Error("Failed to add admin");
      
      const addedAdmin = await response.json();
      setAdministration([...administration, addedAdmin]);
      setShowAddAdmin(false);
      setNewAdmin({ fullName: "", role: "", department: "", photoUrl: "", description: "" });
      setAdminPhotoPreview("");
      
      toast({
        title: "Success",
        description: "Admin member added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add admin member",
        variant: "destructive",
      });
    } finally {
      setAddingAdmin(false);
    }
  }

  async function addMember() {
    if (!newMember.fullName || !newMember.specialty) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddingMember(true);
    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newMember.fullName,
          specialty: newMember.specialty,
          studyYear: parseInt(newMember.studyYear),
          photoUrl: newMember.photoUrl || `https://i.pravatar.cc/300?u=${newMember.fullName}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to add member");
      
      const addedMember = await response.json();
      setMembers([...members, addedMember]);
      setShowAddMember(false);
      setNewMember({ fullName: "", specialty: "", studyYear: "1", photoUrl: "" });
      setMemberPhotoPreview("");
      
      toast({
        title: "Success",
        description: "Member added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive",
      });
    } finally {
      setAddingMember(false);
    }
  }

  async function addProject() {
    if (!newProject.title || !newProject.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAddingProject(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProject.title,
          date: newProject.date,
          description: newProject.description,
          bannerUrl: newProject.bannerUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
        }),
      });

      if (!response.ok) throw new Error("Failed to add project");
      
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);
      setShowAddProject(false);
      setNewProject({ title: "", date: "", description: "", bannerUrl: "" });
      setProjectBannerPreview("");
      
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    } finally {
      setAddingProject(false);
    }
  }

  async function deleteFounder(id: string) {
    try {
      const response = await fetch(`/api/founders/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setFounders(founders.filter(m => m.id !== id));
      toast({
        title: "Success",
        description: "Founder deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete founder",
        variant: "destructive",
      });
    }
  }

  async function deleteAdmin(id: string) {
    try {
      const response = await fetch(`/api/administration/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setAdministration(administration.filter(m => m.id !== id));
      toast({
        title: "Success",
        description: "Admin member deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete admin member",
        variant: "destructive",
      });
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
      // Find the join request to get member data
      const request = joinRequests.find(r => r.id === id);
      if (!request) throw new Error("Request not found");

      // Approve the request
      const response = await fetch(`/api/join-requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!response.ok) throw new Error("Failed to approve");

      // Add the person to members
      const memberResponse = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: request.fullName,
          specialty: request.fieldOfStudy,
          studyYear: parseInt(request.studyYear),
          photoUrl: request.photoUrl || "",
        }),
      });
      if (!memberResponse.ok) throw new Error("Failed to add member");

      // Update state
      setJoinRequests(joinRequests.map(r => r.id === id ? { ...r, status: "approved" } : r));
      const newMember = await memberResponse.json();
      setMembers([...members, newMember]);

      toast({
        title: "Success",
        description: "Request approved and member added",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to approve request",
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
          <Tabs defaultValue="founders" className="w-full">
            <TabsList className="grid w-full grid-cols-5 max-w-4xl mb-8">
              <TabsTrigger value="founders">Founders ({founders.length})</TabsTrigger>
              <TabsTrigger value="admin">Admin ({administration.length})</TabsTrigger>
              <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
              <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="requests">Requests ({joinRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="founders">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Founding Members</CardTitle>
                    <CardDescription>Manage club founders</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddFounder(true)} data-testid="button-add-founder">
                    <Plus className="h-4 w-4 mr-2" /> Add Founder
                  </Button>
                </CardHeader>
                <CardContent>
                  {founders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No founders yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {founders.map((founder) => (
                          <TableRow key={founder.id}>
                            <TableCell className="font-medium">{founder.fullName}</TableCell>
                            <TableCell>{founder.role}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteFounder(founder.id)}
                                data-testid={`button-delete-founder-${founder.id}`}
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

            <TabsContent value="admin">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Administration Team</CardTitle>
                    <CardDescription>Manage administration members</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddAdmin(true)} data-testid="button-add-admin">
                    <Plus className="h-4 w-4 mr-2" /> Add Admin
                  </Button>
                </CardHeader>
                <CardContent>
                  {administration.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No administration members yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {administration.map((admin) => (
                          <TableRow key={admin.id}>
                            <TableCell className="font-medium">{admin.fullName}</TableCell>
                            <TableCell>{admin.role}</TableCell>
                            <TableCell>{admin.department}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteAdmin(admin.id)}
                                data-testid={`button-delete-admin-${admin.id}`}
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

            <TabsContent value="members">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Members Management</CardTitle>
                    <CardDescription>View and manage club members</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddMember(true)} data-testid="button-add-member">
                    <Plus className="h-4 w-4 mr-2" /> Add Member
                  </Button>
                </CardHeader>
                <CardContent>
                  {members.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No members yet</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Photo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Specialty</TableHead>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              {member.photoUrl ? (
                                <img 
                                  src={member.photoUrl} 
                                  alt={member.fullName}
                                  className="h-10 w-10 rounded-full object-cover"
                                  data-testid={`img-member-photo-${member.id}`}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-muted"></div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">{member.fullName}</TableCell>
                            <TableCell>{member.specialty || "-"}</TableCell>
                            <TableCell>Year {member.studyYear || "-"}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteMember(member.id)}
                                data-testid={`button-delete-member-${member.id}`}
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Projects Management</CardTitle>
                    <CardDescription>Update project listings</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProject(true)} data-testid="button-add-project">
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
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
                                data-testid={`button-delete-project-${project.id}`}
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
                                    data-testid={`button-approve-request-${request.id}`}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive"
                                    onClick={() => deleteRequest(request.id)}
                                    data-testid={`button-reject-request-${request.id}`}
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

      {/* Add Founder Dialog */}
      <Dialog open={showAddFounder} onOpenChange={setShowAddFounder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Founder</DialogTitle>
            <DialogDescription>Add a new club founder</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="founder-name">Full Name *</Label>
              <Input
                id="founder-name"
                placeholder="John Doe"
                value={newFounder.fullName}
                onChange={(e) => setNewFounder({ ...newFounder, fullName: e.target.value })}
                data-testid="input-founder-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founder-role">Role *</Label>
              <Input
                id="founder-role"
                placeholder="Co-Founder"
                value={newFounder.role}
                onChange={(e) => setNewFounder({ ...newFounder, role: e.target.value })}
                data-testid="input-founder-role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founder-description">Description</Label>
              <Input
                id="founder-description"
                placeholder="Brief bio..."
                value={newFounder.description}
                onChange={(e) => setNewFounder({ ...newFounder, description: e.target.value })}
                data-testid="input-founder-description"
              />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              {founderPhotoPreview && (
                <img src={founderPhotoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, setFounderPhotoPreview, setNewFounder)}
                data-testid="input-founder-photo"
              />
            </div>
            <Button 
              onClick={addFounder} 
              disabled={addingFounder}
              className="w-full"
              data-testid="button-submit-founder"
            >
              {addingFounder ? "Adding..." : "Add Founder"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Admin Dialog */}
      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Admin Member</DialogTitle>
            <DialogDescription>Add a new administration team member</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Full Name *</Label>
              <Input
                id="admin-name"
                placeholder="Jane Doe"
                value={newAdmin.fullName}
                onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
                data-testid="input-admin-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-role">Role *</Label>
              <Input
                id="admin-role"
                placeholder="President"
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                data-testid="input-admin-role"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-department">Department</Label>
              <Input
                id="admin-department"
                placeholder="Executive Board"
                value={newAdmin.department}
                onChange={(e) => setNewAdmin({ ...newAdmin, department: e.target.value })}
                data-testid="input-admin-department"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-description">Description</Label>
              <Input
                id="admin-description"
                placeholder="Brief bio..."
                value={newAdmin.description}
                onChange={(e) => setNewAdmin({ ...newAdmin, description: e.target.value })}
                data-testid="input-admin-description"
              />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              {adminPhotoPreview && (
                <img src={adminPhotoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, setAdminPhotoPreview, setNewAdmin)}
                data-testid="input-admin-photo"
              />
            </div>
            <Button 
              onClick={addAdmin} 
              disabled={addingAdmin}
              className="w-full"
              data-testid="button-submit-admin"
            >
              {addingAdmin ? "Adding..." : "Add Admin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>Add a new club member</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-name">Full Name *</Label>
              <Input
                id="member-name"
                placeholder="John Doe"
                value={newMember.fullName}
                onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                data-testid="input-member-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-specialty">Specialty *</Label>
              <Input
                id="member-specialty"
                placeholder="Web Development"
                value={newMember.specialty}
                onChange={(e) => setNewMember({ ...newMember, specialty: e.target.value })}
                data-testid="input-member-specialty"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-year">Study Year</Label>
              <Input
                id="member-year"
                type="number"
                min="1"
                max="4"
                placeholder="1"
                value={newMember.studyYear}
                onChange={(e) => setNewMember({ ...newMember, studyYear: e.target.value })}
                data-testid="input-member-year"
              />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              {memberPhotoPreview && (
                <img src={memberPhotoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, setMemberPhotoPreview, setNewMember)}
                data-testid="input-member-photo"
              />
            </div>
            <Button 
              onClick={addMember} 
              disabled={addingMember}
              className="w-full"
              data-testid="button-submit-member"
            >
              {addingMember ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Add a new club project</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Title *</Label>
              <Input
                id="project-title"
                placeholder="Hackathon 2024"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                data-testid="input-project-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-date">Date *</Label>
              <Input
                id="project-date"
                placeholder="October 15, 2024"
                value={newProject.date}
                onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                data-testid="input-project-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Input
                id="project-description"
                placeholder="Project description..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                data-testid="input-project-description"
              />
            </div>
            <div className="space-y-2">
              <Label>Banner Image</Label>
              {projectBannerPreview && (
                <img src={projectBannerPreview} alt="Preview" className="w-full h-24 rounded-lg object-cover mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                data-testid="input-project-banner"
              />
            </div>
            <Button 
              onClick={addProject} 
              disabled={addingProject}
              className="w-full"
              data-testid="button-submit-project"
            >
              {addingProject ? "Adding..." : "Add Project"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
