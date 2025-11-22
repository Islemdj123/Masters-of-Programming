
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Member {
  id: number;
  fullName: string;
  role?: string;
  specialty?: string;
  studyYear?: number;
  department?: string;
  photoUrl: string;
  description?: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  bannerUrl: string;
}

export const founders: Member[] = [
  {
    id: 1,
    fullName: "Alex Johnson",
    role: "Founder & First President",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    description: "Visionary leader who established the club to foster innovation."
  },
  {
    id: 2,
    fullName: "Sarah Williams",
    role: "Co-Founder",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    description: "Passionate about competitive programming and algorithm design."
  },
  {
    id: 3,
    fullName: "Michael Chen",
    role: "Co-Founder",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    description: "Tech enthusiast focused on web development and cloud computing."
  }
];

export const administration: Member[] = [
  {
    id: 1,
    fullName: "David Kim",
    role: "President",
    department: "Executive Board",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    description: "Leading the club towards new heights in 2025."
  },
  {
    id: 2,
    fullName: "Emily Davis",
    role: "Vice-President",
    department: "Executive Board",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    description: "Ensuring smooth operations and member engagement."
  },
  {
    id: 3,
    fullName: "James Wilson",
    role: "Head of Workshops",
    department: "Workshops & Training",
    photoUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    description: "Organizing hands-on coding sessions."
  },
  {
    id: 4,
    fullName: "Sophia Brown",
    role: "Head of Competitions",
    department: "Competitions",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    description: "Managing hackathons and coding contests."
  },
  {
    id: 5,
    fullName: "Daniel Lee",
    role: "PR Manager",
    department: "Public Relations",
    photoUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop",
    description: "Connecting the club with the community."
  },
  {
    id: 6,
    fullName: "Olivia Martinez",
    role: "Tech Lead",
    department: "IT & Technical Support",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    description: "Maintaining club infrastructure and resources."
  }
];

export const members: Member[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  fullName: `Member ${i + 1}`,
  specialty: ["Web Dev", "AI/ML", "Cybersecurity", "Mobile Dev"][i % 4],
  studyYear: (i % 4) + 1,
  photoUrl: `https://i.pravatar.cc/300?img=${i + 10}`
}));

export const projects: Project[] = [
  {
    id: 1,
    title: "Annual Hackathon 2024",
    date: "October 15, 2024",
    description: "A 24-hour coding marathon where students built innovative solutions for campus problems.",
    bannerUrl: "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "AI Workshop Series",
    date: "November 5, 2024",
    description: "A 4-week intensive workshop covering the basics of Machine Learning and Neural Networks.",
    bannerUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Tech Conference",
    date: "December 10, 2024",
    description: "Guest speakers from top tech companies shared insights on the future of software engineering.",
    bannerUrl: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Open Source Contribution",
    date: "January 20, 2025",
    description: "Collaborative event to help students make their first contribution to open source projects.",
    bannerUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
  }
];
