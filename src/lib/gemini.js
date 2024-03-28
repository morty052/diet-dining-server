import { GoogleGenerativeAI } from "@google/generative-ai";
import { VertexAI } from "@google-cloud/vertexai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCy7vSiIHXGOA6usPraWgGA5WZVG9YJFF4");
const vertex_ai = new VertexAI({
  project: "adept-bastion-416400",
  location: "northamerica-northeast1",
});

const textModel = "gemini-1.0-pro";
const vision = "gemini-1.0-pro-vision";

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: textModel,
  generation_config: {
    max_output_tokens: 2048,
    temperature: 0.4,
    top_p: 1,
    top_k: 32,
  },
  safety_settings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});
const visionModel = vertex_ai.preview.getGenerativeModel({
  model: vision,
  generation_config: {
    max_output_tokens: 2048,
    temperature: 0.4,
    top_p: 1,
    top_k: 32,
  },
  safety_settings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});

export async function write_about_meal(meal_name) {
  try {
    const prompt = `Write a short ad around 20 words max, about ${meal_name} `;
    const request = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
    const resp = await generativeModel.generateContent(request);
    const text = await resp.response.candidates[0].content.parts[0].text;
    return text;
  } catch (error) {
    console.error(error);
  }
}

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

  const prompt =
    "analyse the meal in the photo, create a JSON object with two fields, one containing the list of ingredients , and another containing the nutritional breakdown with the values wrapped in quotes like a JSON object would, with markdown";

  try {
    const blob = await imageUrlToBase64(url);

    const request = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inline_data: { mime_type: "image/jpeg", data: blob },
            },
          ],
        },
      ],
    };

    const result = await visionModel.generateContent(request);
    const resp = await result.response;
    const text = await resp.candidates[0].content.parts[0].text;
    const markdown = `${text.replace("```json", "").replace("```", "")}`;
    // .replace('"ingredients"', "ingredients")
    // .replace('"nutritional_breakdown"', "nutritional_breakdown");

    const obj = JSON.parse(markdown);
    console.log(obj.ingredients);

    return obj;
  } catch (error) {
    console.error(error);
    return {
      status: "REJECTED",
      error: "TRUE",
    };
  }
}

export async function writeMealDescription(meal_name) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Write a short ad about 20 words max, of the following meal:${meal_name} `;

  const result = await model.generateContent([prompt]);
  const response = await result.response;
  const text = response.text();
  return text;
}

// const genAI = new GoogleGenerativeAI("AIzaSyA7BtG6KoIVdrmKPce-dxHFhHPwlcQdapM");
