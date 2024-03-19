import sanityClient from "../../../lib/sanityClient.js";

export const generate_affiliate_otp = async (admin_id) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 90000);
    await sanityClient
      .patch(admin_id)
      .set({ active_otp: `${otp}` })
      .commit();
    return otp;
  } catch (error) {
    console.log(error);
  }
};

const reset_otp = async (admin_id) => {
  await sanityClient.patch(admin_id).set({ active_otp: "" }).commit();
};
