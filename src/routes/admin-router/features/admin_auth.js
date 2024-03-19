import sanityClient from "../../../lib/sanityClient.js";
async function sendRegistrationNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Companion registered",
    body: "Your Companion has been registered successfully.",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
  console.log("sent");
}

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

export const confirm_admin_companion = async ({ _id }) => {
  try {
    const query = `*[_type == "admins" && _id == "${_id}"]{expo_push_token}`;

    const data = await sanityClient.fetch(query);

    console.log(data);

    if (data?.[0]?.expo_push_token) {
      await sanityClient.patch(_id).set({ onboarded: true }).commit();
      await sendRegistrationNotification(data[0].expo_push_token);
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
