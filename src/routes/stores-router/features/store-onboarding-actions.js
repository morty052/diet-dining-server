import sanityClient from "../../../lib/sanityClient.js";

export const create_store = async (store) => {
  try {
    const _id = (await sanityClient.create(store))._id;
    console.log(_id);
    return _id;
  } catch (error) {
    console.error(error);
  }
};
