import sanityClient from "../../lib/sanityClient.js";

export const createUser = async ({
  email,
  expo_push_token,
  password,
  firstname,
}) => {
  try {
    const user = {
      _type: "users",
      user_email: email,
      user_password: password,
      user_firstname: firstname,
      expo_push_token,
    };

    const { _id } = await sanityClient.create(user);
    return _id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
