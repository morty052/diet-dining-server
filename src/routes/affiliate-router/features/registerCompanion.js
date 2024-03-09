import sanityClient from "../../../lib/sanityClient.js";

export const registerCompanion = async ({
  affiliate_email,
  expo_push_token,
}) => {
  try {
    const query = `*[_type == "affiliates" && email == "${affiliate_email.toLowerCase()}"]._id`;

    const data = await sanityClient.fetch(query);

    const affiliate_id = data[0];
    console.log(affiliate_id);

    const { _id } = await sanityClient
      .patch(affiliate_id)
      .set({ expo_push_token })
      .commit();

    return _id;
  } catch (error) {
    console.error(error);
  }
};
