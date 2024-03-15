import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const fetch_orders = async () => {
  try {
    const query = `*[_type == "orders"]{..., vendor -> {store_name, _id}, user -> {user_email}, products[]{...,product_reference -> {name, image, price,_id} }}`;
    const orders = await sanityClient.fetch(query);
    const data = orders.map((order) => {
      return {
        ...order,
        user: order.user.user_email,
        products: order.products.map((product) => ({
          _id: product.product_reference._id,
          quantity: product.quantity,
          image: urlFor(product.product_reference.image).url(),
          name: product.product_reference.name,
        })),
      };
    });
    console.log(data);
    return {
      status: "SUCCESS",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "ERROR",
      data: [],
    };
  }
};
