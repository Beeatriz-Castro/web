import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { login } from "../../lib/api/auth";
import { useAuth } from "../../lib/auth-context";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(1, "Senha obrigatória."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");
    try {
      const response = await login(data);
      signIn(response.accessToken, response.user);
      navigate("/admin/models", { replace: true });
    } catch (err: any) {
      setServerError(err.message || "Erro ao realizar login.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      <div className="flex w-full max-w-[1080px] rounded-[32px] overflow-hidden shadow-xl bg-white">
        
        {/* Lado Esquerdo - Formulário */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Entrar</h1>
            <p className="text-gray-600">Entre com sua conta existente.</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {serverError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email">E-mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  {...register("senha")}
                  aria-invalid={!!errors.senha}
                />
                {errors.senha && <p className="text-sm text-red-500">{errors.senha.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </div>

          <p className="text-sm text-gray-500">
            Não tem uma conta? <Link to="#" className="text-primary hover:underline font-bold">Cadastre-se</Link>
          </p>
        </div>

        {/* Lado Direito - Banner */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-8 bg-[#FFAA00]">
          <div className="text-center text-white">
            <h2 className="text-3xl font-black mb-2">NorDTF</h2>
            <p className="font-medium">O poder da personalização em suas mãos.</p>
          </div>
        </div>

      </div>
    </section>
  );
}