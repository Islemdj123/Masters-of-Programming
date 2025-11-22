

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Member {
  id: string;
  fullName: string;
  role?: string;
  specialty?: string;
  studyYear?: number;
  department?: string;
  photoUrl: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  bannerUrl: string;
}

export const founders: Member[] = [
  {
    id: "1",
    fullName: "Manar Hougas",
    role: "Fondatrice du club",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description: "Première fondatrice officielle du club Masters of Programming."
  },
  {
    id: "2",
    fullName: "Aouaidjia Mouna",
    role: "Vice-Présidente",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    description: "Vice-présidente officielle du club."
  },
  {
    id: "3",
    fullName: "Islem Djeridi",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    description: ""
  },
  {
    id: "4",
    fullName: "Fouad Athmani",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: ""
  },
  {
    id: "5",
    fullName: "Chahhat Rima",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1598550874175-4d7112ee750c?w=400&h=400&fit=crop",
    description: ""
  },
  {
    id: "6",
    fullName: "Mansouri Abdaraouf",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: ""
  },
  {
    id: "7",
    fullName: "Nabil Djouhri",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1513258496098-36812a796380?w=400&h=400&fit=crop",
    description: ""
  },
  {
    id: "8",
    fullName: "Yazid Mahfoud",
    role: "Project Manager",
    photoUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
    description: ""
  }
];

export const administration: Member[] = [
  {
    id: "0",
    fullName: "Professeur Ledmi Abdeldjalil",
    role: "Professeur encadrant",
    department: "Supervision",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    description: "Superviseur officiel du club Masters of Programming."
  },
  {
    id: "1",
    fullName: "Manar Hougas",
    role: "Fondatrice du club",
    department: "Executive Board",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    description: "Première fondatrice officielle du club Masters of Programming."
  },
  {
    id: "2",
    fullName: "Aouaidjia Mouna",
    role: "Vice-Présidente",
    department: "Executive Board",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    description: "Vice-présidente officielle du club."
  },
  {
    id: "3",
    fullName: "Islem Djeridi",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    description: "Gestion de projets et planification."
  },
  {
    id: "4",
    fullName: "Fouad Athmani",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    description: "Gestion de projets et coordination technique."
  },
  {
    id: "5",
    fullName: "Chahhat Rima",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1598550874175-4d7112ee750c?w=400&h=400&fit=crop",
    description: "Gestion de projets et relations externes."
  },
  {
    id: "6",
    fullName: "Mansouri Abdaraouf",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: "Gestion de projets et supervision technique."
  },
  {
    id: "7",
    fullName: "Nabil Djouhri",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1513258496098-36812a796380?w=400&h=400&fit=crop",
    description: "Gestion de projets."
  },
  {
    id: "8",
    fullName: "Yazid Mahfoud",
    role: "Project Manager",
    department: "Project Management",
    photoUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
    description: "Gestion de projets."
  }
];

export const members: Member[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  fullName: `Member ${i + 1}`,
  specialty: ["Web Dev", "AI/ML", "Cybersecurity", "Mobile Dev"][i % 4],
  studyYear: (i % 4) + 1,
  photoUrl: `https://i.pravatar.cc/300?img=${i + 10}`
}));

export const projects: Project[] = [
  {
    id: "1",
    title: "Annual Hackathon 2024",
    date: "October 15, 2024",
    description: "A 24-hour coding marathon where students built innovative solutions for campus problems.",
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&h=400&fit=crop"
  },
  {
    id: "2",
    title: "AI Workshop Series",
    date: "November 5, 2024",
    description: "A 4-week intensive workshop covering the basics of Machine Learning and Neural Networks.",
    bannerUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Tech Conference",
    date: "December 10, 2024",
    description: "Guest speakers from top tech companies shared insights on the future of software engineering.",
    bannerUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=400&fit=crop"
  },
  {
    id: "4",
    title: "Open Source Contribution",
    date: "January 20, 2025",
    description: "Collaborative event to help students make their first contribution to open source projects.",
    bannerUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
  }
];
