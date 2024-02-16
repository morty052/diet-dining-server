import sanityClient from "../../../lib/sanityClient.js";

export const generate_otp = async (admin_id) => {
  try {
    const otp = Math.floor(10000 + Math.random() * 90000);
    await sanityClient
      .patch(admin_id)
      .set({ admin_active_otp: `${otp}` })
      .commit();
    return otp;
  } catch (error) {
    console.log(error);
  }
};

export const confirm_otp = async (admin_id, otp) => {
  console.log(otp);
  const query = `*[_type == "admins" && _id == "${admin_id}"].admin_active_otp`;
  const data = await sanityClient.fetch(query);
  const active_otp = data[0];

  if (otp == active_otp) {
    return {
      status: "CONFIRMED",
    };
  } else {
    return {
      status: "REJECTED",
    };
  }
};
export const confirm_admin_email = async (admin_email) => {
  const query = `*[_type == "admins" && admin_email == "${admin_email}"]._id`;
  const data = await sanityClient.fetch(query);
  const _id = data[0];

  if (_id) {
    return {
      status: "CONFIRMED",
      _id,
    };
  } else {
    return {
      status: "REJECTED",
    };
  }
};
