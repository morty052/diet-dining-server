import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanityClient = createClient({
  projectId: "xnrrhmkl",
  dataset: "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  token:
    "skclrbjZdaIF3eZYbS4vcA67NR1P7TaqvRzcXVNaz6VVEMi8idNIf9cSY1HdM6uBWupVxLaDdspkQKSkP1DAA9NMsNVR40Dh9VLNIinjeouAqUFqq09tqbGqQn12mRnePmuUSoinwL20hZrngoDt81bAseV5uIrcQfipGGH3kjQDQgVumHtp", // Only if you want to update content with the client
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

export async function uploadFile(file_url) {
  try {
    const _id = (await sanityClient.assets.upload(file_url))._id;
    return {
      status: "UPLOADED",
      _id,
    };
  } catch (error) {
    console.error(error);
  }
}

export default sanityClient;
