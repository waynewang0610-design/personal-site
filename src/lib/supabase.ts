import { createClient } from "@supabase/supabase-js";

export interface Update {
  id: number;
  created_at: string;
  date: string;
  content: string;
}

export interface GuestbookMessage {
  id: number;
  created_at: string;
  name: string;
  content: string;
}

export interface Reply {
  id: number;
  created_at: string;
  parent_type: string;
  parent_id: number;
  name: string;
  content: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
