
-- Create chat_history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  user_profile JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on chat_history
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Allow access to chat_history (only Supabase service role can access directly)
CREATE POLICY "Service role can insert chat history"
  ON public.chat_history
  FOR INSERT
  TO service_role
  USING (true);
