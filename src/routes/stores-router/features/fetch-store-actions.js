import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const get_all_stores = async () => {
  try {
    const query = `*[_type == "stores"]`;
    const data = await sanityClient.fetch(query);

    const stores = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();
      const store_image = urlFor(store.store_logo).url();

      return {
        ...store,
        store_logo,
        store_image,
      };
    });

    return stores;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_store = async (store_id) => {
  try {
    const query = `*[_type == "stores" && _id == "${store_id}"]{..., store_products[]->{image, price, _id, name, description}}`;
    const data = await sanityClient.fetch(query);

    const stores = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();
      const store_image = urlFor(store.store_image).url();

      const menu = store.store_products.map((product) => {
        const image = urlFor(product.image).url();
        return {
          ...product,
          vendor: store.store_name,
          image,
        };
      });

      return {
        ...store,
        store_logo,
        store_image,
        menu,
      };
    });
    console.log("called");
    return stores;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_product = async (product_id) => {
  try {
    const query = `*[_type == "products" && _id == "${product_id}"]{..., vendor -> {store_name}}`;
    const data = await sanityClient.fetch(query);

    const product = data?.[0];

    return {
      ...product,
      vendor: product.vendor.store_name,
      image: urlFor(product.image).url(),
    };
  } catch (error) {
    console.error(error);
  }
};
