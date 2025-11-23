import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";
import {
  insertFounderSchema,
  insertAdministrationSchema,
  insertMemberSchema,
  insertProjectSchema,
  insertJoinRequestSchema,
  insertContactMessageSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database on startup
  await seedDatabase();
  // Login route
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
      }

      const user = await storage.getUserByUsername(username);
      
      // Simple password comparison (in production, use bcrypt or similar)
      if (user && user.password === password) {
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Create user route
  app.post("/api/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
      }

      const user = await storage.createUser({ username, password });
      res.status(201).json({ success: true, user });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Founders routes
  app.get("/api/founders", async (_req, res) => {
    try {
      const founders = await storage.getAllFounders();
      res.json(founders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch founders" });
    }
  });

  app.post("/api/founders", async (req, res) => {
    try {
      const validatedData = insertFounderSchema.parse(req.body);
      const founder = await storage.createFounder(validatedData);
      res.status(201).json(founder);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/founders/:id", async (req, res) => {
    try {
      const founder = await storage.updateFounder(req.params.id, req.body);
      if (!founder) {
        res.status(404).json({ error: "Founder not found" });
        return;
      }
      res.json(founder);
    } catch (error) {
      res.status(400).json({ error: "Failed to update founder" });
    }
  });

  app.delete("/api/founders/:id", async (req, res) => {
    try {
      const success = await storage.deleteFounder(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Founder not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete founder" });
    }
  });

  // Administration routes
  app.get("/api/administration", async (_req, res) => {
    try {
      const administration = await storage.getAllAdministration();
      res.json(administration);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch administration" });
    }
  });

  app.post("/api/administration", async (req, res) => {
    try {
      const validatedData = insertAdministrationSchema.parse(req.body);
      const admin = await storage.createAdministration(validatedData);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/administration/:id", async (req, res) => {
    try {
      const admin = await storage.updateAdministration(req.params.id, req.body);
      if (!admin) {
        res.status(404).json({ error: "Administration not found" });
        return;
      }
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: "Failed to update administration" });
    }
  });

  app.delete("/api/administration/:id", async (req, res) => {
    try {
      const success = await storage.deleteAdministration(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Administration not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete administration" });
    }
  });

  // Members routes
  app.get("/api/members", async (_req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  });

  app.post("/api/members", async (req, res) => {
    try {
      const validatedData = insertMemberSchema.parse(req.body);
      const member = await storage.createMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/members/:id", async (req, res) => {
    try {
      const member = await storage.updateMember(req.params.id, req.body);
      if (!member) {
        res.status(404).json({ error: "Member not found" });
        return;
      }
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Failed to update member" });
    }
  });

  app.delete("/api/members/:id", async (req, res) => {
    try {
      const success = await storage.deleteMember(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Member not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete member" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Join requests routes
  app.get("/api/join-requests", async (_req, res) => {
    try {
      const requests = await storage.getAllJoinRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch join requests" });
    }
  });

  app.post("/api/join-requests", async (req, res) => {
    try {
      const validatedData = insertJoinRequestSchema.parse(req.body);
      const request = await storage.createJoinRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.put("/api/join-requests/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const request = await storage.updateJoinRequestStatus(req.params.id, status);
      if (!request) {
        res.status(404).json({ error: "Join request not found" });
        return;
      }
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update join request status" });
    }
  });

  app.delete("/api/join-requests/:id", async (req, res) => {
    try {
      const success = await storage.deleteJoinRequest(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Join request not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete join request" });
    }
  });

  // Club Settings routes
  app.get("/api/club-settings", async (_req, res) => {
    try {
      const settings = await storage.getClubSettings();
      res.json(settings || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch club settings" });
    }
  });

  app.put("/api/club-settings", async (req, res) => {
    try {
      const { logoUrl, heroBannerUrl } = req.body;
      const settings = await storage.updateClubSettings({ logoUrl, heroBannerUrl });
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Failed to update club settings" });
    }
  });

  // Contact Messages routes
  app.get("/api/contact-messages", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/contact-messages", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;
      const validatedData = insertContactMessageSchema.parse({ firstName, lastName, email, message });
      const newMessage = await storage.createContactMessage(validatedData);
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  app.delete("/api/contact-messages/:id", async (req, res) => {
    try {
      const success = await storage.deleteContactMessage(req.params.id);
      if (!success) {
        res.status(404).json({ error: "Message not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  // Admin route to clear database (for development)
  app.delete("/api/admin/reset-database", async (_req, res) => {
    try {
      const founders = await storage.getAllFounders();
      for (const founder of founders) {
        await storage.deleteFounder(founder.id);
      }

      const admins = await storage.getAllAdministration();
      for (const admin of admins) {
        await storage.deleteAdministration(admin.id);
      }

      const members = await storage.getAllMembers();
      for (const member of members) {
        await storage.deleteMember(member.id);
      }

      const projects = await storage.getAllProjects();
      for (const project of projects) {
        await storage.deleteProject(project.id);
      }

      const requests = await storage.getAllJoinRequests();
      for (const request of requests) {
        await storage.deleteJoinRequest(request.id);
      }

      res.json({ message: "Database cleared successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear database" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
