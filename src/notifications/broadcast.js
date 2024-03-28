import sanityClient from "../lib/sanityClient.js";

/* 
 @param expoPushToken
*/
async function sendPushNotification({ expoPushToken, title, body }) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
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

// export const broadcast_all_users = async ({ title, body }) => {
//   const query = `*[_type == "users"].expo_push_token`;
//   try {
//     const data = await sanityClient.fetch(query);
//     data?.forEach(async (token) => {
//       await sendPushNotification({
//         expoPushToken: token,
//         title,
//         body,
//       });
//     });
//     return {
//       status: "CONFIRMED",
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       status: "REJECTED",
//     };
//   }
// };

const dummyTokens = [
  "ExponentPushToken[7VD4FSIKmiEleVcdQyNgzI]",
  "ExponentPushToken[7VD4FSIKmiEleVcdQyNgzI]",
];

export const broadcast_all_users = async ({ title, body }) => {
  const query = `*[_type == "users"].expo_push_token`;
  try {
    const data = await sanityClient.fetch(query);
    for (const token of data) {
      await sendPushNotification({
        expoPushToken: token,
        title,
        body,
      });
    }
    return {
      status: "CONFIRMED",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "REJECTED",
    };
  }
};
