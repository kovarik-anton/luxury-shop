"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PulseLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { contactUsFormSchema } from "@/lib/schema-validators";
import { ContactUsInsert } from "@/types";
import { Textarea } from "@/components/ui/textarea";

export default function ContactUsForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ContactUsInsert>({
    mode: "onChange",
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: { email: "", message: "", name: "" },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: ContactUsInsert) => {
    try {
      // const response = await upsertCategory(values, categoryId ?? v4());

      toast({ title: " We accepted your feedback" });

      router.push("");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: error.toString(),
      });
    }
  };

  return (
    <AlertDialog>
      <Card className="mx-4 p-2">
        <CardHeader>
          <CardTitle>Contact us form</CardTitle>
          <CardDescription>{"Contact us"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4 "
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button className="w-28" type="submit" disabled={isLoading}>
                  {isLoading ? <PulseLoader size={5} color="#fff" /> : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
}
