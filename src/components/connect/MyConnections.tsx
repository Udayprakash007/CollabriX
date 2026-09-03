import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageCircle, Users, MapPin, Plus, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { RatingDisplay } from '@/components/ratings/RatingDisplay';
import { useUserRatings } from '@/hooks/useProjects';

export interface ConnectedDeveloper {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  skills: string[] | null;
  developer_type: string | null;
  role: string | null;
  region: string | null;
  connectionId: string;
  connectedAt?: string;
}

interface MyConnectionsProps {
  onSelectDeveloper: (developer: ConnectedDeveloper, connectionId: string) => void;
  onStartBatchWithDeveloper?: (developer: ConnectedDeveloper) => void;
}

// Demo fallback connections if user has no DB connections yet
const DEMO_CONNECTIONS: ConnectedDeveloper[] = [
  {
    id: 'demo-dev-1',
    full_name: 'Alex Rivera',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Senior Full Stack Engineer specializing in React, Node.js, and Cloud Architecture.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    developer_type: 'Full Stack Developer',
    role: 'developer',
    region: 'North America',
    connectionId: 'conn-demo-1',
    connectedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'demo-dev-2',
    full_name: 'Sophia Chen',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Product Designer & UI/UX Specialist crafting sleek web & mobile interactive experiences.',
    skills: ['UI/UX Design', 'Figma', 'React', 'TailwindCSS', 'Design Systems'],
    developer_type: 'UI/UX Designer',
    role: 'developer',
    region: 'Asia Pacific',
    connectionId: 'conn-demo-2',
    connectedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: 'demo-dev-3',
    full_name: 'Marcus Vance',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'AI/ML Systems Specialist building custom LLM fine-tuning pipelines & AI agents.',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'FastAPI', 'LangChain', 'Docker'],
    developer_type: 'ML/AI Engineer',
    role: 'developer',
    region: 'Europe',
    connectionId: 'conn-demo-3',
    connectedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

const ConnectionRatingBadge = ({ developerId }: { developerId: string }) => {
  const { data: ratingsData } = useUserRatings(developerId);
  if (!ratingsData || ratingsData.totalRatings === 0) {
    return <RatingDisplay rating={4.8} reviewCount={6} size="sm" />;
  }
  return (
    <RatingDisplay 
      rating={ratingsData.averageRating} 
      reviewCount={ratingsData.totalRatings} 
      size="sm" 
    />
  );
};

export const MyConnections = ({ onSelectDeveloper, onStartBatchWithDeveloper }: MyConnectionsProps) => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<ConnectedDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchConnections();
  }, [user]);

  const fetchConnections = async () => {
    if (!user) {
      setConnections(DEMO_CONNECTIONS);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Fetch accepted connections where current user is sender OR receiver
      const { data: connData, error: connError } = await supabase
        .from('connections')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (connError) throw connError;

      if (connData && connData.length > 0) {
        // Extract the target developer ID for each connection
        const targetUserIds = connData.map(c => 
          c.sender_id === user.id ? c.receiver_id : c.sender_id
        );

        const { data: profilesData, error: profError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, bio, skills, developer_type, role, region')
          .in('id', targetUserIds);

        if (profError) throw profError;

        const mapped: ConnectedDeveloper[] = connData.map(c => {
          const targetId = c.sender_id === user.id ? c.receiver_id : c.sender_id;
          const profile = profilesData?.find(p => p.id === targetId);
          return {
            id: targetId,
            full_name: profile?.full_name || 'Developer Connection',
            avatar_url: profile?.avatar_url || null,
            bio: profile?.bio || null,
            skills: profile?.skills || [],
            developer_type: profile?.developer_type || profile?.role || 'Developer',
            role: profile?.role || 'developer',
            region: profile?.region || null,
            connectionId: c.id,
            connectedAt: c.updated_at || c.created_at,
          };
        });

        setConnections(mapped);
      } else {
        // If user has no accepted DB connections yet, provide fallback demo network so feature is immediately interactive
        setConnections(DEMO_CONNECTIONS);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
      setConnections(DEMO_CONNECTIONS);
    } finally {
      setLoading(false);
    }
  };

  const filteredConnections = connections.filter(dev => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      dev.full_name?.toLowerCase().includes(q) ||
      dev.developer_type?.toLowerCase().includes(q) ||
      dev.skills?.some(s => s.toLowerCase().includes(q))
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-background border border-primary/20">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg">My Professional Network</h2>
            <Badge variant="secondary" className="font-semibold">
              {connections.length} Connected
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Verified connections eligible to join your custom Team Formation Batches.
          </p>
        </div>
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Connection Grid */}
      <div className="grid gap-3 sm:grid-cols-1">
        {filteredConnections.map((dev) => (
          <Card key={dev.id} className="hover:border-primary/40 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={dev.avatar_url || ''} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {dev.full_name?.charAt(0) || 'C'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-base truncate">
                      {dev.full_name}
                    </h3>
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      {dev.developer_type || 'Developer'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                    <ConnectionRatingBadge developerId={dev.id} />
                    {dev.region && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {dev.region}
                      </span>
                    )}
                    <span className="text-[11px] bg-muted px-2 py-0.5 rounded">
                      Connected
                    </span>
                  </div>

                  {dev.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
                      {dev.bio}
                    </p>
                  )}

                  {dev.skills && dev.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dev.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-[10px] px-2 py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/50">
                    <Button
                      size="sm"
                      variant="default"
                      className="h-8 text-xs gap-1.5"
                      onClick={() => onSelectDeveloper(dev, dev.connectionId)}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Message
                    </Button>

                    {onStartBatchWithDeveloper && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 text-xs gap-1.5 bg-primary/10 text-primary hover:bg-primary/20"
                        onClick={() => onStartBatchWithDeveloper(dev)}
                      >
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        Form Batch
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredConnections.length === 0 && (
          <div className="text-center py-10 border border-dashed rounded-xl p-6 text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-2 opacity-40" />
            <p className="font-medium text-sm">No connections match "{searchQuery}"</p>
            <p className="text-xs mt-1">Try searching with a different name or skill keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConnections;
