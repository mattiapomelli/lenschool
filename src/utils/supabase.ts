import { createClient } from "@supabase/supabase-js";

import { env } from "env.mjs";

const url = env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(url, key);
