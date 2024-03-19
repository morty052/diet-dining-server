import sanityClient from "../../../lib/sanityClient.js";

export const set_admin_password = async ({ password, admin_id }) => {
  try {
    await sanityClient
      .patch(admin_id)
      .set({ admin_password: password })
      .commit();

    return {
      status: "CONFIRMED",
    };
  } catch (error) {
    return {
      status: "REJECTED",
    };
  }
};

export const register_admin_Companion = async ({
  admin_email,
  expo_push_token,
}) => {
  try {
    const query = `*[_type == "admins" && admin_email == "${admin_email.toLowerCase()}"]{_id, admin_firstname}`;

    const data = await sanityClient.fetch(query);

    const { _id: admin_id, admin_firstname } = data[0];
    console.log(admin_id);

    const { _id } = await sanityClient
      .patch(admin_id)
      .set({ expo_push_token })
      .commit();

    return {
      _id,
      firstname: admin_firstname,
      status: "CONFIRMED",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "REJECTED",
    };
  }
};
