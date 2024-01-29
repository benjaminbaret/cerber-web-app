import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfqxhsprtpvsvfwbdztg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcXhoc3BydHB2c3Zmd2JkenRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDkxOTIsImV4cCI6MjAyMjEyNTE5Mn0.IXTMle0EdHgiphAsYsgJyg5TVfTLNNoxgMBO7zHSF8s';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
