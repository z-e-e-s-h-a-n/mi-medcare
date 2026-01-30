import { AlertCircle, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function NotFound() {
  return (
    <main className="flex-center min-h-screen bg-background text-foreground px-4">
      <div className="max-w-lg text-center space-y-6">
        <div className="flex-center flex-col gap-4">
          <AlertCircle className="size-16 text-destructive" />
          <h1 className="text-4xl font-bold">{}</h1>
          <p className="text-muted-foreground">{}</p>
        </div>
        <Link
          href={"/"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition"
        >
          <ArrowLeft className="size-4" />
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
