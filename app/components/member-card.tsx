"use client";

import { cn } from "@/lib/utils";
import type { Member } from "@/lib/utils";

interface MemberCardProps {
  member: Member;
  className?: string;
}

export function MemberCard({ member, className }: MemberCardProps) {
  const initials = member.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5", className)}>
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-2">
        <div className="mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
          <div className="w-32 h-32 border-4 border-background shadow-xl mx-auto relative z-10 group-hover:scale-105 transition-transform duration-300 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            <img 
              src={member.photoUrl} 
              alt={member.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-muted-foreground absolute">
              {initials}
            </span>
          </div>
        </div>
        <h3 className="font-semibold leading-none tracking-tight text-xl font-bold group-hover:text-primary transition-colors">{member.fullName}</h3>
        {member.role && <p className="text-sm text-muted-foreground font-medium text-foreground/80">{member.role}</p>}
      </div>
      <div className="p-6 pt-0 text-center text-sm text-muted-foreground space-y-2">
        {member.department && <div className="inline-block px-2.5 py-0.5 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground text-xs mb-2">{member.department}</div>}
        {member.specialty && <div className="inline-block px-2.5 py-0.5 rounded-full border border-input bg-secondary text-secondary-foreground text-xs mb-2">{member.specialty}</div>}
        {member.studyYear && <p>Year {member.studyYear}</p>}
        {member.description && <p className="italic mt-4">"{member.description}"</p>}
      </div>
    </div>
  );
}
