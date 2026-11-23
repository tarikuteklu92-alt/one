import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Supabase configuration is missing. Copy .env.local.example to .env.local and add your project values."
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
