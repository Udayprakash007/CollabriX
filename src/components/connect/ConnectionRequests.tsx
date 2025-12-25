import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ConnectionRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  message: string | null;
  created_at: string;
  sender?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    developer_type: string | null;
    skills: string[] | null;
  };
}

interface ConnectionRequestsProps {
  onAccept: (connectionId: string) => void;
}

const ConnectionRequests = ({ onAccept }: ConnectionRequestsProps) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
      subscribeToRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .eq('receiver_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch sender profiles
      if (data && data.length > 0) {
        const senderIds = data.map(r => r.sender_id);
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, developer_type, skills')
          .in('id', senderIds);

        const requestsWithSenders = data.map(request => ({
          ...request,
          sender: profiles?.find(p => p.id === request.sender_id)
        }));
        setRequests(requestsWithSenders);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToRequests = () => {
    const channel = supabase
      .channel('connection-requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections',
          filter: `receiver_id=eq.${user?.id}`
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleResponse = async (requestId: string, accept: boolean) => {
    setProcessing(requestId);
    try {
      const { error } = await supabase
        .from('connections')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

      toast.success(accept ? 'Connection accepted!' : 'Request declined');
      
      if (accept) {
        onAccept(requestId);
      }
      
      fetchRequests();
    } catch (error: any) {
      console.error('Error responding to request:', error);
      toast.error(error.message || 'Failed to respond');
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No pending connection requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Connection Requests</h3>
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.sender?.avatar_url || ''} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {request.sender?.full_name?.charAt(0) || 'D'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">
                  {request.sender?.full_name || 'Developer'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {request.sender?.developer_type || 'Developer'}
                </p>
                {request.sender?.skills && request.sender.skills.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {request.sender.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-9 w-9 text-destructive hover:bg-destructive/10"
                  onClick={() => handleResponse(request.id, false)}
                  disabled={processing === request.id}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => handleResponse(request.id, true)}
                  disabled={processing === request.id}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConnectionRequests;
