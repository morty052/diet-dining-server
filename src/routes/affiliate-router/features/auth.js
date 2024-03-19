import sanityClient from "../../../lib/sanityClient.js";

const reset_affiliate_otp = async (admin_id) => {
  await sanityClient.patch(admin_id).set({ active_otp: "" }).commit();
};

// TODO MOVE FUNCTION TO ADMIN ROUTER OR SOMETHING
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

export const confirm_affiliate_otp = async (admin_id, otp) => {
  try {
    const query = `*[_type == "affiliates" && _id == "${admin_id}"].active_otp`;
    const data = await sanityClient.fetch(query);
    const active_otp = data[0];

    if (otp == active_otp) {
      await reset_affiliate_otp(admin_id);
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
export const confirm_affiliate_email = async (email, password) => {
  try {
    const query = `*[_type == "affiliates" && email == "${email}" && password == "${password}"]{_id, onboarded, store -> {store_name}}`;
    const data = await sanityClient.fetch(query);

    if (data.length > 0) {
      const { _id, store, onboarded } = data[0];
      const { store_name } = store;
      return {
        status: "CONFIRMED",
        _id,
        onboarded,
        store_name,
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

export const set_affiliate_password = async ({ password, affiliate_id }) => {
  try {
    await sanityClient.patch(affiliate_id).set({ password }).commit();

    return {
      status: "CONFIRMED",
    };
  } catch (error) {
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
