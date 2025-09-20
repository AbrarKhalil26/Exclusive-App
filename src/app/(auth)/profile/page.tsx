"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formState,
  UpdatePassword,
  updatePasswordFormState,
  UpdateUser,
} from "@/services/profile.service";
import {
  UpdatePasswordFormPayload,
  updatePasswordFormSchema,
  UpdateUserFormPayload,
  updateUserFormSchema,
} from "@/schema/profile.schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [action, formAction] = useActionState(UpdateUser, formState);
  const [actionPassword, formActionPassword] = useActionState(
    UpdatePassword,
    updatePasswordFormState
  );
  const [isChangePass, setIsChangePass] = useState(false);

  const form = useForm<UpdateUserFormPayload>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const formPassword = useForm<UpdatePasswordFormPayload>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
      });
    }
  }, [session, form]);

  useEffect(() => {
    if (actionPassword) {
      if (!actionPassword.success && actionPassword.message) {
        toast.error(actionPassword.message, { position: "top-right" });
      }
      if (actionPassword.success && actionPassword.message) {
        toast.success(actionPassword.message, { position: "top-right" });
      }
    }
  }, [actionPassword]);

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, { position: "top-right" });
      }
      if (action.success && action.message) {
        toast.success(action.message, { position: "top-right" });
        update({
          name: form.getValues("name"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
        });
      }
    }
  }, [action, form]);

  return (
    <div className="my-10 mx-4">
      <div className="container mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className=" my-12 w-full lg:w-3/4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Image
                src="/images/profile.png"
                alt="user"
                priority
                width={60}
                height={60}
              />
              <div>
                <h2 className="text-lg">{session?.user.name}</h2>
                <p className="text-sm">{session?.user.email}</p>
              </div>
            </div>
            {isChangePass ? (
              <Button
                className="px-10 py-6 cursor-pointer"
                onClick={() => setIsChangePass(false)}
              >
                Update User
              </Button>
            ) : (
              <Button
                className="px-10 py-6 cursor-pointer"
                onClick={() => setIsChangePass(true)}
              >
                Change Password
              </Button>
            )}
          </div>

          <div className="my-12">
            {isChangePass ? (
              <Form {...formPassword}>
                <form
                  key="password-form"
                  action={formActionPassword}
                  className="space-y-6"
                >
                  <FormField
                    control={formPassword.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="**********"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage>
                          {actionPassword.error?.currentPassword?.[0]}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPassword.control}
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
                        <FormMessage>
                          {actionPassword.error?.password?.[0]}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPassword.control}
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
                        <FormMessage>
                          {actionPassword.error?.rePassword?.[0]}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button className="px-12 py-5">Update</Button>
                </form>
              </Form>
            ) : (
              <Form {...form}>
                <form
                  key="profile-form"
                  action={formAction}
                  className="space-y-6"
                >
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
                  <Button className="px-12 py-5">Update</Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
