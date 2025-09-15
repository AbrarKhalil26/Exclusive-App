"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { LoginFormPayload, loginFormSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormPayload) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.ok) {
        toast.success("Login successfully", {
          position: "top-right",
        });
        router.push("/");
      } else {
        toast.error(res?.error || "Something went wrong", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="py-15 lg:py-0 mx-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Image
            src="/images/login.png"
            alt="Login"
            width={600}
            height={600}
            priority
            className="rounded-lg hidden lg:block"
          />
          <div>
            <h2 className="text-4xl text-center font-semibold mb-3">
              Sign in to Exclusive
            </h2>
            <p className="text-sm text-center text-gray-600 mb-10">
              Enter your details below
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Ammar@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="**********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
