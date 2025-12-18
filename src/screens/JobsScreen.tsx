import { useState } from "react";
import { Briefcase, Clock, DollarSign, MapPin, Building2, ChevronRight, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const availableJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    budget: "$5,000 - $8,000",
    type: "Full-time",
    postedDate: "2 days ago",
    skills: ["React", "TypeScript", "Node.js"],
    description: "Looking for an experienced React developer to join our team...",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "San Francisco, CA",
    budget: "$6,000 - $10,000",
    type: "Contract",
    postedDate: "1 day ago",
    skills: ["React", "Python", "PostgreSQL"],
    description: "Join our fast-growing startup to build innovative solutions...",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "DesignHub",
    location: "Remote",
    budget: "$3,500 - $5,000",
    type: "Part-time",
    postedDate: "3 days ago",
    skills: ["Vue.js", "CSS", "Figma"],
    description: "Creative frontend developer needed for design-focused projects...",
  },
];

const myApplications = [
  {
    id: 1,
    title: "Mobile App Developer",
    company: "AppWorks",
    status: "Under Review",
    appliedDate: "Dec 15, 2024",
    statusColor: "bg-amber-500/20 text-amber-600",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "CloudSys",
    status: "Interview Scheduled",
    appliedDate: "Dec 10, 2024",
    statusColor: "bg-primary/20 text-primary",
  },
  {
    id: 3,
    title: "DevOps Specialist",
    company: "InfraTech",
    status: "Rejected",
    appliedDate: "Dec 5, 2024",
    statusColor: "bg-destructive/20 text-destructive",
  },
];

export const JobsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs</h1>
          <p className="text-muted-foreground text-sm">Find your next opportunity</p>
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4 mt-4">
          {availableJobs
            .filter((job) =>
              job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.company.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((job) => (
              <Card key={job.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground line-clamp-1 flex-1">
                      {job.description}
                    </p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4 mt-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Applied</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">1</p>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Offers</p>
            </Card>
          </div>

          {/* Applications List */}
          {myApplications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{app.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{app.company}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Applied: {app.appliedDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={app.statusColor}>{app.status}</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
