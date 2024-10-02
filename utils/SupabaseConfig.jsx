import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://jbfvkicqpepaklyozsis.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZnZraWNxcGVwYWtseW96c2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMzU3ODEsImV4cCI6MjAzNTYxMTc4MX0._DrFW9hDXsE4Bd-kBfSNjU069akMHISc5UOPgtciekU'
);
