import sanityClient, { urlFor } from "../../../lib/sanityClient.js";
import { getDistanceBetween } from "../../../utils/get-distance-between.js";

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

export const get_stores_search_array = async () => {
  try {
    const query = `*[_type == "stores"]{store_name, _id, store_logo, store_image}`;
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

export const get_product_search_array = async () => {
  console.log("reached");
  try {
    const query = `*[_type == "products"]{name, _id, image, price, category, description, vendor -> {store_name}}`;
    const data = await sanityClient.fetch(query);

    const products = data?.map((product) => {
      const image = urlFor(product.image).url();

      return {
        ...product,
        store_name: product.vendor.store_name,
        image,
      };
    });

    return products;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_store = async (store_id) => {
  try {
    // const query = `*[_type == "stores" && _id == "${store_id}"]{..., store_products[]->{image, price, _id, name, description}}`;
    const query = `*[_type == "stores" && _id == "${store_id}"]{...,menu_categories[]{..., products[]->{...}}}`;
    const data = await sanityClient.fetch(query);

    const stores = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();
      const store_image = urlFor(store.store_image).url();

      // const menu = store.store_products.map((product) => {
      //   const image = urlFor(product.image).url();
      //   return {
      //     ...product,
      //     vendor: store.store_name,
      //     image,
      //   };
      // });

      const menu = store.menu_categories.map((category) => {
        return {
          ...category,
          products: category.products.map((product) => ({
            ...product,
            vendor: store.store_name,
            store_logo,
            image: urlFor(product.image).url(),
          })),
        };
      });

      const categories = store.menu_categories.map((category) => {
        return {
          title: category.title,
        };
      });

      return {
        ...store,
        store_logo,
        store_image,
        menu,
        categories,
      };
    });

    return stores;
  } catch (error) {
    console.error(error);
  }
};

export const get_single_product = async (product_id) => {
  try {
    const query = `*[_type == "products" && _id == "${product_id}"]{..., vendor -> {store_name, _id, store_logo}}`;
    const data = await sanityClient.fetch(query);

    const product = data?.[0];
    console.log("called");
    return {
      ...product,
      vendor: {
        ...product.vendor,
        store_logo: urlFor(product.vendor.store_logo).url(),
      },
      image: urlFor(product.image).url(),
    };
  } catch (error) {
    console.error(error);
  }
};

export const get_single_store_preview = async (store_id) => {
  try {
    // const query = `*[_type == "stores" && _id == "${store_id}"]{..., store_products[]->{image, price, _id, name, description}}`;
    const query = `*[_type == "stores" && _id == "${store_id}"]{...,menu_categories[]{..., products[]->{...}}}`;
    const data = await sanityClient.fetch(query);

    const store = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();
      const store_image = urlFor(store.store_image).url();

      // const menu = store.store_products.map((product) => {
      //   const image = urlFor(product.image).url();
      //   return {
      //     ...product,
      //     vendor: store.store_name,
      //     image,
      //   };
      // });

      // const menu = store.menu_categories.map((category) => {
      //   return {
      //     ...category,
      //     products: category.products.map((product) => ({
      //       ...product,
      //       vendor: store.store_name,
      //       store_logo,
      //       image: urlFor(product.image).url(),
      //     })),
      //   };
      // });

      // const categories = store.menu_categories.map((category) => {
      //   return {
      //     title: category.title,
      //   };
      // });

      return {
        ...store,
        store_logo,
        store_image,
      };
    });

    return store;
  } catch (error) {
    console.error(error);
  }
};
export const get_stores_around_user = async ({ lat, lng }) => {
  try {
    // const query = `*[
    //   _type == 'stores' && geo::distance(store_location, geo::latLng(${lat}, ${lng})) < 8893.4]`;
    const query = `*[_type == "stores" && preview == null]`;
    const data = await sanityClient.fetch(query);

    const stores = await Promise.all(
      data?.map(async (store) => {
        const store_logo = urlFor(store.store_logo).url();
        const store_image = urlFor(store.store_logo).url();

        // get store distance
        const distanceData = await getDistanceBetween({
          origin: `${lat},${lng}`,
          destination: `${store.store_location.lat},${store.store_location.lng}`,
        });

        return {
          ...store,
          store_logo,
          store_image,
          distance: distanceData.distance,
        };
      })
    );

    return stores;
  } catch (error) {
    console.error(error);
  }
};

export const get_top_stores_around_user = async ({ lat, lng }) => {
  try {
    const query = `*[
      _type == 'stores' && store_rating > 4  && geo::distance(store_location, geo::latLng(${lat}, ${lng})) < 7893.4]`;
    const data = await sanityClient.fetch(query);

    const stores = await Promise.all(
      data?.map(async (store) => {
        const store_logo = urlFor(store.store_logo).url();
        const store_image = urlFor(store.store_logo).url();

        // get store distance
        const distanceData = await getDistanceBetween({
          origin: `${lat},${lng}`,
          destination: `${store.store_location.lat},${store.store_location.lng}`,
        });

        return {
          ...store,
          store_logo,
          store_image,
          distance: distanceData.distance,
        };
      })
    );

    return stores;
  } catch (error) {
    console.error(error);
  }
};
