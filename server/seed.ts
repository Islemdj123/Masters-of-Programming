import { storage } from "./storage";

export async function seedDatabase() {
  try {
    console.log("🔄 Starting database seed check...");
    const founders = await storage.getAllFounders();
    console.log(`📊 Seed check: Found ${founders.length} founders`);
    if (founders.length > 0) {
      console.log("✅ Database already seeded");
      return;
    }

    console.log("🌱 Seeding database with initial data...");

    console.log("📝 Creating admin user...");
    const user = await storage.createUser({
      username: "admin",
      password: "admin123",
    });
    console.log("✅ Admin user created:", user);

    console.log("👤 Creating founder...");
    const founder = await storage.createFounder({
      fullName: "Manar Hougas",
      role: "Fondatrice du club",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      description: "Première fondatrice officielle du club Masters of Programming.",
    });
    console.log("✅ Founder created:", founder);

    console.log("👨‍💼 Creating administration members...");
    const admin1 = await storage.createAdministration({
      fullName: "Ahmed Ben Ali",
      role: "Président",
      department: "Direction",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Président du club Masters of Programming",
      email: "ahmed@example.com",
      phone: "+216 98 123 456",
      displayOrder: 1,
    });
    console.log("✅ Admin 1 created:", admin1);

    const admin2 = await storage.createAdministration({
      fullName: "Fatima Zahra",
      role: "Vice-Présidente",
      department: "Direction",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      description: "Vice-Présidente et responsable des événements",
      email: "fatima@example.com",
      phone: "+216 98 234 567",
      displayOrder: 2,
    });
    console.log("✅ Admin 2 created:", admin2);

    console.log("👥 Creating members...");
    const member1 = await storage.createMember({
      fullName: "Mohamed Hassan",
      specialty: "Développement Web",
      studyYear: 3,
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    });
    console.log("✅ Member 1 created:", member1);

    const member2 = await storage.createMember({
      fullName: "Leila Mansouri",
      specialty: "Intelligence Artificielle",
      studyYear: 2,
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    });
    console.log("✅ Member 2 created:", member2);

    console.log("📦 Creating projects...");
    const project1 = await storage.createProject({
      title: "Plateforme d'apprentissage en ligne",
      date: "2025-01-15",
      description: "Système complet de gestion de l'apprentissage avec vidéos, quizz et certificats.",
      bannerUrl: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=800&h=400&fit=crop",
    });
    console.log("✅ Project 1 created:", project1);

    const project2 = await storage.createProject({
      title: "Application mobile de gestion des tâches",
      date: "2025-02-20",
      description: "Application mobile moderne avec synchronisation cloud et notifications en temps réel.",
      bannerUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    });
    console.log("✅ Project 2 created:", project2);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding error:", error instanceof Error ? error.message : "Unknown error");
    console.error("Full error:", error);
  }
}

export async function seedDatabaseAsync() {
  // Run seeding in background without blocking app startup
  seedDatabase().catch(err => console.error("Background seed error:", err));
}
