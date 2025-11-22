
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Accept any object with the minimum required properties
interface MemberLike {
  id: string | number;
  fullName: string;
  photoUrl: string;
  role?: string | null;
  department?: string | null;
  specialty?: string | null;
  studyYear?: number | string | null;
  description?: string | null;
}

interface MemberCardProps {
  member: MemberLike;
  className?: string;
}

export function MemberCard({ member, className }: MemberCardProps) {
  return (
    <Card className={cn("overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5", className)}>
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl mx-auto relative z-10 group-hover:scale-105 transition-transform duration-300">
            <AvatarImage src={member.photoUrl} alt={member.fullName} className="object-cover" />
            <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
              {member.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{member.fullName}</CardTitle>
        {member.role && <CardDescription className="font-medium text-foreground/80">{member.role}</CardDescription>}
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground space-y-2">
        {member.department && <Badge variant="outline" className="mb-2">{member.department}</Badge>}
        {member.specialty && <Badge variant="secondary" className="mb-2">{member.specialty}</Badge>}
        {member.studyYear && <p>Year {member.studyYear}</p>}
        {member.description && <p className="italic mt-4">"{member.description}"</p>}
      </CardContent>
    </Card>
  );
}
