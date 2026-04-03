"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/shared/blog/editor";
import { useUploadThing } from "@/lib/uploadthing";
import { ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { Project } from "@/lib/db/schema";

type ProjectFormProps = {
  project?: Project | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
        {children}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  hint,
  required,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {children}
        {required && <span className="ml-1 text-muted-foreground font-normal">*</span>}
      </label>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{hint}</p>}
    </div>
  );
}

function FormInput({ id, className, ...props }: React.ComponentProps<"input"> & { id: string }) {
  return (
    <Input
      id={id}
      className={cn(
        "bg-card border-border text-foreground placeholder:text-muted-foreground/50 h-10 text-sm",
        "focus-visible:border-foreground/40 focus-visible:ring-0 transition-colors",
        className
      )}
      {...props}
    />
  );
}

function FormTextarea({ id, className, ...props }: React.ComponentProps<"textarea"> & { id: string }) {
  return (
    <Textarea
      id={id}
      className={cn(
        "bg-card border-border text-foreground placeholder:text-muted-foreground/50 text-sm resize-none",
        "focus-visible:border-foreground/40 focus-visible:ring-0 transition-colors leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
};

type ResultStat = {
  value: string;
  label: string;
};

type GalleryImage = {
  src: string;
  alt: string;
  span: "full" | "half";
};

type Feature = {
  title: string;
  description: string;
};

type FullWidthImage = {
  src: string;
  alt: string;
  caption: string;
};

// ─── Main Form ────────────────────────────────────────────────────────────────

export function ProjectForm({ project }: ProjectFormProps) {
  const isNew = !project;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState<string | null>(null); // tracks which field is uploading
  const heroInputRef = useRef<HTMLInputElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  async function uploadImage(file: File, field: string) {
    setUploading(field);
    const res = await startUpload([file]).catch(() => null);
    setUploading(null);
    return res?.[0]?.ufsUrl ?? null;
  }

  // ── Flat fields ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    body: project?.body ?? "",
    dates: project?.dates ?? "",
    active: project?.active ?? false,
    order: project?.order ?? 0,
    category: project?.category ?? "",
    client: project?.client ?? "",
    timeline: project?.timeline ?? "",
    year: project?.year ?? "",
    heroImage: project?.heroImage ?? "",
    videoUrl: project?.videoUrl ?? "",
    siteUrl: project?.siteUrl ?? "",
    sourceUrl: project?.sourceUrl ?? "",
    role: project?.role ?? "",
    teamSize: project?.teamSize ?? "",
    technologies: (project?.technologies ?? []).join(", "),
    challenges: ((project?.challenges as string[]) ?? []).join("\n"),
    outcomes: ((project?.outcomes as string[]) ?? []).join("\n"),
    metaDescription: project?.metaDescription ?? "",
  });

  // ── Jsonb fields (managed as arrays for easier editing) ────────────────────
  const [overviewMainText, setOverviewMainText] = useState(project?.overview?.mainText ?? "");
  const [overviewSubText, setOverviewSubText] = useState(project?.overview?.subText ?? "");
  const [overviewServices, setOverviewServices] = useState(
    (project?.overview?.services ?? []).join(", ")
  );

  const [processSectionTitle, setProcessSectionTitle] = useState(
    project?.process?.sectionTitle ?? ""
  );
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(
    project?.process?.steps ?? []
  );

  const [resultsIntroText, setResultsIntroText] = useState(project?.results?.introText ?? "");
  const [resultStats, setResultStats] = useState<ResultStat[]>(
    project?.results?.stats ?? []
  );
  const [testimonial, setTestimonial] = useState({
    quote: project?.results?.testimonial?.quote ?? "",
    authorName: project?.results?.testimonial?.authorName ?? "",
    authorTitle: project?.results?.testimonial?.authorTitle ?? "",
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(
    (project?.gallery ?? []).map((img) => ({ ...img, span: img.span ?? "half" }))
  );

  const [fullWidthImages, setFullWidthImages] = useState<FullWidthImage[]>(
    (project?.fullWidthImages ?? []).map((img) => ({ ...img, caption: img.caption ?? "" }))
  );

  const [features, setFeatures] = useState<Feature[]>(
    project?.features ?? []
  );

  // ── Helpers ────────────────────────────────────────────────────────────────
  function set(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      challenges: form.challenges.split("\n").map((c) => c.trim()).filter(Boolean),
      outcomes: form.outcomes.split("\n").map((o) => o.trim()).filter(Boolean),
      overview: {
        mainText: overviewMainText,
        subText: overviewSubText,
        services: overviewServices.split(",").map((s) => s.trim()).filter(Boolean),
      },
      process: {
        sectionTitle: processSectionTitle,
        steps: processSteps,
      },
      results: {
        introText: resultsIntroText,
        stats: resultStats,
        testimonial,
      },
      gallery,
      fullWidthImages: fullWidthImages.map(({ caption, ...rest }) => ({
        ...rest,
        ...(caption ? { caption } : {}),
      })),
      features,
    };

    try {
      const res = await fetch(
        isNew ? "/api/projects" : `/api/projects/${project!.id}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        return;
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">

      {/* ── Core Info ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Core Info</SectionLabel>
        <div className="space-y-4">

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="title" required>Title</FieldLabel>
              <FormInput
                id="title"
                placeholder="Real-Time Collaboration Suite"
                value={form.title}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (isNew) set("slug", slugify(e.target.value));
                }}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="slug" required>Slug</FieldLabel>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-muted-foreground font-mono">
                  /projects/
                </span>
                <FormInput
                  id="slug"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="pl-22 font-mono text-xs"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="description" required hint="Shown on project cards. Keep it under 160 characters.">
              Short Description
            </FieldLabel>
            <FormTextarea id="description" rows={2} value={form.description}
              onChange={(e) => set("description", e.target.value)} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <FormInput id="category" placeholder="Web App" value={form.category}
                onChange={(e) => set("category", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="client">Client</FieldLabel>
              <FormInput id="client" placeholder="Acme Corp" value={form.client}
                onChange={(e) => set("client", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="year">Year</FieldLabel>
              <FormInput id="year" placeholder="2025" value={form.year}
                onChange={(e) => set("year", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="order" hint="Lower = appears first.">Display Order</FieldLabel>
              <FormInput id="order" type="number" value={form.order}
                onChange={(e) => set("order", Number(e.target.value))} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 items-end">
            <div>
              <FieldLabel htmlFor="dates" required>Timeline</FieldLabel>
              <FormInput id="dates" placeholder="Jan 2025 – Mar 2025" value={form.dates}
                onChange={(e) => set("dates", e.target.value)} required />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 h-10">
              <label htmlFor="active" className="text-sm text-foreground cursor-pointer select-none">
                Show on homepage
              </label>
              <Switch id="active" checked={form.active} onCheckedChange={(v) => set("active", v)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Overview</SectionLabel>
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="overviewMain" hint="Rendered as large heading text on the case study page.">
              Main Text
            </FieldLabel>
            <Editor content={overviewMainText} onChange={setOverviewMainText} />
          </div>
          <div>
            <FieldLabel htmlFor="overviewSub">Sub Text</FieldLabel>
            <Editor content={overviewSubText} onChange={setOverviewSubText} />
          </div>
          <div>
            <FieldLabel htmlFor="overviewServices" hint="Comma-separated. e.g. UI Design, Development, SEO">
              Services
            </FieldLabel>
            <FormInput id="overviewServices" placeholder="UI Design, Development, SEO"
              value={overviewServices} onChange={(e) => setOverviewServices(e.target.value)} />
          </div>
        </div>
      </section>

      {/* ── Case Study ───────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Case Study Body</SectionLabel>
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="body" hint="Full rich-text body. Use / for slash commands.">Body</FieldLabel>
            <Editor content={form.body} onChange={(html) => set("body", html)} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="role">Your Role</FieldLabel>
              <FormInput id="role" placeholder="Lead Full-Stack Developer"
                value={form.role} onChange={(e) => set("role", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="teamSize">Team Size</FieldLabel>
              <FormInput id="teamSize" placeholder="Solo / 3 people"
                value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <FieldLabel htmlFor="challenges" hint="One challenge per line.">Challenges</FieldLabel>
              <FormTextarea id="challenges" rows={5}
                placeholder={"Real-time audio pipeline\nConcurrent user handling"}
                value={form.challenges} onChange={(e) => set("challenges", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="outcomes" hint="One outcome per line.">Outcomes & Impact</FieldLabel>
              <FormTextarea id="outcomes" rows={5}
                placeholder={"Reduced processing time by 60%\nOnboarded 200+ users"}
                value={form.outcomes} onChange={(e) => set("outcomes", e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Process</SectionLabel>
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="processSectionTitle">Section Title</FieldLabel>
            <FormInput id="processSectionTitle" placeholder="How We Built It"
              value={processSectionTitle} onChange={(e) => setProcessSectionTitle(e.target.value)} />
          </div>

          <div className="space-y-3">
            {processSteps.map((step, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                  <Button type="button" variant="ghost" size="sm"
                    onClick={() => setProcessSteps((prev) => prev.filter((_, j) => j !== i))}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Number</FieldLabel>
                    <FormInput id={`step-num-${i}`} placeholder="01"
                      value={step.number}
                      onChange={(e) => setProcessSteps((prev) =>
                        prev.map((s, j) => j === i ? { ...s, number: e.target.value } : s))} />
                  </div>
                  <div>
                    <FieldLabel>Title</FieldLabel>
                    <FormInput id={`step-title-${i}`} placeholder="Discovery"
                      value={step.title}
                      onChange={(e) => setProcessSteps((prev) =>
                        prev.map((s, j) => j === i ? { ...s, title: e.target.value } : s))} />
                  </div>
                </div>
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <FormTextarea id={`step-desc-${i}`} rows={2} value={step.description}
                    onChange={(e) => setProcessSteps((prev) =>
                      prev.map((s, j) => j === i ? { ...s, description: e.target.value } : s))} />
                </div>
                <div>
                  <FieldLabel hint="URL or upload path.">Image</FieldLabel>
                  <div className="flex gap-2">
                    <FormInput id={`step-img-${i}`} placeholder="https://…"
                      value={step.image}
                      onChange={(e) => setProcessSteps((prev) =>
                        prev.map((s, j) => j === i ? { ...s, image: e.target.value } : s))} />
                    <Button type="button" variant="outline" size="sm"
                      disabled={uploading === `step-${i}`}
                      className="shrink-0 h-10"
                      onClick={async () => {
                        const input = document.createElement("input");
                        input.type = "file"; input.accept = "image/*";
                        input.onchange = async () => {
                          const file = input.files?.[0];
                          if (!file) return;
                          const url = await uploadImage(file, `step-${i}`);
                          if (url) setProcessSteps((prev) =>
                            prev.map((s, j) => j === i ? { ...s, image: url } : s));
                        };
                        input.click();
                      }}>
                      {uploading === `step-${i}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm"
              onClick={() => setProcessSteps((prev) => [
                ...prev,
                { number: String(prev.length + 1).padStart(2, "0"), title: "", description: "", image: "" }
              ])}>
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Step
            </Button>
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Results</SectionLabel>
        <div className="space-y-4">
          <div>
            <FieldLabel>Intro Text</FieldLabel>
            <Editor content={resultsIntroText} onChange={setResultsIntroText} />
          </div>

          {/* Stats */}
          <div>
            <FieldLabel hint="Metrics like '60% faster' or '200+ users'.">Stats</FieldLabel>
            <div className="space-y-2">
              {resultStats.map((stat, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <FormInput id={`stat-val-${i}`} placeholder="60%" value={stat.value}
                    onChange={(e) => setResultStats((prev) =>
                      prev.map((s, j) => j === i ? { ...s, value: e.target.value } : s))} />
                  <FormInput id={`stat-label-${i}`} placeholder="Faster processing" value={stat.label}
                    onChange={(e) => setResultStats((prev) =>
                      prev.map((s, j) => j === i ? { ...s, label: e.target.value } : s))} />
                  <Button type="button" variant="ghost" size="sm"
                    onClick={() => setResultStats((prev) => prev.filter((_, j) => j !== i))}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm"
                onClick={() => setResultStats((prev) => [...prev, { value: "", label: "" }])}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Stat
              </Button>
            </div>
          </div>

          {/* Testimonial */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Testimonial
            </span>
            <div>
              <FieldLabel>Quote</FieldLabel>
              <FormTextarea id="testimonial-quote" rows={3} value={testimonial.quote}
                onChange={(e) => setTestimonial((prev) => ({ ...prev, quote: e.target.value }))} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Author Name</FieldLabel>
                <FormInput id="testimonial-author" placeholder="Jane Smith" value={testimonial.authorName}
                  onChange={(e) => setTestimonial((prev) => ({ ...prev, authorName: e.target.value }))} />
              </div>
              <div>
                <FieldLabel>Author Title</FieldLabel>
                <FormInput id="testimonial-title" placeholder="CEO at Acme" value={testimonial.authorTitle}
                  onChange={(e) => setTestimonial((prev) => ({ ...prev, authorTitle: e.target.value }))} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Features</SectionLabel>
        <div className="space-y-3">
          {features.map((feature, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 grid gap-2 sm:grid-cols-2">
                <FormInput id={`feat-title-${i}`} placeholder="Feature title" value={feature.title}
                  onChange={(e) => setFeatures((prev) =>
                    prev.map((f, j) => j === i ? { ...f, title: e.target.value } : f))} />
                <FormInput id={`feat-desc-${i}`} placeholder="Short description" value={feature.description}
                  onChange={(e) => setFeatures((prev) =>
                    prev.map((f, j) => j === i ? { ...f, description: e.target.value } : f))} />
              </div>
              <Button type="button" variant="ghost" size="sm"
                onClick={() => setFeatures((prev) => prev.filter((_, j) => j !== i))}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => setFeatures((prev) => [...prev, { title: "", description: "" }])}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Feature
          </Button>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Gallery</SectionLabel>
        <div className="space-y-3">
          {gallery.map((img, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Image {i + 1}</span>
                <Button type="button" variant="ghost" size="sm"
                  onClick={() => setGallery((prev) => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel>URL</FieldLabel>
                  <div className="flex gap-2">
                    <FormInput id={`gallery-src-${i}`} placeholder="https://…" value={img.src}
                      onChange={(e) => setGallery((prev) =>
                        prev.map((g, j) => j === i ? { ...g, src: e.target.value } : g))} />
                    <Button type="button" variant="outline" size="sm" className="shrink-0 h-10"
                      disabled={uploading === `gallery-${i}`}
                      onClick={async () => {
                        const input = document.createElement("input");
                        input.type = "file"; input.accept = "image/*";
                        input.onchange = async () => {
                          const file = input.files?.[0];
                          if (!file) return;
                          const url = await uploadImage(file, `gallery-${i}`);
                          if (url) setGallery((prev) =>
                            prev.map((g, j) => j === i ? { ...g, src: url } : g));
                        };
                        input.click();
                      }}>
                      {uploading === `gallery-${i}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <FieldLabel>Alt Text</FieldLabel>
                  <FormInput id={`gallery-alt-${i}`} placeholder="Screenshot of dashboard"
                    value={img.alt}
                    onChange={(e) => setGallery((prev) =>
                      prev.map((g, j) => j === i ? { ...g, alt: e.target.value } : g))} />
                </div>
              </div>
              <div className="flex gap-2">
                {(["half", "full"] as const).map((span) => (
                  <button key={span} type="button"
                    onClick={() => setGallery((prev) =>
                      prev.map((g, j) => j === i ? { ...g, span } : g))}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded border transition-colors",
                      img.span === span
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-muted-foreground border-border hover:border-foreground/30"
                    )}>
                    {span === "full" ? "Full width" : "Half width"}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => setGallery((prev) => [...prev, { src: "", alt: "", span: "half" }])}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Image
          </Button>
        </div>
      </section>

      {/* ── Full Width Images ─────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Full Width Images</SectionLabel>
        <div className="space-y-3">
          {fullWidthImages.map((img, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Image {i + 1}</span>
                <Button type="button" variant="ghost" size="sm"
                  onClick={() => setFullWidthImages((prev) => prev.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel>URL</FieldLabel>
                  <div className="flex gap-2">
                    <FormInput id={`fwi-src-${i}`} placeholder="https://…" value={img.src}
                      onChange={(e) => setFullWidthImages((prev) =>
                        prev.map((g, j) => j === i ? { ...g, src: e.target.value } : g))} />
                    <Button type="button" variant="outline" size="sm" className="shrink-0 h-10"
                      disabled={uploading === `fwi-${i}`}
                      onClick={async () => {
                        const input = document.createElement("input");
                        input.type = "file"; input.accept = "image/*";
                        input.onchange = async () => {
                          const file = input.files?.[0];
                          if (!file) return;
                          const url = await uploadImage(file, `fwi-${i}`);
                          if (url) setFullWidthImages((prev) =>
                            prev.map((g, j) => j === i ? { ...g, src: url } : g));
                        };
                        input.click();
                      }}>
                      {uploading === `fwi-${i}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <FieldLabel>Alt Text</FieldLabel>
                  <FormInput id={`fwi-alt-${i}`} value={img.alt}
                    onChange={(e) => setFullWidthImages((prev) =>
                      prev.map((g, j) => j === i ? { ...g, alt: e.target.value } : g))} />
                </div>
              </div>
              <div>
                <FieldLabel>Caption (optional)</FieldLabel>
                <FormInput id={`fwi-caption-${i}`} value={img.caption}
                  onChange={(e) => setFullWidthImages((prev) =>
                    prev.map((g, j) => j === i ? { ...g, caption: e.target.value } : g))} />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm"
            onClick={() => setFullWidthImages((prev) => [...prev, { src: "", alt: "", caption: "" }])}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Image
          </Button>
        </div>
      </section>

      {/* ── Tech & Links ─────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Tech & Links</SectionLabel>
        <div className="space-y-4">
          <div>
            <FieldLabel htmlFor="technologies" hint="Comma-separated. e.g. Next.js, TypeScript, PostgreSQL">
              Technologies
            </FieldLabel>
            <FormInput id="technologies" placeholder="Next.js, TypeScript, PostgreSQL"
              value={form.technologies} onChange={(e) => set("technologies", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="siteUrl">Live Site URL</FieldLabel>
              <FormInput id="siteUrl" type="url" placeholder="https://example.com"
                value={form.siteUrl} onChange={(e) => set("siteUrl", e.target.value)} />
            </div>
            <div>
              <FieldLabel htmlFor="sourceUrl">Source / GitHub URL</FieldLabel>
              <FormInput id="sourceUrl" type="url" placeholder="https://github.com/you/repo"
                value={form.sourceUrl} onChange={(e) => set("sourceUrl", e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Media ────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Media</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="heroImage">Hero Image</FieldLabel>
            <div className="flex gap-2">
              <FormInput id="heroImage" type="url" placeholder="https://cdn.example.com/hero.jpg"
                value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} />
              <Button type="button" variant="outline" size="sm"
                disabled={uploading === "heroImage"}
                onClick={() => heroInputRef.current?.click()}
                className="shrink-0 h-10">
                {uploading === "heroImage" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              </Button>
              <input ref={heroInputRef} type="file" accept="image/*" className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file, "heroImage");
                  if (url) set("heroImage", url);
                  e.target.value = "";
                }} />
            </div>
            {form.heroImage && (
              <div className="mt-2 rounded-md overflow-hidden border border-border aspect-video bg-muted">
                <img src={form.heroImage} alt="Hero preview"
                  className="w-full h-full object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
              </div>
            )}
          </div>
          <div>
            <FieldLabel htmlFor="videoUrl">Demo Video URL</FieldLabel>
            <FormInput id="videoUrl" type="url" placeholder="https://youtube.com/watch?v=…"
              value={form.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} />
          </div>
        </div>
      </section>

      {/* ── SEO ──────────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>SEO</SectionLabel>
        <div>
          <FieldLabel htmlFor="metaDescription" hint="Recommended: under 155 characters.">
            Meta Description
          </FieldLabel>
          <FormTextarea id="metaDescription" rows={2}
            placeholder="A concise SEO description of the project…"
            value={form.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)} />
          <p className="mt-1.5 text-right text-[11px] text-muted-foreground font-mono">
            {form.metaDescription.length} / 155
          </p>
        </div>
      </section>

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* ── Actions ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <Button type="submit" disabled={loading}
          className="bg-foreground text-background hover:bg-foreground/90 px-6 text-sm font-medium">
          {loading ? "Saving…" : isNew ? "Create Project" : "Save Changes"}
        </Button>
        <Button type="button" variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm"
          onClick={() => { }}>
          Cancel
        </Button>
      </div>
    </form>
  );
}