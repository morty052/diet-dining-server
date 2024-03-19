import sanityClient from "../../lib/sanityClient.js";

export async function handleLogin({ email, password, expo_push_token }) {
  try {
    const query = `*[_type == "users" && user_email == "${email}" && user_password == "${password}"]{_id, user_firstname}`;
    const data = await sanityClient.fetch(query);

    if (data.length === 0) {
      throw new Error("Invalid email or password");
    }

    const { _id, user_firstname } = data[0];

    await sanityClient
      .patch(_id)
      .set({
        expo_push_token,
      })
      .commit();

    return {
      status: "SUCCESS",
      _id,
      user_firstname,
    };
  } catch (error) {
    if (error.message == "Invalid email or password") {
      console.log(error.message);
      return {
        status: "ERROR",
        message: error.message,
      };
    }
  }
}
