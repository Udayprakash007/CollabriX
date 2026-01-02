import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MapPin, Briefcase } from 'lucide-react';

const mockDevelopers = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '',
    role: 'Full Stack Developer',
    rating: 4.9,
    reviews: 47,
    location: 'San Francisco, CA',
    skills: ['React', 'Node.js', 'TypeScript'],
    hourlyRate: '$85/hr',
    completedProjects: 32,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: '',
    role: 'UI/UX Designer',
    rating: 4.8,
    reviews: 38,
    location: 'New York, NY',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    hourlyRate: '$75/hr',
    completedProjects: 28,
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: '',
    role: 'Mobile Developer',
    rating: 4.7,
    reviews: 25,
    location: 'Austin, TX',
    skills: ['React Native', 'iOS', 'Android'],
    hourlyRate: '$90/hr',
    completedProjects: 19,
  },
];

export const ClientFindTalentScreen = () => {
  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Find Talent</h1>
        <p className="text-muted-foreground">Browse skilled developers for your projects</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by skills, name, or role..." 
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {mockDevelopers.map((developer) => (
          <Card key={developer.id} className="card-base">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={developer.avatar} />
                  <AvatarFallback>{developer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{developer.name}</h3>
                  <p className="text-sm text-muted-foreground">{developer.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">{developer.rating}</span>
                      <span className="text-xs text-muted-foreground">({developer.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {developer.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{developer.hourlyRate}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                    <Briefcase className="h-3 w-3" />
                    {developer.completedProjects} projects
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {developer.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">View Profile</Button>
                <Button className="flex-1">Invite to Project</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
