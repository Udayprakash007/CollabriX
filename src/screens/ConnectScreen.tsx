import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageCircle, UserPlus } from 'lucide-react';
import DeveloperSearch from '@/components/connect/DeveloperSearch';
import ConnectionRequests from '@/components/connect/ConnectionRequests';
import MessageThread from '@/components/connect/MessageThread';
import { useAuth } from '@/hooks/useAuth';

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
  const [activeTab, setActiveTab] = useState('search');
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);

  const handleSelectDeveloper = (developer: Developer, connectionId?: string) => {
    if (connectionId) {
      setSelectedDeveloper(developer);
      setActiveConnectionId(connectionId);
    }
  };

  const handleConnectionAccepted = (connectionId: string) => {
    // Could navigate to messages or show a toast
    setActiveTab('search');
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find Your Team</h1>
        <p className="text-muted-foreground mt-1">
          Connect with developers to build your project idea together
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Find Developers
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <DeveloperSearch onSelectDeveloper={handleSelectDeveloper} />
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <ConnectionRequests onAccept={handleConnectionAccepted} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectScreen;
