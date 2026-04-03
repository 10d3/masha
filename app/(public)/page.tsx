import { AboutMe } from "@/components/shared/about"
import { Contact } from "@/components/shared/contact"
import { Hero } from "@/components/shared/hero"
import { Works } from "@/components/shared/work"
import { db } from "@/lib/db"
import { projects } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function Page() {
  const works = await db.select().from(projects).where(eq(projects.active, true))
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <AboutMe />
      <Works works={works} />
      <Contact />
    </div>
  )
}
