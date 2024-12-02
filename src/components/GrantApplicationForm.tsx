import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AISuggestions } from "./AISuggestions";
import { toast } from "sonner";

const formSchema = z.object({
  artistName: z.string().min(2, "Artist name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  projectTitle: z.string().min(5, "Project title must be at least 5 characters"),
  projectDescription: z.string().min(100, "Please provide more detail (minimum 100 characters)"),
  budget: z.string().min(1, "Please enter a budget amount"),
  timeline: z.string().min(20, "Please provide more detail about your timeline"),
  impact: z.string().min(50, "Please describe the impact in more detail"),
});

export const GrantApplicationForm = () => {
  const [currentSection, setCurrentSection] = useState("projectDescription");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: "",
      email: "",
      projectTitle: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      impact: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Application draft saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <h2 className="text-3xl font-bold text-primary mb-6">Grant Application Assistant</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="artistName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artist/Band Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name or band name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Give your project a title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your project in detail..."
                        className="h-32"
                        onFocus={() => setCurrentSection("projectDescription")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain what you want to achieve with this grant
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Request</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter amount needed"
                        onFocus={() => setCurrentSection("budget")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Timeline</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Outline your project timeline..."
                        className="h-32"
                        onFocus={() => setCurrentSection("timeline")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community Impact</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe how your project will impact the Toronto music community..."
                        className="h-32"
                        onFocus={() => setCurrentSection("impact")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Save Application Draft</Button>
            </form>
          </Form>
        </div>

        <div className="sticky top-6">
          <AISuggestions section={currentSection} />
        </div>
      </div>
    </div>
  );
};