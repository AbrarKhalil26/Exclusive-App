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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterFormPayload, registerFormSchema } from "@/schema/register.schema";
import { handleRegister } from "@/services/register.service";
import { useActionState, useEffect } from "react";
import { formState } from "@/types/register.type";



export default function RegisterPage() {
  const [action, formAction] = useActionState(handleRegister, formState);
  const router = useRouter();
  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-right",
        });
      }
      if (action.success && action.message) {
        toast.success(action.message, {
          position: "top-right",
        });
        router.push("/login");
      }
    }
  }, [action]);

  return (
    <div className="py-15 lg:py-0 mx-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Image
            src="/images/Sign up-pana.png"
            alt="Login"
            width={600}
            height={600}
            priority
            className="rounded-lg hidden lg:block"
          />
          <div>
            <h2 className="text-4xl text-center font-semibold mb-3">
              Create an account
            </h2>
            <p className="text-sm text-center text-gray-600 mb-10">
              Enter your details below
            </p>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ammar" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.name?.[0]}</FormMessage>
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
                        <Input placeholder="Ammar@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.email?.[0]}</FormMessage>
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
                      <FormMessage>{action.error?.password?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="**********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="01234567891" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.phone?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <Button className="px-12 py-5">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
