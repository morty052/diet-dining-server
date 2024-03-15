import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const fetch_affiliates = async () => {
  try {
    const query = `*[_type == "stores"]`;
    const affiliates = await sanityClient.fetch(query);
    const data = affiliates.map((affiliate) => {
      return {
        ...affiliate,
        store_logo: urlFor(affiliate.store_logo).url(),
        store_image: urlFor(affiliate.store_image).url(),
      };
    });
    return {
      data,
      status: "SUCCESS",
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      status: "ERROR",
    };
  }
};
