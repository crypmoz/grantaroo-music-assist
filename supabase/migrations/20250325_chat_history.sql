
-- Create table for storing chat history
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  user_profile JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Allow users to select only their own chat history
CREATE POLICY "Users can view their own chat history"
  ON public.chat_history
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Allow users to insert chat history
CREATE POLICY "Users can create chat history"
  ON public.chat_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS chat_history_user_id_idx ON public.chat_history(user_id);
