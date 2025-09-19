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
import { useActionState, useEffect } from "react";
import { handleResetPassword } from "@/services/resetPassword.service";
import {
  ResetPasswordFormPayload,
  resetPasswordFormSchema,
} from "@/schema/resetPass.schema";
import { formState } from "@/types/resetPass.type";

export default function ResetPasswordPage() {
  const [action, formAction] = useActionState(handleResetPassword, formState);
  const router = useRouter();
  const form = useForm<ResetPasswordFormPayload>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });
  console.log(action);
  

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-right",
        });
      }
      if (action.success) {
        toast.success(action.message|| "Changing Password successfully", {
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
            src="/images/Forgot password.svg"
            alt="Login"
            width={600}
            height={600}
            priority
            className="rounded-lg hidden lg:block"
          />
          <div>
            <h2 className="text-4xl text-center font-semibold mb-3">
              Reset Password
            </h2>
            <p className="text-sm text-center text-gray-600 mb-10">
              Enter your details below
            </p>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
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
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
                <div className="flex justify-center">
                  <Button className="py-6 px-10 cursor-pointer">Submit</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
