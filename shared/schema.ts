import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const founders = pgTable("founders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  photoUrl: text("photo_url").notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const administration = pgTable("administration", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  photoUrl: text("photo_url").notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  specialty: text("specialty"),
  studyYear: integer("study_year"),
  photoUrl: text("photo_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  bannerUrl: text("banner_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const joinRequests = pgTable("join_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  fieldOfStudy: text("field_of_study").notNull(),
  studyYear: text("study_year").notNull(),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertFounderSchema = createInsertSchema(founders).omit({ id: true, createdAt: true });
export const insertAdministrationSchema = createInsertSchema(administration).omit({ id: true, createdAt: true });
export const insertMemberSchema = createInsertSchema(members).omit({ id: true, createdAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertJoinRequestSchema = createInsertSchema(joinRequests).omit({ id: true, createdAt: true, status: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFounder = z.infer<typeof insertFounderSchema>;
export type Founder = typeof founders.$inferSelect;

export type InsertAdministration = z.infer<typeof insertAdministrationSchema>;
export type Administration = typeof administration.$inferSelect;

export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertJoinRequest = z.infer<typeof insertJoinRequestSchema>;
export type JoinRequest = typeof joinRequests.$inferSelect;
