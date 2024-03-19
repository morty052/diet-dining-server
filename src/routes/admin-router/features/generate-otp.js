import sanityClient from "../../../lib/sanityClient.js";

export const generate_admin_otp = async (admin_id) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 90000);
    await sanityClient
      .patch(admin_id)
      .set({ admin_active_otp: `${otp}` })
      .commit();
    return otp;
  } catch (error) {
    console.log(error);
  }
};

const reset_otp = async (admin_id) => {
  await sanityClient.patch(admin_id).set({ admin_active_otp: "" }).commit();
};

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
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    return {
      status: "REJECTED",
    };
  }
};
export const confirm_admin_email = async (admin_email, admin_password) => {
  try {
    const query = `*[_type == "admins" && admin_email == "${admin_email}" && admin_password == "${admin_password}"]{_id, admin_firstname}`;
    const data = await sanityClient.fetch(query);

    if (data.length > 0) {
      const { _id, admin_firstname } = data[0];
      return {
        status: "CONFIRMED",
        _id,
        firstname: admin_firstname,
      };
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    return {
      status: "REJECTED",
    };
  }
};

export const get_current_admin = async (admin_email) => {
  const query = `*[_type == "admins" && admin_email == "${admin_email}"]`;
  const data = await sanityClient.fetch(query);
  const _id = data[0];

  if (_id) {
    return {
      status: "CONFIRMED",
      data,
    };
  } else {
    return {
      status: "REJECTED",
    };
  }
};
