import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PublicResumePageProps {
  params: {
    username: string;
  };
}

export default function PublicResumePage({ params }: PublicResumePageProps) {
  const { username } = params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold">VividCV</h1>
          </Link>
          <Button asChild>
            <Link href="/create">Create Your Own</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-lg shadow-lg p-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">{username}&apos;s Resume</h2>
              <p className="text-muted-foreground">
                Interactive 3D resume will render here
              </p>
            </div>

            <div className="mt-12 space-y-8">
              <section>
                <h3 className="text-2xl font-semibold mb-4">About</h3>
                <p className="text-muted-foreground">
                  Resume content will be dynamically loaded based on username
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-4">Experience</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-muted-foreground text-sm">Experience items placeholder</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Skill placeholder
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
