"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/services/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginScheme = z.object({
  username: z.string().min(1, { message: "Campo obrigatório" }),
  password: z.string().min(1, { message: "Campo obrigatório" }),
});

type LoginFormType = z.infer<typeof loginScheme>;


export default function LoginPage() {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginFormType) {
    try {
      const response = await api.post("auth/login", data);
      if(response.status !== 200) {
        return { error: "Username ou senha incorretos" };
      };

      
      router.push("/dashboard");
    } catch (error) {
      return { error: "Username ou senha incorretos" };
    }
  }

  return (
    <section className="h-screen w-screen grid justify-center items-center bg-slate-200">
      <Card className="w-[350px] shadow-none py-4">
        <CardHeader className="text-center pt-4">
          <CardTitle className="text-xl font-semibold text-slate-600">
            Login
          </CardTitle>
          <CardDescription className="text-xs font-light text-slate-500 tracking-tighter">
            Faça login na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="py-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="my-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-xs text-slate-600">
                      username
                    </FormLabel>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-3 text-gray-400"/>
                    <Input
                      {...field}
                      className="text-xs py-5 pl-10 text-slate-600 placeholder:text-xs placeholder:text-slate-400"
                    />
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-xs text-slate-600">
                      senha
                    </FormLabel>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                        className="text-xs py-5 pl-10 placeholder:text-xs text-slate-600 placeholder:text-slate-400"
                      />
                      {passwordVisible ? (
                        <EyeClosed
                          size={16}
                          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      ) : (
                        <Eye
                          size={16}
                          className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        />
                      )}
                      <FormMessage className="text-[10px]" />
                    </div>
                  </FormItem>
                )}
              />
              <span className="text-xs flex justify-end">
                <Link href="/forgot-password" className="text-blue-500 hover:underline hover:text-blue-700">
                    Esqueceu a senha?
                </Link>
              </span>
              <div className="flex justify-center mt-2">
                <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
          <Separator/>
        <CardFooter className="flex flex-col items-center gap-2 mt-3">
            <Image src="/icon.svg" alt="Logo Notetools" width={24} height={24} />
            <span className="text-xs text-center text-slate-400 font-light tracking-tighter">
                Notetools © 2024 - 2025 - Todos os direitos reservados.
            </span>
        </CardFooter>
        </CardContent>
      </Card>
    </section>
  );
}
