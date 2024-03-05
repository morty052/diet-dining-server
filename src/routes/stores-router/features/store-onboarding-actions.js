import sanityClient from "../../../lib/sanityClient.js";

export const create_store = async (store) => {
  try {
    const { _id } = await sanityClient.create(store);
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
