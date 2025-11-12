import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">VividCV</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Preview</Button>
            <Button size="sm">Publish</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Form components will be implemented here
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[8.5/11] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Preview placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
