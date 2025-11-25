'use client';

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function JoinForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    fieldOfStudy: "",
    studyYear: "1",
    motivation: "",
    photoUrl: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setPhotoPreview(base64String);
        setFormData((prev) => ({ ...prev, photoUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/join-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast({
        title: "Application Received!",
        description: "We've received your application. We'll get back to you soon.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        fieldOfStudy: "",
        studyYear: "1",
        motivation: "",
        photoUrl: "",
      });
      setPhotoPreview("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="john@university.edu"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 234 567 890"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Field of Study</label>
          <input
            type="text"
            placeholder="Computer Science"
            value={formData.fieldOfStudy}
            onChange={(e) => setFormData((prev) => ({ ...prev, fieldOfStudy: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Year of Study</label>
          <select
            value={formData.studyYear}
            onChange={(e) => setFormData((prev) => ({ ...prev, studyYear: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">Master's / PhD</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Motivation</label>
        <textarea
          placeholder="Tell us why you want to join Masters of Programming..."
          value={formData.motivation}
          onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
          required
          minLength={10}
          className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Briefly explain your interest in programming and what you hope to achieve.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Photo</label>
        <div className="space-y-3">
          {photoPreview && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary/20">
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="block w-full text-sm text-muted-foreground cursor-pointer"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Upload a clear photo of yourself (optional but recommended)
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md font-medium"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
