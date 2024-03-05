import sanityClient from "../../../lib/sanityClient.js";

export const confirm_otp = async (admin_id, otp) => {
  try {
    console.log(otp);
    const query = `*[_type == "admins" && _id == "${admin_id}"].admin_active_otp`;
    const data = await sanityClient.fetch(query);
    const active_otp = data[0];

    if (otp == active_otp) {
      reset_otp(admin_id);
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
      status: "ERROR",
    };
  }
};
export const confirm_affiliate_email = async (email) => {
  const query = `*[_type == "affiliates" && email == "${email}"]._id`;
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

export const get_current_affiliate_id = async (email) => {
  const query = `*[_type == "affiliate" && email == "${email}"]`;
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
