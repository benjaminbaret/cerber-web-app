import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whrixmehzjwxdolpknfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indocml4bWVoemp3eGRvbHBrbmZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTY1ODU4OSwiZXhwIjoyMDIxMjM0NTg5fQ.vgsFY7n0HGAb5O1PTnu9FXmkRSvygqd8iTVwva2BJKE';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
