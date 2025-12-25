import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Notifications {
  unreadRequests: number;
  unreadMessages: number;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notifications>({
    unreadRequests: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    if (!user) {
      setNotifications({ unreadRequests: 0, unreadMessages: 0 });
      return;
    }

    fetchNotifications();
    const unsubscribeConnections = subscribeToConnections();
    const unsubscribeMessages = subscribeToMessages();

    return () => {
      unsubscribeConnections();
      unsubscribeMessages();
    };
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      // Fetch pending connection requests
      const { data: requests, error: requestsError } = await supabase
        .from('connections')
        .select('id')
        .eq('receiver_id', user.id)
        .eq('status', 'pending');

      if (requestsError) throw requestsError;

      // Fetch unread messages from accepted connections
      const { data: acceptedConnections, error: connectionsError } = await supabase
        .from('connections')
        .select('id')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .eq('status', 'accepted');

      if (connectionsError) throw connectionsError;

      let unreadMessages = 0;
      if (acceptedConnections && acceptedConnections.length > 0) {
        const connectionIds = acceptedConnections.map(c => c.id);
        const { data: messages, error: messagesError } = await supabase
          .from('messages')
          .select('id')
          .in('connection_id', connectionIds)
          .neq('sender_id', user.id)
          .eq('read', false);

        if (!messagesError && messages) {
          unreadMessages = messages.length;
        }
      }

      setNotifications({
        unreadRequests: requests?.length || 0,
        unreadMessages,
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const subscribeToConnections = () => {
    const channel = supabase
      .channel('notifications-connections')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections',
          filter: `receiver_id=eq.${user?.id}`
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('notifications-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const markRequestsAsRead = () => {
    // This is automatically handled when viewing the requests
    fetchNotifications();
  };

  const totalUnread = notifications.unreadRequests + notifications.unreadMessages;

  return {
    ...notifications,
    totalUnread,
    markRequestsAsRead,
    refetch: fetchNotifications,
  };
};
