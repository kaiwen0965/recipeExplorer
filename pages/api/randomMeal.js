import { randomSlug } from "@/lib/meals";

export default async function handler(req, res) {
  try {
    const randomMeal = await randomSlug();
    res.status(200).json({
      title: randomMeal.title,
      slug: randomMeal.slug,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
}
