import sanityClient from "../../../lib/sanityClient.js";

export async function update_order_status(_id, status) {
  await sanityClient.patch(_id).set({ status: status }).commit();
}
