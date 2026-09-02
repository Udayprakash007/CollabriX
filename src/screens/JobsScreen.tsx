import { useState } from "react";
import { Briefcase, Clock, DollarSign, MapPin, Building2, ChevronRight, Filter, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";

export const JobsScreen = () => {
  const { user } = useAuth();
  const { projects, myProjects, isLoading } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComplexity, setSelectedComplexity] = useState("All");

  const openProjects = projects?.filter(p => p.status === 'open') || [];
  const assignedProjects = myProjects?.filter(p => p.developer_id === user?.id) || [];

  const complexityLevels = ["All", "Beginner", "Intermediate", "Advanced"];

  const hasActiveFilters = selectedComplexity !== "All" || searchQuery !== "";

  const clearFilters = () => {
    setSelectedComplexity("All");
    setSearchQuery("");
  };

  const filteredJobs = openProjects.filter((job) => {
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.roles && job.roles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesComplexity = selectedComplexity === "All" || job.complexity === selectedComplexity;
    return matchesSearch && matchesComplexity;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Jobs & Opportunities</h1>
          <p className="text-muted-foreground text-sm">Find your next project or collaboration</p>
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title, description, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {complexityLevels.map((comp) => (
              <Button
                key={comp}
                variant={selectedComplexity === comp ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedComplexity(comp)}
              >
                {comp} Complexity
              </Button>
            ))}
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Tabs */}
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Jobs ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="applications">My Projects ({assignedProjects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4 mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card className="p-8 text-center space-y-3">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="font-semibold text-foreground">No Jobs Available</h3>
              <p className="text-sm text-muted-foreground">
                {hasActiveFilters ? "No open jobs match your filters." : "There are no open projects available right now. Check back soon!"}
              </p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Posted by {job.client?.full_name || "Client"}</span>
                      </div>
                    </div>
                    {job.complexity && <Badge variant="secondary">{job.complexity}</Badge>}
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                    {job.client?.region && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{job.client.region}</span>
                      </div>
                    )}
                    {job.budget && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        <span>${job.budget.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {job.roles && job.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.roles.map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {job.description || "No detailed description."}
                    </p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4 mt-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{assignedProjects.length}</p>
              <p className="text-xs text-muted-foreground">Assigned</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {assignedProjects.filter(p => p.status === 'in_progress').length}
              </p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-2xl font-bold text-foreground">
                {assignedProjects.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </Card>
          </div>

          {/* Applications / Assigned Projects List */}
          {assignedProjects.length === 0 ? (
            <Card className="p-8 text-center space-y-3">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="font-semibold text-foreground">No Assigned Projects</h3>
              <p className="text-sm text-muted-foreground">You haven't been assigned to any projects yet.</p>
            </Card>
          ) : (
            assignedProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Building2 className="h-3.5 w-3.5" />
                        <span>Client: {project.client?.full_name || "Client"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Assigned Date: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="capitalize">{project.status}</Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
