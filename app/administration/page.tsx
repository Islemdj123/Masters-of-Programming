"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/page-layout";
import { MemberCard } from "@/components/member-card";
import { administration } from "@/lib/utils";

export default function AdministrationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
        {/* Animated Hero Section */}
        <section className="relative w-full h-80 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/40 to-teal-900/60" />
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
          <div className="absolute top-20 right-20 w-40 h-40 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-40 h-40 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
          {/* Text Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.7)' }}>Administration Team</h1>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team members who lead and manage Masters of Programming.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">{error}</div>
          )}

          {!loading && administration.length === 0 && !error && (
            <div className="text-center py-12 text-muted-foreground">
              No administration members found
            </div>
          )}

          {!loading && administration.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {administration.map((admin) => (
                <MemberCard key={admin.id} member={admin} className="border-primary/20" />
              ))}
            </div>
          )}
        </div>
    </Layout>
  );
}
