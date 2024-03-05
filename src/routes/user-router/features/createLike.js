import sanityClient from "../../../lib/sanityClient.js";

export const create_like = async (user_id, item_id) => {
  const newLike = {
    _type: "reference",
    _ref: item_id,
  };

  await sanityClient
    .patch(user_id)
    .setIfMissing({ likes: [] })
    .insert("after", "likes[-1]", newLike)
    .commit({ autoGenerateArrayKeys: true });
};
