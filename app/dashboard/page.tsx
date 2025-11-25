'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import type { Founder, Administration, Member, Project, JoinRequest, ContactMessage } from "@/lib/utils";
import { founders as fallbackFounders, administration as fallbackAdministration, members as fallbackMembers, projects as fallbackProjects } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("founders");
  const [loading, setLoading] = useState(true);
  
  const [founders, setFounders] = useState<Founder[]>([]);
  const [administration, setAdministration] = useState<Administration[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  async function fetchData() {
    setLoading(true);
    try {
      const [foundersRes, adminRes, membersRes, projectsRes, requestsRes, messagesRes] = await Promise.all([
        fetch("/api/founders"),
        fetch("/api/administration"),
        fetch("/api/members"),
        fetch("/api/projects"),
        fetch("/api/join-requests"),
        fetch("/api/contact-messages"),
      ]);

      if (foundersRes.ok) setFounders(await foundersRes.json());
      else setFounders(fallbackFounders as Founder[]);
      
      if (adminRes.ok) setAdministration(await adminRes.json());
      else setAdministration(fallbackAdministration as Administration[]);
      
      if (membersRes.ok) setMembers(await membersRes.json());
      else setMembers(fallbackMembers);
      
      if (projectsRes.ok) setProjects(await projectsRes.json());
      else setProjects(fallbackProjects);
      
      if (requestsRes.ok) setJoinRequests(await requestsRes.json());
      if (messagesRes.ok) setContactMessages(await messagesRes.json());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
      setFounders(fallbackFounders as Founder[]);
      setAdministration(fallbackAdministration as Administration[]);
      setMembers(fallbackMembers);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  async function deleteItem(endpoint: string, id: string, itemType: string, setState: any, items: any[]) {
    try {
      const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setState(items.filter((item: any) => item.id !== id));
      toast({
        title: "Success",
        description: `${itemType} deleted successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${itemType}`,
        variant: "destructive",
      });
    }
  }

  async function approveRequest(id: string) {
    try {
      const request = joinRequests.find(r => r.id === id);
      if (!request) throw new Error("Request not found");

      const response = await fetch(`/api/join-requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!response.ok) throw new Error("Failed to approve");

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

  if (!isAuthenticated) return null;

  const tabs = [
    { id: "founders", label: "Founders", count: founders.length },
    { id: "admin", label: "Administration", count: administration.length },
    { id: "members", label: "Members", count: members.length },
    { id: "projects", label: "Projects", count: projects.length },
    { id: "requests", label: "Join Requests", count: joinRequests.length },
    { id: "messages", label: "Messages", count: contactMessages.length },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your club content and members</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-input hover:bg-destructive/10 text-destructive transition-colors rounded-md flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 border-b-2 transition-colors text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="rounded-lg border bg-card">
              {activeTab === "founders" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Founding Members</h2>
                  {founders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No founders yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {founders.map((founder) => (
                            <tr key={founder.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{founder.fullName}</td>
                              <td className="py-3 px-4">{founder.role}</td>
                              <td className="text-right py-3 px-4">
                                <button
                                  onClick={() => deleteItem("/api/founders", String(founder.id), "Founder", setFounders, founders)}
                                  className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "admin" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Administration Team</h2>
                  {administration.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No administration members</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Department</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {administration.map((admin) => (
                            <tr key={admin.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{admin.fullName}</td>
                              <td className="py-3 px-4">{admin.role}</td>
                              <td className="py-3 px-4">{admin.department}</td>
                              <td className="text-right py-3 px-4">
                                <button
                                  onClick={() => deleteItem("/api/administration", String(admin.id), "Admin", setAdministration, administration)}
                                  className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "members" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Members</h2>
                  {members.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No members</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Specialty</th>
                            <th className="text-left py-3 px-4">Year</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{member.fullName}</td>
                              <td className="py-3 px-4">{member.specialty}</td>
                              <td className="py-3 px-4">{member.studyYear}</td>
                              <td className="text-right py-3 px-4">
                                <button
                                  onClick={() => deleteItem("/api/members", String(member.id), "Member", setMembers, members)}
                                  className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Projects</h2>
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No projects</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr>
                            <th className="text-left py-3 px-4">Title</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project) => (
                            <tr key={project.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{project.title}</td>
                              <td className="py-3 px-4">{project.date}</td>
                              <td className="text-right py-3 px-4">
                                <button
                                  onClick={() => deleteItem("/api/projects", String(project.id), "Project", setProjects, projects)}
                                  className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "requests" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Join Requests</h2>
                  {joinRequests.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No requests</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr>
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Email</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {joinRequests.map((request) => (
                            <tr key={request.id} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{request.fullName}</td>
                              <td className="py-3 px-4">{request.email}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded text-sm ${request.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="text-right py-3 px-4 space-x-2">
                                {request.status !== "approved" && (
                                  <button
                                    onClick={() => approveRequest(String(request.id))}
                                    className="px-2 py-1 bg-green-600 text-white hover:bg-green-700 rounded text-sm transition-colors"
                                  >
                                    Approve
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteItem("/api/join-requests", String(request.id), "Request", setJoinRequests, joinRequests)}
                                  className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors inline-block"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "messages" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
                  {contactMessages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No messages</p>
                  ) : (
                    <div className="space-y-4">
                      {contactMessages.map((message) => (
                        <div key={message.id} className="border rounded-lg p-4 hover:bg-muted/50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{message.firstName} {message.lastName}</p>
                              <p className="text-sm text-muted-foreground">{message.email}</p>
                            </div>
                            <button
                              onClick={() => deleteItem("/api/contact-messages", String(message.id), "Message", setContactMessages, contactMessages)}
                              className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-sm mt-3">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
