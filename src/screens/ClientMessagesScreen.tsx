import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';

const mockConversations: { id: string; name: string; avatar: string; lastMessage: string; time: string; unread: number; project: string }[] = [];

export const ClientMessagesScreen = () => {
  if (mockConversations.length === 0) {
    return (
      <div className="space-y-6 pb-24">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Communicate with your developers</p>
        </div>
        
        <div className="text-center py-12 space-y-4">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="font-semibold">No Messages Yet</h3>
          <p className="text-sm text-muted-foreground">Start a conversation with developers interested in your projects</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">Communicate with your developers</p>
      </div>

      <div className="space-y-2">
        {mockConversations.map((conversation) => (
          <Card key={conversation.id} className="card-base cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {conversation.project}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
