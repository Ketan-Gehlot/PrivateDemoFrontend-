import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authApi } from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { usePreferencesStore } from "@/store/preferences-store";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2)
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const lastViewedPage = usePreferencesStore((state) => state.lastViewedPage);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const onSuccess = (token: string, user: Parameters<typeof setSession>[1]) => {
    setSession(token, user);
    toast.success(`Welcome ${user.name}`);
    navigate(lastViewedPage || "/dashboard", { replace: true });
  };

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => onSuccess(data.token, data.user),
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to log in")
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => onSuccess(data.token, data.user),
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to create account")
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to KoinX Harvest</CardTitle>
        <CardDescription>Use your backend account to access live portfolio tax analytics.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="register">Create account</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              className="space-y-4"
              onSubmit={loginForm.handleSubmit((values) => loginMutation.mutate(values))}
            >
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" autoComplete="email" {...loginForm.register("email")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  {...loginForm.register("password")}
                />
              </div>
              <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
                Log in
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form
              className="space-y-4"
              onSubmit={registerForm.handleSubmit((values) => registerMutation.mutate(values))}
            >
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input id="register-name" autoComplete="name" {...registerForm.register("name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  {...registerForm.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  {...registerForm.register("password")}
                />
              </div>
              <Button className="w-full" type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <UserPlus className="size-4" />
                )}
                Create account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
