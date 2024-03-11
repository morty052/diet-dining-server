import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCy7vSiIHXGOA6usPraWgGA5WZVG9YJFF4");

const parts = [
  {
    // Union field data can be only one of the following:
    fileData: {
      mimeType: "image/jpeg",
      fileUri:
        "https://storage.cloud.google.com/meal_pictures/cookie.jpg?authuser=1",
    },
  },
];

async function imageUrlToBase64(url) {
  try {
    const response = await fetch(url);

    const blob = await response.arrayBuffer();

    const base64String = `${Buffer.from(blob).toString("base64")}`;

    return base64String;
  } catch (err) {
    console.log(err);
  }
}

export async function identifyMeal(url) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const blob = await imageUrlToBase64(
    "https://cupdzqjnmpepddawtukr.supabase.co/storage/v1/object/public/temp_images/public/1709903262032-min.jpg"
  );

  const prompt =
    "create a JSON object of the ingredients in this meal in the photo with markdown";
  const image = {
    inlineData: {
      // data: Buffer.from(fs.readFileSync("cookie.jpg")).toString("base64"),
      data: blob,
      mimeType: "image/jpeg",
    },
  };

  const result = await model.generateContent([prompt, image]);
  const response = await result.response;
  const text = response.text();
  const markdown = text.replace("```json", "").replace("```", "");
  return markdown;
}

export async function writeMealDescription(meal_name) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const blob = await imageUrlToBase64(
    "https://cupdzqjnmpepddawtukr.supabase.co/storage/v1/object/public/temp_images/public/1709903262032-min.jpg"
  );

  const prompt = `Write a short ad about 20 words max, of the following meal:${meal_name} `;

  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const text = response.text();
  const markdown = text.replace("```json", "").replace("```", "");
  return markdown;
}

// const genAI = new GoogleGenerativeAI("AIzaSyA7BtG6KoIVdrmKPce-dxHFhHPwlcQdapM");
