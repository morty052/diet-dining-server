import sanityClient from "../../../lib/sanityClient.js";

export const registerCompanion = async ({
  affiliate_email,
  expo_push_token,
}) => {
  try {
    const query = `*[_type == "affiliates" && email == "${affiliate_email.toLowerCase()}"]{_id, store -> {store_name} }`;

    const data = await sanityClient.fetch(query);

    const { _id: affiliate_id, store } = data[0];
    console.log(affiliate_id);

    const { _id } = await sanityClient
      .patch(affiliate_id)
      .set({ expo_push_token })
      .commit();

    return {
      _id: affiliate_id,
      store_name: store.store_name,
      status: "CONFIRMED",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "REJECTED",
    };
  }
};

export const confirm_affiliate_companion = async ({ _id }) => {
  try {
    const query = `*[_type == "affiliates" && _id == "${_id}"].expo_push_token`;

    const data = await sanityClient.fetch(query);

    console.log(data);

    if (data?.[0]?.expo_push_token) {
      return {
        status: "CONFIRMED",
      };
    } else {
      return {
        status: "REJECTED",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "REJECTED",
    };
  }
};
