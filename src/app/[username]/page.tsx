import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import PreviewContainer from "@/components/PreviewContainer";

interface PublicResumePageProps {
  params: Promise<{
    username: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PublicResumePageProps): Promise<Metadata> {
  const { username } = await params;

  // In a real app, fetch resume data from database to get actual name and title
  const title = `${username} - Interactive Resume | VividCV`;
  const description = `View ${username}'s interactive 3D resume built with VividCV. Explore their experience, skills, and projects in a stunning visual format.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://vividcv.app/${username}`,
      siteName: 'VividCV',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PublicResumePage({
  params,
}: PublicResumePageProps) {
  const { username } = await params;

  // In a real app, fetch resume data from database/storage
  // For now, we'll render a placeholder that uses localStorage data

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">VividCV</h1>
          </Link>
          <Button asChild>
            <Link href="/create">Create Your Own</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">
              {username}&apos;s Resume
            </h2>
            <p className="text-gray-400">
              Interactive 3D resume visualization
            </p>
          </div>

          <div className="h-[800px]">
            <PreviewContainer />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Built with VividCV - Create your own interactive resume
            </p>
            <Button asChild size="lg">
              <Link href="/create">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
