import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath, revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireAuth } from "@/lib/auth-guard";

type Params = { params: Promise<{ id: string }> };

// Full project — all jsonb sections included for detail page and admin editor
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Full replace
export async function PUT(request: Request, { params }: Params) {

  const guard = await requireAuth();
  if (guard.error) return guard.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const [updated] = await db
    .update(projects)
    .set(body)
    .where(eq(projects.id, id))
    .returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePaths(updated.slug);
    revalidateTag("projects")
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// Partial update
export async function PATCH(request: Request, { params }: Params) {

  const guard = await requireAuth();
  if (guard.error) return guard.error;

  try {
    const { id } = await params;
    const body = await request.json();
    const [updated] = await db
    .update(projects)
    .set(body)
    .where(eq(projects.id, id))
    .returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePaths(updated.slug);
    revalidateTag("projects")
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {

  const guard = await requireAuth();
  if (guard.error) return guard.error;

  try {
    const { id } = await params;
    const [deleted] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ slug: projects.slug });
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePaths(deleted.slug);
    revalidateTag("projects")
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function revalidatePaths(slug?: string | null) {
  revalidatePath("/");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}
