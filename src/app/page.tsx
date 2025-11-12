import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            VividCV
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Bring your resume to life with interactive 3D animations
          </p>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/create">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#templates">View Templates</Link>
            </Button>
          </div>

          <div id="templates" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>3D Card Flip</CardTitle>
                <CardDescription>
                  Profile photo flips in 3D on hover
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md"></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline Flow</CardTitle>
                <CardDescription>
                  Animated scrollable career timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md"></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Galaxy</CardTitle>
                <CardDescription>
                  Interactive particle system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
