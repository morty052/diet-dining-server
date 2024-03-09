import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const get_all_orders = async () => {
  try {
    const query = `*[_type == "orders"]{..., vendor->{store_logo,store_name,store_address}}`;
    const data = await sanityClient.fetch(query);

    const orders = data?.map((order) => {
      const { store_logo, store_name, store_address } = order?.vendor;
      const vendor_logo = urlFor(store_logo).url();

      return {
        ...order,
        vendor_logo,
        vendor: store_name,
        vendor_location: store_address,
      };
    });

    return orders;
  } catch (error) {
    console.error(error);
  }
};

export const get_user_orders = async (user_id) => {
  try {
    const query = `*[_type == "orders" && references("${user_id}")]{status, total, vendor -> {store_name}}`;
    const data = await sanityClient.fetch(query);

    return data;
  } catch (error) {
    console.error(error);
  }
};
