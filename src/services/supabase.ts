import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://scgrkzixbdotxtnszemf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ahzPMnGiQmVAQs13fz3E1Q_kLFvsTks';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
