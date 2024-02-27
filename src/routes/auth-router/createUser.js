import sanityClient from "../../lib/sanityClient.js";

export const createUser = async (email) => {
  try {
    const user = {
      _type: "users",
      user_email: email,
    };

    const { _id } = await sanityClient.create(user);
    return _id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
