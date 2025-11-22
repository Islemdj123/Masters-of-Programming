import { storage } from "./storage";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const founders = await storage.getAllFounders();
    if (founders.length > 0) {
      console.log("Database already seeded");
      return;
    }

    console.log("Seeding database with initial data...");

    // Add founder - Manar Hougas
    await storage.createFounder({
      fullName: "Manar Hougas",
      role: "Fondatrice du club",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      description: "Première fondatrice officielle du club Masters of Programming.",
    });

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.warn("Database seeding skipped - will be populated manually:", error instanceof Error ? error.message : "Unknown error");
    // Continue app startup even if seeding fails
  }
}

export async function seedDatabaseAsync() {
  // Run seeding in background without blocking app startup
  seedDatabase().catch(err => console.error("Background seed error:", err));
}
