import sanityClient from "../../../lib/sanityClient.js";

export const create_like = async ({ user_id, item_id }) => {
  const newLike = {
    _type: "reference",
    _ref: item_id,
  };

  await sanityClient
    .patch(user_id)
    .setIfMissing({ liked: [] })
    .insert("after", "liked[-1]", [
      {
        _type: "reference",
        _ref: item_id,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
};
