import { supabase } from "@utils/supabase";

import type { NextApiRequest, NextApiResponse } from "next";

export type Reply = {
  code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Reply>,
) {
  if (req.method === "GET") {
    const address = req.query.address;
    const result = await supabase
      .from("users")
      .select("*")
      .eq("address", address)
      .single();

    if (result.status === 200) {
      const user = result.data as { verified: boolean };

      if (user.verified) {
        // @ts-ignore
        return res.status(200).json({ code: "Ok", verified: true });
      }

      // @ts-ignore

      return res.status(200).json({ code: "Ok", verified: false });
    }
    // @ts-ignore
    return res.status(200).json({ code: "Ok", verified: false });
  } else {
    return res.status(405).send({ code: "Method not allowed" });
  }
}
