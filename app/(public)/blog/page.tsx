import {BlurFade} from "@/components/ui/blur-fade";
import { DATA } from "@/lib/data/data";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { BASE_URL } from "@/lib/utils";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "Tech Musings by MarcKenley Antoine",
  description:
    "Debugging life one blog post at a time—thoughts on software development, life, and the occasional infinite loop.",
  keywords: [
    "Web Development Tips",
    "Next.js Tutorials",
    "JavaScript Best Practices",
    "React.js Guides",
    "UI/UX Design Principles",
    "Frontend Development",
    "Performance Optimization Techniques",
    "Responsive Web Design",
    "SEO Strategies for Developers",
    "Building E-commerce Websites",
  ],
  openGraph: {
    title: "Tech Musings by 10D3",
    description:
      "Debugging life one blog post at a time—thoughts on software development, life, and the occasional infinite loop.",
    url: BASE_URL, // Replace with your website URL
    siteName: "Tech Musings by MarcKenley",
    images: [
      {
        url: DATA.image, // Replace with your OpenGraph image URL
        width: 1200,
        height: 630,
        alt: "Tech Musings by MarcKenley - Debugging life one blog post at a time",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Musings by MarcKenley",
    description:
      "Debugging life one blog post at a time—thoughts on software, life, and the occasional infinite loop.",
    creator: "@Kryptoeden7", // Replace with your Twitter handle
    site: "@Kryptoeden7",
    images: [
      {
        url: `${BASE_URL}/blog.png`, // Replace with the same OpenGraph image
        alt: "Tech Musings by MarcKenley - Debugging life with code.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts1 = await db.select().from(posts).where(eq(posts.published, true));

  return (
    <section className="flex min-h-screen flex-col gap-6 px-6 md:px-0">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>
      {posts1
        .sort((a, b) => {
          if (
            new Date(a.publishedAt as Date) > new Date(b.publishedAt as Date)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{post.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.publishedAt instanceof Date ? post.publishedAt.toLocaleDateString() : ''}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
