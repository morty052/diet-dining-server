import { query } from "express";
import sanityClient, { urlFor } from "../../../lib/sanityClient.js";

export const get_affiliate = async (affiliate_id) => {
  try {
    const query = `*[_type == "affiliates" && _id == "${affiliate_id}"]{email, firstname, lastname, sales, total_revenue}`;

    const data = await sanityClient.fetch(query);
    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const get_affiliate_orders = async (affiliate_id) => {
  try {
    const query = `*[_type == "affiliates" && _id == "${affiliate_id}"].orders[] -> {_createdAt,total,_id,status,location,products[]{...,product_reference -> {image, name, price,_id}}}`;

    const data = await sanityClient.fetch(query);
    if (!data[0]) {
      console.log(data);
      return [];
    }
    const orders = data?.map((order) => {
      return {
        ...order,
        products: order.products.map((product) => {
          const image = urlFor(product.product_reference.image).url();
          return {
            product_id: product._id,
            quantity: product.quantity,
            image,
            name: product.product_reference.name,
            price: product.product_reference.price,
          };
        }),
      };
    });
    console.log(orders);
    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const get_affiliate_stores = async (affiliate_id) => {
  try {
    const query = `*[_type == "affiliates" && _id == "${affiliate_id}"].store -> {...,store_products[] -> {name, image, price, description, _id}, menu_categories[]{..., products[]->{...}}}`;

    const data = await sanityClient.fetch(query);
    const stores = data?.map((store) => {
      const store_logo = urlFor(store.store_logo).url();
      const store_image = urlFor(store.store_image).url();

      const menu = store.menu_categories?.map((category) => {
        return {
          ...category,
          products: category.products.map((product) => ({
            ...product,
            vendor: store.store_name,
            store_logo,
            image: urlFor(product.image).url(),
          })),
        };
      });

      const categories = store.menu_categories?.map((category) => {
        return {
          title: category.title,
        };
      });

      const products = store.store_products?.map((product) => {
        const image = urlFor(product.image).url();
        return {
          ...product,
          image,
        };
      });

      return {
        ...store,
        store_logo,
        store_image,
        menu,
        categories,
        store_products: products,
      };
    });
    return stores;
  } catch (error) {
    console.log(error);
  }
};

export const update_affiliate_products = async (affiliate_id, newProduct) => {
  try {
    // * query for store that references affiliate _id
    const storeQuery = `*[_type == "stores" && references("${affiliate_id}")]._id`;
    const data = await sanityClient.fetch(storeQuery);

    // * get store to update
    const store_id = data[0];

    const product = {
      ...newProduct,
      vendor: {
        _ref: store_id,
        _type: "reference",
      },
    };
    // * create new product in database
    const { _id: product_id } = await sanityClient.create(product);

    // * update store with new product
    await sanityClient
      .patch(store_id)
      .setIfMissing({ store_products: [] })
      .insert("after", "store_products[-1]", [
        { _type: "product", _ref: product_id },
      ])
      .commit({ autoGenerateArrayKeys: true });
    return {
      status: "SUCCESS",
      product_id,
    };
  } catch (error) {
    console.log(error);
  }
};

export const edit_affiliate_product = async (affiliate_id, newProduct) => {
  try {
    const product = {
      ...newProduct,
      vendor: {
        _ref: store_id,
        _type: "reference",
      },
    };

    // * update store with new product
    await sanityClient
      .patch(store_id)
      .set({ ...product })
      .commit({ autoGenerateArrayKeys: true });
    return {
      status: "SUCCESS",
      product_id,
    };
  } catch (error) {
    console.log(error);
  }
};
