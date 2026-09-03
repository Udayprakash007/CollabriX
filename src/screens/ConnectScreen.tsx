import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, UserCheck, Layers } from 'lucide-react';
import DeveloperSearch from '@/components/connect/DeveloperSearch';
import ConnectionRequests from '@/components/connect/ConnectionRequests';
import MessageThread from '@/components/connect/MessageThread';
import MyConnections, { ConnectedDeveloper } from '@/components/connect/MyConnections';
import TeamFormationEngine from '@/components/connect/TeamFormationEngine';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { supabase } from '@/integrations/supabase/client';

interface Developer {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  skills: string[] | null;
  developer_type: string | null;
  role: string | null;
}

const ConnectScreen = () => {
  const { user } = useAuth();
  const { unreadRequests, refetch } = useNotifications();
  const [activeTab, setActiveTab] = useState('search');
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);

  // Accepted connections state to pass into TeamFormationEngine
  const [acceptedConnections, setAcceptedConnections] = useState<ConnectedDeveloper[]>([]);
  const [preSelectedDeveloperForBatch, setPreSelectedDeveloperForBatch] = useState<ConnectedDeveloper | null>(null);

  useEffect(() => {
    // Refetch notifications when viewing the connect screen
    refetch();
    if (user) {
      fetchAcceptedConnections();
    }
  }, [activeTab, user]);

  const fetchAcceptedConnections = async () => {
    if (!user) return;
    try {
      const { data: connData, error: connError } = await supabase
        .from('connections')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (connError) throw connError;

      if (connData && connData.length > 0) {
        const targetUserIds = connData.map(c => 
          c.sender_id === user.id ? c.receiver_id : c.sender_id
        );

        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, bio, skills, developer_type, role, region')
          .in('id', targetUserIds);

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

        setAcceptedConnections(mapped);
      }
    } catch (e) {
      console.error('Error fetching accepted connections in ConnectScreen:', e);
    }
  };

  const handleSelectDeveloper = (developer: Developer, connectionId?: string) => {
    if (connectionId) {
      setSelectedDeveloper(developer);
      setActiveConnectionId(connectionId);
    }
  };

  const handleStartBatchWithDeveloper = (developer: ConnectedDeveloper) => {
    setPreSelectedDeveloperForBatch(developer);
    setActiveTab('engine');
  };

  const handleConnectionAccepted = (connectionId: string) => {
    setActiveTab('my-connections');
    refetch();
    fetchAcceptedConnections();
  };

  const handleBackFromMessage = () => {
    setSelectedDeveloper(null);
    setActiveConnectionId(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Connect with Developers</h2>
          <p className="text-muted-foreground">Please login to find and connect with developers for your project.</p>
        </div>
      </div>
    );
  }

  // Show message thread if a developer is selected
  if (selectedDeveloper && activeConnectionId) {
    return (
      <div className="h-[calc(100vh-180px)]">
        <MessageThread
          connectionId={activeConnectionId}
          otherUser={selectedDeveloper}
          onBack={handleBackFromMessage}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold">Network & Team Engine</h1>
        <p className="text-muted-foreground mt-1">
          Find developers, manage your connections, and assemble custom project team batches.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 h-auto p-1 bg-muted/60">
          <TabsTrigger value="search" className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold">
            <Users className="h-4 w-4" />
            Find Developers
          </TabsTrigger>
          <TabsTrigger value="my-connections" className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold">
            <UserCheck className="h-4 w-4" />
            My Connections
          </TabsTrigger>
          <TabsTrigger value="engine" className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold">
            <Layers className="h-4 w-4 text-primary" />
            Team Engine
          </TabsTrigger>
          <TabsTrigger value="requests" className="relative flex items-center justify-center gap-1.5 py-2 text-xs font-semibold">
            <UserPlus className="h-4 w-4" />
            Requests
            {unreadRequests > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadRequests > 9 ? '9+' : unreadRequests}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <DeveloperSearch onSelectDeveloper={handleSelectDeveloper} />
        </TabsContent>

        <TabsContent value="my-connections" className="mt-4">
          <MyConnections
            onSelectDeveloper={(dev, connId) => handleSelectDeveloper(dev, connId)}
            onStartBatchWithDeveloper={handleStartBatchWithDeveloper}
          />
        </TabsContent>

        <TabsContent value="engine" className="mt-4">
          <TeamFormationEngine
            connections={acceptedConnections}
            preSelectedDeveloper={preSelectedDeveloperForBatch}
            onClearPreSelected={() => setPreSelectedDeveloperForBatch(null)}
            onOpenMessage={(dev, connId) => handleSelectDeveloper(dev, connId)}
          />
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <ConnectionRequests onAccept={handleConnectionAccepted} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectScreen;
