import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CHAIN: z.union([z.literal("localhost"), z.literal("testnet")]),
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // CLIENT
    NEXT_PUBLIC_CHAIN: process.env.NEXT_PUBLIC_CHAIN,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION &&
    process.env.SKIP_ENV_VALIDATION !== "false" &&
    process.env.SKIP_ENV_VALIDATION !== "0",
});
