import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const get_all_stores = async () => {
  try {
    const query = `*[_type == "stores"]`;
    const data = await sanityClient.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
};
