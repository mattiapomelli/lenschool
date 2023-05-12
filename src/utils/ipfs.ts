import { create } from "ipfs-http-client";

export const getIpfsUrl = (fileHash: string) => {
  return `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${fileHash}`;
};

export const fetchFromIpfs = async <T extends Record<string, any>>(
  fileHash: string,
) => {
  const url = getIpfsUrl(fileHash);
  const res = await fetch(url);
  const data = await res.json();
  return data as T;
};

export const uploadToIPFS = async (data: Record<string, any>) => {
  try {
    const authorization =
      "Basic " +
      btoa(
        process.env.NEXT_PUBLIC_INFURA_ID +
          ":" +
          process.env.NEXT_PUBLIC_INFURA_SECRET,
      );
    const ipfs = create({
      url: "https://infura-ipfs.io:5001/api/v0",
      headers: {
        authorization,
      },
    });

    const result = await ipfs.add(JSON.stringify(data));
    return result.path;
  } catch (error) {
    console.error("IPFS error ", error);
  }
};
