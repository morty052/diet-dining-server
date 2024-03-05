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

  const { _id: order_id } = await sanityClient.create(order, {
    autoGenerateArrayKeys: true,
  });

  const query = `*[_type == "affiliates" && references("${store_id}") ]._id`;
  const data = await sanityClient.fetch(query);
  const affiliate_id = data[0];

  await sanityClient
    .patch(affiliate_id)
    .setIfMissing({ orders: [] })
    .insert("after", "orders[-1]", [{ _type: "order", _ref: order_id }])
    .commit({ autoGenerateArrayKeys: true });
};
