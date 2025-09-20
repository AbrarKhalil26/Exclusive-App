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
import {
  ForgetPassFormPayload,
  forgetPasswordFormSchema,
} from "@/schema/forgetPass.schema";
import { useActionState, useEffect, useState } from "react";
import { formState } from "@/types/forgetPass.type";
import { handleForgetPassword } from "@/services/forgetPassword.service";

export default function ForgetPasswordPage() {
  const [action, formAction] = useActionState(handleForgetPassword, formState);
  const [codeInput, setCodeInput] = useState(false);
  const router = useRouter();
  const form = useForm<ForgetPassFormPayload>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: "",
      verifyCode: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-right",
        });
      }
      if (action.success) {
        if (!codeInput) {
          toast.success(action.message, {
            position: "top-right",
          });
          setCodeInput(true);
        } else {
          router.push("/resetPassword");
        }
      }
    }
  }, [action, codeInput, router]);

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
              Forget Password
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
                      <FormMessage>{action.error?.email?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {codeInput && (
                  <>
                    <FormField
                      control={form.control}
                      name="verifyCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verify Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your verify code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {action.error?.verifyCode?.[0]}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </>
                )}
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
