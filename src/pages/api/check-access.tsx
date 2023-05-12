import { ethers } from "ethers";

import { KnowledgeLayerCourseAbi } from "@abis/knowledgelayer-course";
import { RPC_URL } from "@constants/urls";
import { KNOWLEDGELAYER_COURSE_ADDRESS } from "constants/addresses";

import type { KnowledgeLayerCourse } from "@abis/types/knowledgelayer-course";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    console.log("Body: ", req.body);

    const { accessKey } = req.body;
    const { address, courseId, chainId } = JSON.parse(accessKey);

    if (!address) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const provider = new ethers.providers.JsonRpcProvider(RPC_URL[chainId]);
    const knowledgeLayerCourse = new ethers.Contract(
      KNOWLEDGELAYER_COURSE_ADDRESS[chainId],
      KnowledgeLayerCourseAbi,
      provider,
    ) as KnowledgeLayerCourse;

    const seller = (await knowledgeLayerCourse.courses(courseId)).seller;
    if (address === seller) {
      return res.status(200).send({ message: "Ok" });
    }

    const balance = await knowledgeLayerCourse.balanceOf(address, courseId);
    if (balance.gt(0)) {
      return res.status(200).send({ message: "Ok" });
    }

    return res.status(401).send({ message: "Unauthorized" });
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
}
