'use client';

import { Layout } from "@/components/page-layout";
import { JoinForm } from "@/components/join-form";

export default function JoinPage() {
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

          <div className="rounded-xl border bg-card text-card-foreground shadow border-primary/20 shadow-primary/5">
            <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="font-semibold leading-none tracking-tight">Membership Application</h2>
              <p className="text-sm text-muted-foreground">
                Membership is open to all students regardless of their major or experience level.
              </p>
            </div>
            <div className="p-6 pt-0">
              <JoinForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
