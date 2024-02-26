import sanityClient from "../../../lib/sanityClient.js";

export const create_order = async (store_id, newOrder) => {
  console.log(newOrder);
  const products = newOrder.vendorItems?.map((item) => ({
    product_reference: {
      _type: "reference",
      _ref: item.item_id,
    },
    quantity: item.item_quantity,
  }));

  const order = {
    _type: "orders",
    location: "bikini bottom",
    total: newOrder.vendorTotal,
    status: {
      pending: true,
      completed: false,
    },
    vendor: {
      _type: "reference",
      _ref: newOrder._id,
    },
    products,
  };

  console.log(order);

  // await sanityClient
  //   .patch(store_id)
  //   .setIfMissing({ store_orders: [] })
  //   .insert("after", "store_orders[-1]", [newOrder])
  //   .commit({ autoGenerateArrayKeys: true });

  await sanityClient.create(order, { autoGenerateArrayKeys: true });
};
