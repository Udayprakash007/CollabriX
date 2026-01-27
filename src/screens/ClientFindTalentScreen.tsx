import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Briefcase, Users, Filter, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { RegionFilter, REGIONS } from '@/components/filters/RegionFilter';
import { RatingDisplay } from '@/components/ratings/RatingDisplay';
import { useUserRatings } from '@/hooks/useProjects';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Developer {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  skills: string[] | null;
  developer_type: string | null;
  role: string | null;
  region: string | null;
}

const DEVELOPER_TYPES = [
  'All Types',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'ML/AI Engineer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Data Scientist',
];

const DeveloperCardWithRating = ({ developer }: { developer: Developer }) => {
  const { data: ratingsData } = useUserRatings(developer.id);
  
  return (
    <div className="flex items-start gap-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src={developer.avatar_url || ''} />
        <AvatarFallback>{developer.full_name?.charAt(0) || 'D'}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{developer.full_name || 'Developer'}</h3>
        <p className="text-sm text-muted-foreground">{developer.developer_type || developer.role || 'Developer'}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {ratingsData && ratingsData.totalRatings > 0 && (
            <RatingDisplay 
              rating={ratingsData.averageRating} 
              reviewCount={ratingsData.totalRatings} 
              size="sm" 
            />
          )}
          {developer.region && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {developer.region}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ClientFindTalentScreen = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    fetchDevelopers();
  }, [user]);

  const fetchDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, bio, skills, developer_type, role, region')
        .neq('id', user?.id || '');

      if (error) throw error;
      setDevelopers(data || []);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedType('All Types');
    setSelectedRegion(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedType !== 'All Types' || selectedRegion || searchQuery;

  const filteredDevelopers = developers.filter(dev => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      dev.full_name?.toLowerCase().includes(query) ||
      dev.developer_type?.toLowerCase().includes(query) ||
      dev.skills?.some(skill => skill.toLowerCase().includes(query));

    const matchesType = selectedType === 'All Types' || 
      dev.developer_type === selectedType || 
      dev.role === selectedType;

    const matchesRegion = !selectedRegion || dev.region === selectedRegion;

    return matchesSearch && matchesType && matchesRegion;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Find Talent</h1>
        <p className="text-muted-foreground">Browse skilled developers for your projects</p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by skills, name, or role..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Developer Type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50">
                {DEVELOPER_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <RegionFilter
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            {selectedType !== 'All Types' && (
              <Badge variant="secondary" className="gap-1">
                {selectedType}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedType('All Types')}
                />
              </Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {filteredDevelopers.length} developer{filteredDevelopers.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
      </div>

      {filteredDevelopers.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold">No Developers Found</h3>
          <p className="text-sm text-muted-foreground">
            {hasActiveFilters ? 'Try adjusting your filters' : 'No developers available at the moment'}
          </p>
          {hasActiveFilters && (
            <Button variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDevelopers.map((developer) => (
            <Card key={developer.id} className="card-base">
              <CardContent className="p-4 space-y-4">
                <DeveloperCardWithRating developer={developer} />

                {developer.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {developer.bio}
                  </p>
                )}

                {developer.skills && developer.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {developer.skills.slice(0, 5).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {developer.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{developer.skills.length - 5}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Profile</Button>
                  <Button className="flex-1">Invite to Project</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
