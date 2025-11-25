import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/shared/schema";
import type {
  User,
  InsertUser,
  Founder,
  InsertFounder,
  Administration,
  InsertAdministration,
  Member,
  InsertMember,
  Project,
  InsertProject,
  JoinRequest,
  InsertJoinRequest,
  ClubSettings,
  ContactMessage,
  InsertContactMessage,
} from "@/shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export class DatabaseStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(schema.users).where(eq(schema.users.username, username));
      return result?.[0];
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const result = await db.insert(schema.users).values(user).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getAllFounders(): Promise<Founder[]> {
    try {
      const result = await db.select().from(schema.founders);
      return result || [];
    } catch (error) {
      console.error("Error getting all founders:", error);
      return [];
    }
  }

  async getFounder(id: string): Promise<Founder | undefined> {
    try {
      const result = await db.select().from(schema.founders).where(eq(schema.founders.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting founder:", error);
      return undefined;
    }
  }

  async createFounder(founder: InsertFounder): Promise<Founder> {
    try {
      const result = await db.insert(schema.founders).values(founder).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating founder:", error);
      throw error;
    }
  }

  async updateFounder(id: string, founder: Partial<InsertFounder>): Promise<Founder | undefined> {
    try {
      const result = await db.update(schema.founders).set(founder).where(eq(schema.founders.id, id)).returning();
      return result?.[0];
    } catch (error) {
      console.error("Error updating founder:", error);
      return undefined;
    }
  }

  async deleteFounder(id: string): Promise<boolean> {
    try {
      await db.delete(schema.founders).where(eq(schema.founders.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting founder:", error);
      return false;
    }
  }

  async getAllAdministration(): Promise<Administration[]> {
    try {
      const result = await db.select().from(schema.administration).orderBy(schema.administration.displayOrder);
      return result || [];
    } catch (error) {
      console.error("Error getting all administration:", error);
      return [];
    }
  }

  async getAdministration(id: string): Promise<Administration | undefined> {
    try {
      const result = await db.select().from(schema.administration).where(eq(schema.administration.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting administration:", error);
      return undefined;
    }
  }

  async createAdministration(admin: InsertAdministration): Promise<Administration> {
    try {
      const result = await db.insert(schema.administration).values(admin).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating administration:", error);
      throw error;
    }
  }

  async updateAdministration(id: string, admin: Partial<InsertAdministration>): Promise<Administration | undefined> {
    try {
      const result = await db.update(schema.administration).set(admin).where(eq(schema.administration.id, id)).returning();
      return result?.[0];
    } catch (error) {
      console.error("Error updating administration:", error);
      return undefined;
    }
  }

  async deleteAdministration(id: string): Promise<boolean> {
    try {
      await db.delete(schema.administration).where(eq(schema.administration.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting administration:", error);
      return false;
    }
  }

  async getAllMembers(): Promise<Member[]> {
    try {
      const result = await db.select().from(schema.members);
      return result || [];
    } catch (error) {
      console.error("Error getting all members:", error);
      return [];
    }
  }

  async getMember(id: string): Promise<Member | undefined> {
    try {
      const result = await db.select().from(schema.members).where(eq(schema.members.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting member:", error);
      return undefined;
    }
  }

  async createMember(member: InsertMember): Promise<Member> {
    try {
      const result = await db.insert(schema.members).values(member).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating member:", error);
      throw error;
    }
  }

  async updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined> {
    try {
      const result = await db.update(schema.members).set(member).where(eq(schema.members.id, id)).returning();
      return result?.[0];
    } catch (error) {
      console.error("Error updating member:", error);
      return undefined;
    }
  }

  async deleteMember(id: string): Promise<boolean> {
    try {
      await db.delete(schema.members).where(eq(schema.members.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting member:", error);
      return false;
    }
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const result = await db.select().from(schema.projects);
      return result || [];
    } catch (error) {
      console.error("Error getting all projects:", error);
      return [];
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    try {
      const result = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting project:", error);
      return undefined;
    }
  }

  async createProject(project: InsertProject): Promise<Project> {
    try {
      const result = await db.insert(schema.projects).values(project).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    try {
      const result = await db.update(schema.projects).set(project).where(eq(schema.projects.id, id)).returning();
      return result?.[0];
    } catch (error) {
      console.error("Error updating project:", error);
      return undefined;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    try {
      await db.delete(schema.projects).where(eq(schema.projects.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }

  async getAllJoinRequests(): Promise<JoinRequest[]> {
    try {
      const result = await db.select().from(schema.joinRequests);
      return result || [];
    } catch (error) {
      console.error("Error getting all join requests:", error);
      return [];
    }
  }

  async getJoinRequest(id: string): Promise<JoinRequest | undefined> {
    try {
      const result = await db.select().from(schema.joinRequests).where(eq(schema.joinRequests.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting join request:", error);
      return undefined;
    }
  }

  async createJoinRequest(request: InsertJoinRequest): Promise<JoinRequest> {
    try {
      const result = await db.insert(schema.joinRequests).values(request).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating join request:", error);
      throw error;
    }
  }

  async updateJoinRequestStatus(id: string, status: string): Promise<JoinRequest | undefined> {
    try {
      const result = await db.update(schema.joinRequests).set({ status }).where(eq(schema.joinRequests.id, id)).returning();
      return result?.[0];
    } catch (error) {
      console.error("Error updating join request status:", error);
      return undefined;
    }
  }

  async deleteJoinRequest(id: string): Promise<boolean> {
    try {
      await db.delete(schema.joinRequests).where(eq(schema.joinRequests.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting join request:", error);
      return false;
    }
  }

  async getClubSettings(): Promise<ClubSettings | undefined> {
    try {
      const result = await db.select().from(schema.clubSettings).limit(1);
      return result?.[0];
    } catch (error) {
      console.error("Error getting club settings:", error);
      return undefined;
    }
  }

  async updateClubSettings(settings: Partial<ClubSettings>): Promise<ClubSettings> {
    try {
      const existing = await this.getClubSettings();
      if (existing) {
        const result = await db.update(schema.clubSettings).set(settings).where(eq(schema.clubSettings.id, existing.id)).returning();
        return result[0];
      } else {
        const result = await db.insert(schema.clubSettings).values(settings as any).returning();
        return result[0];
      }
    } catch (error) {
      console.error("Error updating club settings:", error);
      throw error;
    }
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      const result = await db.select().from(schema.contactMessages);
      return result || [];
    } catch (error) {
      console.error("Error getting all contact messages:", error);
      return [];
    }
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    try {
      const result = await db.select().from(schema.contactMessages).where(eq(schema.contactMessages.id, id));
      return result?.[0];
    } catch (error) {
      console.error("Error getting contact message:", error);
      return undefined;
    }
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    try {
      const result = await db.insert(schema.contactMessages).values(message).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting contact message:", error);
      return false;
    }
  }
}

export const storage = new DatabaseStorage();
