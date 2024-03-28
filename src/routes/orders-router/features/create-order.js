import sanityClient from "../../../lib/sanityClient.js";

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "New order ❗❗❗",
    body: "A new order has been sent to you.",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
  console.log("sent");
}
async function sendDeliveryNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Order placed 🥡🥡",
    body: "Thank you for shopping with diet dining.",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
  console.log("sent");
}

export const create_order = async ({
  store_id,
  vendor,
  user_id,
  user_push_token,
}) => {
  const products = vendor.vendorItems?.map((item) => ({
    product_reference: {
      _type: "reference",
      _ref: item.item_id,
    },
    quantity: item.item_quantity,
  }));

  const order = {
    _type: "orders",
    location: "bikini bottom",
    total: vendor.vendorTotal,
    status: {
      pending: true,
      completed: false,
    },
    vendor: {
      _type: "reference",
      _ref: vendor._id,
    },
    user: {
      _type: "reference",
      _ref: user_id,
    },
    products,
    store_note: vendor.vendorNote,
  };

  const { _id: order_id } = await sanityClient.create(order, {
    autoGenerateArrayKeys: true,
  });

  const query = `*[_type == "affiliates" && references("${store_id}")]{_id, expo_push_token}`;
  const data = await sanityClient.fetch(query);
  const { _id: affiliate_id, expo_push_token } = data[0];

  await sanityClient
    .patch(affiliate_id)
    .setIfMissing({ orders: [] })
    .insert("after", "orders[-1]", [{ _type: "order", _ref: order_id }])
    .commit({ autoGenerateArrayKeys: true });

  await sanityClient
    .patch(user_id)
    .setIfMissing({ orders: [] })
    .insert("after", "orders[-1]", [{ _type: "order", _ref: order_id }])
    .commit({ autoGenerateArrayKeys: true });

  sendPushNotification(expo_push_token);
  sendDeliveryNotification(user_push_token);
};
