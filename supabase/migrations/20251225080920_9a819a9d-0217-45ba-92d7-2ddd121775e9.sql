-- Create connections table for connection requests
CREATE TABLE public.connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(sender_id, receiver_id)
);

-- Create messages table
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id UUID NOT NULL REFERENCES public.connections(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Connections policies
CREATE POLICY "Users can view their own connections"
ON public.connections FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send connection requests"
ON public.connections FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update connections they're part of"
ON public.connections FOR UPDATE
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can delete their sent requests"
ON public.connections FOR DELETE
USING (auth.uid() = sender_id);

-- Messages policies
CREATE POLICY "Users can view messages in their connections"
ON public.messages FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.connections c
        WHERE c.id = connection_id
        AND (c.sender_id = auth.uid() OR c.receiver_id = auth.uid())
        AND c.status = 'accepted'
    )
);

CREATE POLICY "Users can send messages in accepted connections"
ON public.messages FOR INSERT
WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
        SELECT 1 FROM public.connections c
        WHERE c.id = connection_id
        AND (c.sender_id = auth.uid() OR c.receiver_id = auth.uid())
        AND c.status = 'accepted'
    )
);

CREATE POLICY "Users can update their own messages"
ON public.messages FOR UPDATE
USING (auth.uid() = sender_id);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.connections;

-- Trigger for updated_at
CREATE TRIGGER update_connections_updated_at
BEFORE UPDATE ON public.connections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();