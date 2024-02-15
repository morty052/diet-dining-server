import sanityClient from "../../../lib/sanityClient";

const confirmOtp = async (admin_id, otp) => {
  const query = `*[_type == "admins" && _id == "${admin_id}"].admin_active_otp`;
  const data = await sanityClient.fetch(query);
  const otp = data[0];
  console.log(otp);
};
