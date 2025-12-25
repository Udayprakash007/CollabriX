import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, UserPlus, MessageCircle, Check, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Developer {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  skills: string[] | null;
  developer_type: string | null;
  role: string | null;
}

interface Connection {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
}

interface DeveloperSearchProps {
  onSelectDeveloper: (developer: Developer, connectionId?: string) => void;
}

const DeveloperSearch = ({ onSelectDeveloper }: DeveloperSearchProps) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState<string | null>(null);

  useEffect(() => {
    fetchDevelopers();
    if (user) {
      fetchConnections();
    }
  }, [user]);

  const fetchDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id || '');

      if (error) throw error;
      setDevelopers(data || []);
    } catch (error) {
      console.error('Error fetching developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConnections = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`);

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const getConnectionStatus = (developerId: string) => {
    const connection = connections.find(
      c => (c.sender_id === developerId || c.receiver_id === developerId)
    );
    return connection;
  };

  const sendConnectionRequest = async (developerId: string) => {
    if (!user) {
      toast.error('Please login to send connection requests');
      return;
    }

    setSendingRequest(developerId);
    try {
      const { error } = await supabase
        .from('connections')
        .insert({
          sender_id: user.id,
          receiver_id: developerId,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Connection request sent!');
      fetchConnections();
    } catch (error: any) {
      console.error('Error sending request:', error);
      toast.error(error.message || 'Failed to send request');
    } finally {
      setSendingRequest(null);
    }
  };

  const filteredDevelopers = developers.filter(dev => {
    const query = searchQuery.toLowerCase();
    return (
      dev.full_name?.toLowerCase().includes(query) ||
      dev.developer_type?.toLowerCase().includes(query) ||
      dev.skills?.some(skill => skill.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, role, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredDevelopers.map((developer) => {
          const connection = getConnectionStatus(developer.id);
          const isConnected = connection?.status === 'accepted';
          const isPending = connection?.status === 'pending';

          return (
            <Card key={developer.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={developer.avatar_url || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {developer.full_name?.charAt(0) || 'D'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold truncate">
                        {developer.full_name || 'Developer'}
                      </h3>
                      <Badge variant="secondary" className="shrink-0">
                        {developer.developer_type || developer.role || 'Developer'}
                      </Badge>
                    </div>
                    
                    {developer.bio && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {developer.bio}
                      </p>
                    )}
                    
                    {developer.skills && developer.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {developer.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {developer.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{developer.skills.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      {isConnected ? (
                        <Button
                          size="sm"
                          onClick={() => onSelectDeveloper(developer, connection?.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      ) : isPending ? (
                        <Button size="sm" variant="secondary" disabled>
                          <Clock className="h-4 w-4 mr-1" />
                          {connection?.sender_id === user?.id ? 'Request Sent' : 'Respond'}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => sendConnectionRequest(developer.id)}
                          disabled={sendingRequest === developer.id}
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          {sendingRequest === developer.id ? 'Sending...' : 'Connect'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredDevelopers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No developers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperSearch;
