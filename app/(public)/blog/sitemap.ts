import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/utils";
import { posts } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts1 = await db.select().from(posts).where(eq(posts.published, true));
  return posts1.map((post) => {
    const publishedDate = new Date(post.updatedAt as Date ?? post.createdAt);

    // Format the date to ISO 8601 string
    const lastModified = publishedDate.toISOString();
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified,
    };
  });
}
