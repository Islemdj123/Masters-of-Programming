
import { Layout } from "@/components/layout";
import { JoinForm } from "@/components/join-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Join() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Masters of Programming</h1>
            <p className="text-xl text-muted-foreground">
              Take the first step towards becoming a better developer. Fill out the form below to apply.
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle>Membership Application</CardTitle>
              <CardDescription>
                Membership is open to all students regardless of their major or experience level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JoinForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
