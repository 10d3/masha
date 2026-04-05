import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth-guard";

// Lightweight columns for list/card views — keeps jsonb blobs out of list queries
const cardColumns = {
  id: true,
  title: true,
  slug: true,
  description: true,
  category: true,
  year: true,
  heroImage: true,
  videoUrl: true,
  technologies: true,
  siteUrl: true,
  sourceUrl: true,
  active: true,
  order: true,
  dates: true,
  createdAt: true,
} as const;

export async function GET() {
  try {
    const all = await db.query.projects.findMany({
      columns: cardColumns,
      orderBy: asc(projects.order),
    });
    return NextResponse.json(all);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {

  const guard = await requireAuth();
  if (guard.error) return guard.error;

  try {
    const body = await request.json();
    const [project] = await db.insert(projects).values(body).returning();
    revalidatePath("/");
    revalidatePath("/projects");
    revalidateTag("projects")
    return NextResponse.json(project, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
