import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3 = new S3({
  region: "ap-southeast-2",
});

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  //throw new Error('Loading meals failed.');
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "ivan-nextjs-demo-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}

export async function randomSlug() {
  const meals = await getMeals();
  if (meals.length === 0) {
    throw new Error("No meals found");
  }
  const randomMeal = meals[Math.floor(Math.random() * meals.length)];
  return {
    title: randomMeal.title,
    slug: randomMeal.slug,
  };
}
