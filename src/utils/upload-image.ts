import { env } from "env.mjs";

import { supabase } from "./supabase";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";

export const uploadFile = async (
  file: File,
  filePath: string,
  bucket: "public" | "private",
) => {
  let { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    console.log("Error: ", uploadError);
    return undefined;
  }

  return filePath;
};

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();

  // Just creating a random number to add to the file name
  const linuxTimestamp = Math.floor(Date.now() / 1000);
  const min = 1000;
  const max = 9999;
  const randomFourDigitNumber =
    Math.floor(Math.random() * (max - min + 1)) + min;

  const fileName = `${linuxTimestamp}${randomFourDigitNumber}.${fileExt}`;
  const filePath = `${fileName}`;

  const resultFilePath = await uploadFile(file, filePath, "public");
  if (!resultFilePath) return undefined;

  console.log("Result file path: ", resultFilePath);

  return `${supabaseUrl}/storage/v1/object/public/public/${resultFilePath}`;
};
