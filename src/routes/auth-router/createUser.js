import sanityClient from "../../lib/sanityClient.js";

export const createUser = async (user_details) => {
  try {
    const { email, password, lastname, firstname, expo_push_token } =
      user_details;

    const user = {
      _type: "users",
      user_email: email,
      user_password: password,
      user_firstname: firstname,
      user_lastname: lastname,
      expo_push_token,
    };

    const { _id } = await sanityClient.create(user);
    return _id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
