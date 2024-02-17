import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const get_all_stores = async () => {
  try {
    const query = `*[_type == "stores"]`;
    const data = await sanityClient.fetch(query);

    const stores = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();

      return {
        ...store,
        store_logo,
      };
    });

    return stores;
  } catch (error) {
    console.error(error);
  }
};
