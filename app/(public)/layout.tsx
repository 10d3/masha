import Navbar from "@/components/layout/nav-bar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        inter.className
      )}
    >
      <Navbar />
      {children}
    </div>
  );
}