import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import { Pool } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
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
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Founder operations
  getAllFounders(): Promise<Founder[]>;
  getFounder(id: string): Promise<Founder | undefined>;
  createFounder(founder: InsertFounder): Promise<Founder>;
  updateFounder(id: string, founder: Partial<InsertFounder>): Promise<Founder | undefined>;
  deleteFounder(id: string): Promise<boolean>;

  // Administration operations
  getAllAdministration(): Promise<Administration[]>;
  getAdministration(id: string): Promise<Administration | undefined>;
  createAdministration(admin: InsertAdministration): Promise<Administration>;
  updateAdministration(id: string, admin: Partial<InsertAdministration>): Promise<Administration | undefined>;
  deleteAdministration(id: string): Promise<boolean>;

  // Member operations
  getAllMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;
  deleteMember(id: string): Promise<boolean>;

  // Project operations
  getAllProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Join request operations
  getAllJoinRequests(): Promise<JoinRequest[]>;
  getJoinRequest(id: string): Promise<JoinRequest | undefined>;
  createJoinRequest(request: InsertJoinRequest): Promise<JoinRequest>;
  updateJoinRequestStatus(id: string, status: string): Promise<JoinRequest | undefined>;
  deleteJoinRequest(id: string): Promise<boolean>;
}

export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool, { schema });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(schema.users).values(insertUser).returning();
    return result[0];
  }

  // Founder operations
  async getAllFounders(): Promise<Founder[]> {
    return await this.db.select().from(schema.founders);
  }

  async getFounder(id: string): Promise<Founder | undefined> {
    const result = await this.db.select().from(schema.founders).where(eq(schema.founders.id, id));
    return result[0];
  }

  async createFounder(founder: InsertFounder): Promise<Founder> {
    const result = await this.db.insert(schema.founders).values(founder).returning();
    return result[0];
  }

  async updateFounder(id: string, founder: Partial<InsertFounder>): Promise<Founder | undefined> {
    const result = await this.db.update(schema.founders).set(founder).where(eq(schema.founders.id, id)).returning();
    return result[0];
  }

  async deleteFounder(id: string): Promise<boolean> {
    const result = await this.db.delete(schema.founders).where(eq(schema.founders.id, id)).returning();
    return result.length > 0;
  }

  // Administration operations
  async getAllAdministration(): Promise<Administration[]> {
    return await this.db.select().from(schema.administration);
  }

  async getAdministration(id: string): Promise<Administration | undefined> {
    const result = await this.db.select().from(schema.administration).where(eq(schema.administration.id, id));
    return result[0];
  }

  async createAdministration(admin: InsertAdministration): Promise<Administration> {
    const result = await this.db.insert(schema.administration).values(admin).returning();
    return result[0];
  }

  async updateAdministration(id: string, admin: Partial<InsertAdministration>): Promise<Administration | undefined> {
    const result = await this.db.update(schema.administration).set(admin).where(eq(schema.administration.id, id)).returning();
    return result[0];
  }

  async deleteAdministration(id: string): Promise<boolean> {
    const result = await this.db.delete(schema.administration).where(eq(schema.administration.id, id)).returning();
    return result.length > 0;
  }

  // Member operations
  async getAllMembers(): Promise<Member[]> {
    return await this.db.select().from(schema.members);
  }

  async getMember(id: string): Promise<Member | undefined> {
    const result = await this.db.select().from(schema.members).where(eq(schema.members.id, id));
    return result[0];
  }

  async createMember(member: InsertMember): Promise<Member> {
    const result = await this.db.insert(schema.members).values(member).returning();
    return result[0];
  }

  async updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined> {
    const result = await this.db.update(schema.members).set(member).where(eq(schema.members.id, id)).returning();
    return result[0];
  }

  async deleteMember(id: string): Promise<boolean> {
    const result = await this.db.delete(schema.members).where(eq(schema.members.id, id)).returning();
    return result.length > 0;
  }

  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return await this.db.select().from(schema.projects);
  }

  async getProject(id: string): Promise<Project | undefined> {
    const result = await this.db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return result[0];
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await this.db.insert(schema.projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await this.db.update(schema.projects).set(project).where(eq(schema.projects.id, id)).returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await this.db.delete(schema.projects).where(eq(schema.projects.id, id)).returning();
    return result.length > 0;
  }

  // Join request operations
  async getAllJoinRequests(): Promise<JoinRequest[]> {
    return await this.db.select().from(schema.joinRequests);
  }

  async getJoinRequest(id: string): Promise<JoinRequest | undefined> {
    const result = await this.db.select().from(schema.joinRequests).where(eq(schema.joinRequests.id, id));
    return result[0];
  }

  async createJoinRequest(request: InsertJoinRequest): Promise<JoinRequest> {
    const result = await this.db.insert(schema.joinRequests).values(request).returning();
    return result[0];
  }

  async updateJoinRequestStatus(id: string, status: string): Promise<JoinRequest | undefined> {
    const result = await this.db.update(schema.joinRequests).set({ status }).where(eq(schema.joinRequests.id, id)).returning();
    return result[0];
  }

  async deleteJoinRequest(id: string): Promise<boolean> {
    const result = await this.db.delete(schema.joinRequests).where(eq(schema.joinRequests.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new PostgresStorage();
