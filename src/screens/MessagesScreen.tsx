import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import MessageThread from '@/components/connect/MessageThread';

interface Conversation {
  id: string;
  otherUser: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

interface Connection {
  id: string;
  sender_id: string;
  receiver_id: string;
}

const formatConversationTime = (value: string | null) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export const MessagesScreen = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setConversations([]);
      setLoading(false);
      return;
    }

    fetchConversations();
    const channel = supabase
      .channel(`messages-inbox-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    try {
      const { data: connections, error: connectionsError } = await supabase
        .from('connections')
        .select('id, sender_id, receiver_id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (connectionsError) throw connectionsError;
      const acceptedConnections = (connections || []) as Connection[];

      if (acceptedConnections.length === 0) {
        setConversations([]);
        return;
      }

      const connectionIds = acceptedConnections.map((connection) => connection.id);
      const otherUserIds = acceptedConnections.map((connection) =>
        connection.sender_id === user.id ? connection.receiver_id : connection.sender_id
      );

      const [{ data: profiles, error: profilesError }, { data: messages, error: messagesError }] = await Promise.all([
        supabase.from('profiles').select('id, full_name, avatar_url').in('id', otherUserIds),
        supabase
          .from('messages')
          .select('id, connection_id, sender_id, content, read, created_at')
          .in('connection_id', connectionIds)
          .order('created_at', { ascending: false }),
      ]);

      if (profilesError) throw profilesError;
      if (messagesError) throw messagesError;

      const conversationList = acceptedConnections
        .map((connection) => {
          const otherUserId = connection.sender_id === user.id ? connection.receiver_id : connection.sender_id;
          const connectionMessages = (messages || []).filter(
            (message) => message.connection_id === connection.id
          );
          const latestMessage = connectionMessages[0];
          const profile = profiles?.find((item) => item.id === otherUserId);

          return {
            id: connection.id,
            otherUser: {
              id: otherUserId,
              full_name: profile?.full_name || null,
              avatar_url: profile?.avatar_url || null,
            },
            lastMessage: latestMessage?.content || null,
            lastMessageAt: latestMessage?.created_at || null,
            unreadCount: connectionMessages.filter(
              (message) => message.sender_id !== user.id && !message.read
            ).length,
          };
        })
        .sort((a, b) => {
          if (!a.lastMessageAt) return 1;
          if (!b.lastMessageAt) return -1;
          return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
        });

      setConversations(conversationList);
      setSelectedConversation((current) =>
        current ? conversationList.find((item) => item.id === current.id) || null : null
      );
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (selectedConversation) {
    return (
      <div className="h-[calc(100vh-180px)]">
        <MessageThread
          connectionId={selectedConversation.id}
          otherUser={selectedConversation.otherUser}
          onBack={() => setSelectedConversation(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Keep project conversations in one place</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="space-y-4 py-12 text-center">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="font-semibold">No conversations yet</h3>
          <p className="text-sm text-muted-foreground">
            Accept a connection request to start messaging.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className="card-base">
              <CardContent className="p-4">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.otherUser.avatar_url || ''} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {conversation.otherUser.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate font-semibold text-foreground">
                        {conversation.otherUser.full_name || 'CollabriX member'}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatConversationTime(conversation.lastMessageAt)}
                      </span>
                    </span>
                    <span className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{conversation.lastMessage || 'Start a conversation'}</span>
                    </span>
                  </span>
                  {conversation.unreadCount > 0 && (
                    <Badge className="shrink-0">{conversation.unreadCount}</Badge>
                  )}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesScreen;