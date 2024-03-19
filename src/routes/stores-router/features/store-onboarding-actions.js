import sanityClient from "../../../lib/sanityClient.js";

export const create_store = async (store) => {
  try {
    const owner_id = store.owner._ref;
    const { _id } = await sanityClient.create(store);
    // * Update store owner
    await sanityClient
      .patch(owner_id)
      // * Add store reference to owner add temp pass to owner using store id
      .set({ store: { _ref: _id, _type: "reference" }, password: _id })
      .commit();
    console.log(_id);
    return _id;
  } catch (error) {
    console.error(error);
  }
};
export const delete_store = async (store) => {
  try {
    await sanityClient.delete("RDy0NRgK4s4Oz2Kxq9o7Cw");
  } catch (error) {
    console.error(error);
  }
};
