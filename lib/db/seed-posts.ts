/**
 * Seed script — migrates existing MDX blog posts in /content into the `posts` DB table.
 *
 * Usage:
 *   pnpm db:seed-posts
 *
 * Adds the script to package.json:
 *   "db:seed-posts": "tsx --env-file=.env src/db/seed-posts.ts"
 *
 * Safe to run multiple times — uses onConflictDoUpdate so existing slugs
 * get updated rather than duplicated.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { db } from "./index";
import { posts } from "./schema";
import { eq } from "drizzle-orm";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(filename: string) {
  return path.basename(filename, path.extname(filename));
}

async function markdownToHTML(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: { light: "min-light", dark: "min-dark" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  if (files.length === 0) {
    console.log("⚠️  No MDX files found in /content — nothing to seed.");
    process.exit(0);
  }

  console.log(`📄 Found ${files.length} post(s) to seed...\n`);

  let inserted = 0;
  let updated = 0;

  for (const file of files) {
    const slug = slugify(file);
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { content: body, data } = matter(raw);

    const title: string = data.title ?? slug;
    const summary: string = data.summary ?? "";
    const publishedAt: Date | null = data.publishedAt
      ? new Date(data.publishedAt)
      : null;
    const keywords: string[] = Array.isArray(data.keywords)
      ? data.keywords
      : typeof data.keywords === "string"
      ? data.keywords.split(",").map((k: string) => k.trim())
      : [];
    const imageUrl: string | null = data.image ?? null;

    // Convert markdown → Tiptap-compatible HTML
    const html = await markdownToHTML(body);

    // Check if slug already exists
    const [existing] = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existing) {
      await db
        .update(posts)
        .set({
          title,
          summary,
          content: html,
          keywords,
          imageUrl,
          published: publishedAt !== null,
          publishedAt,
          updatedAt: new Date(),
        })
        .where(eq(posts.slug, slug));
      console.log(`  ↻  Updated:  ${slug}`);
      updated++;
    } else {
      await db.insert(posts).values({
        title,
        slug,
        summary,
        content: html,
        keywords,
        imageUrl,
        published: publishedAt !== null,
        publishedAt,
      });
      console.log(`  ✓  Inserted: ${slug}`);
      inserted++;
    }
  }

  console.log(
    `\n✅ Done — ${inserted} inserted, ${updated} updated (${files.length} total)`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
