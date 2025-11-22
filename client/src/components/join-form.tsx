
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  fieldOfStudy: z.string().min(2, {
    message: "Field of study is required.",
  }),
  studyYear: z.string({
    required_error: "Please select your study year.",
  }),
  motivation: z.string().min(10, {
    message: "Please tell us why you want to join (at least 10 characters).",
  }),
  photoUrl: z.string().optional(),
});

export function JoinForm() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      fieldOfStudy: "",
      motivation: "",
      photoUrl: "",
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setPhotoPreview(base64String);
        form.setValue("photoUrl", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/join-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast({
        title: "Application Received!",
        description: "We've received your application. We'll get back to you soon.",
      });
      form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} data-testid="input-join-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@university.edu" {...field} data-testid="input-join-email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 890" {...field} data-testid="input-join-phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} data-testid="input-join-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studyYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Study</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">Master's / PhD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivation</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us why you want to join Masters of Programming..." 
                  className="min-h-[120px]"
                  {...field}
                  data-testid="input-join-motivation"
                />
              </FormControl>
              <FormDescription>
                Briefly explain your interest in programming and what you hope to achieve.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoUrl"
          render={() => (
            <FormItem>
              <FormLabel>Your Photo</FormLabel>
              <FormControl>
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
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    data-testid="input-join-photo"
                    className="cursor-pointer"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Upload a clear photo of yourself (optional but recommended)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto" size="lg" disabled={submitting} data-testid="button-join-submit">
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Application
        </Button>
      </form>
    </Form>
  );
}
