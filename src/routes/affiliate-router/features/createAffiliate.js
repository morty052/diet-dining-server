import sanityClient from "../../../lib/sanityClient.js";

export default async function createAffiliate({ email }) {
  try {
    const newAffiliate = {
      _type: "affiliates",
      email,
      sales: 0,
      total_revenue: 0,
      onboarded: false,
    };

    const { _id } = await sanityClient.create(newAffiliate);
    return {
      status: "CONFIRMED",
      _id,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "REJECTED",
    };
  }
}
