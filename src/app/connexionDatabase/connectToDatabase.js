import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zneratwwhdzqoppdebll.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZXJhdHd3aGR6cW9wcGRlYmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2MTQ0NjksImV4cCI6MjAyMjE5MDQ2OX0.h_6yhsmvDpBUrKgV0zB_rh6iXXTLEgV2VdmxJUu-1Uo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;