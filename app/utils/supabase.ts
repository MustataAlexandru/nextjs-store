import { createClient } from "@supabase/supabase-js";

const bucketName = "images-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucketName)
    .upload(newName, image, { cacheControl: "3600" });

  if(!data) throw new Error('Image upload failed!');
  return supabase.storage.from(bucketName).getPublicUrl(newName).data.publicUrl;  
};
