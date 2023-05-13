import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CHAIN: z.union([
      z.literal("localhost"),
      z.literal("testnet"),
      z.literal("mainnet"),
    ]),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_LIVEPEER_API_KEY: z.string().min(1),
    NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_WLD_APP_ID: z.string().min(1),
    NEXT_PUBLIC_WLD_ACTION_NAME: z.string().min(1),
  },
  // server: {
  //   WLD_ACTION_NAME: z.string().min(1),
  // },
  runtimeEnv: {
    // SERVER
    // WLD_ACTION_NAME: process.env.WLD_ACTION_NAME,
    // CLIENT
    NEXT_PUBLIC_CHAIN: process.env.NEXT_PUBLIC_CHAIN,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_LIVEPEER_API_KEY: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY,
    NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID:
      process.env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WLD_APP_ID: process.env.NEXT_PUBLIC_WLD_APP_ID,
    NEXT_PUBLIC_WLD_ACTION_NAME: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION &&
    process.env.SKIP_ENV_VALIDATION !== "false" &&
    process.env.SKIP_ENV_VALIDATION !== "0",
});
