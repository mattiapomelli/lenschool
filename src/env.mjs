import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CHAIN: z.union([
      z.literal("localhost"),
      z.literal("testnet"),
      literal("mainnet"),
    ]),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_LIVEPEER_API_KEY: z.string().min(1),
    NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // SERVER
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // CLIENT
    NEXT_PUBLIC_CHAIN: process.env.NEXT_PUBLIC_CHAIN,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_LIVEPEER_API_KEY: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY,
    NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID:
      process.env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION &&
    process.env.SKIP_ENV_VALIDATION !== "false" &&
    process.env.SKIP_ENV_VALIDATION !== "0",
});
