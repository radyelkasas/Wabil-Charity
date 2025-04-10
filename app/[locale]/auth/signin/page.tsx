"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const errorParam = searchParams.get("error") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setFormError(t("invalidCredentials") || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      // Successful login
      router.push(callbackUrl);
    } catch (err) {
      setFormError(t("errorOccurred") || "An error occurred during sign in");
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");

    // Password validation
    if (registerPassword !== registerConfirmPassword) {
      setFormError(t("passwordsDoNotMatch") || "Passwords do not match");
      setIsLoading(false);
      return;
    }

    // In a real app, you would call your API to register the user here
    // For this example, we'll simulate a successful registration and then sign in
    try {
      // Mock registration delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After registration, sign in with the new credentials
      await signIn("credentials", {
        username: registerUsername,
        password: registerPassword,
        callbackUrl,
      });
    } catch (err) {
      setFormError(
        t("errorOccurred") || "An error occurred during registration"
      );
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            {t("welcome") || "Welcome"}
            <HeartHandshake className="h-6 w-6 text-primary" />
          </CardTitle>
          <CardDescription>
            {t("signInDescription") ||
              "Sign in to your account to donate and track your contributions"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {(errorParam || formError) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {formError ||
                  t(`errors.${errorParam}`) ||
                  t("errorOccurred") ||
                  "An error occurred"}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">
                {t("signIn") || "Sign In"}
              </TabsTrigger>
              <TabsTrigger value="register">
                {t("register") || "Register"}
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">
                    {t("username") || "Username"}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {t("password") || "Password"}
                    </Label>
                    <Link href="/auth/forgot-password">
                      <Button variant="link" className="px-0" asChild>
                        {t("forgotPassword") || "Forgot password?"}
                      </Button>
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                      {t("signingIn") || "Signing in..."}
                    </>
                  ) : (
                    t("signIn") || "Sign In"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t("orContinueWith") || "Or continue with"}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google", { callbackUrl })}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M12.0002 4.75C13.7702 4.75 15.3502 5.36 16.6102 6.47L20.2702 2.81C18.1902 1.07 15.2602 0 12.0002 0C7.3202 0 3.25019 2.69 1.27019 6.61L5.50019 9.94C6.45019 6.91 9.0002 4.75 12.0002 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.33 17.25 16.07 18.09L20.22 21.35C22.38 19.31 23.49 16.07 23.49 12.27Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.50012 14.0601C5.24012 13.4101 5.09012 12.7101 5.09012 12.0001C5.09012 11.2901 5.24012 10.5901 5.50012 9.94006L1.27012 6.61006C0.47012 8.27006 0.00012207 10.1101 0.00012207 12.0001C0.00012207 13.8901 0.47012 15.7301 1.27012 17.3901L5.50012 14.0601Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0002 23.9999C15.2602 23.9999 18.0502 22.9699 20.2102 21.3499L16.0702 18.0899C15.0002 18.8099 13.6202 19.2499 12.0002 19.2499C9.0002 19.2499 6.4502 17.0899 5.5002 14.0599L1.2702 17.3899C3.2502 21.3099 7.3202 23.9999 12.0002 23.9999Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">
                    {t("username") || "Username"}
                  </Label>
                  <Input
                    id="register-username"
                    type="text"
                    required
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">
                    {t("email") || "Email"}
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">
                    {t("password") || "Password"}
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">
                    {t("confirmPassword") || "Confirm Password"}
                  </Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                      {t("registering") || "Registering..."}
                    </>
                  ) : (
                    t("register") || "Register"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {t("orContinueWith") || "Or continue with"}
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google", { callbackUrl })}
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M12.0002 4.75C13.7702 4.75 15.3502 5.36 16.6102 6.47L20.2702 2.81C18.1902 1.07 15.2602 0 12.0002 0C7.3202 0 3.25019 2.69 1.27019 6.61L5.50019 9.94C6.45019 6.91 9.0002 4.75 12.0002 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.33 17.25 16.07 18.09L20.22 21.35C22.38 19.31 23.49 16.07 23.49 12.27Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.50012 14.0601C5.24012 13.4101 5.09012 12.7101 5.09012 12.0001C5.09012 11.2901 5.24012 10.5901 5.50012 9.94006L1.27012 6.61006C0.47012 8.27006 0.00012207 10.1101 0.00012207 12.0001C0.00012207 13.8901 0.47012 15.7301 1.27012 17.3901L5.50012 14.0601Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0002 23.9999C15.2602 23.9999 18.0502 22.9699 20.2102 21.3499L16.0702 18.0899C15.0002 18.8099 13.6202 19.2499 12.0002 19.2499C9.0002 19.2499 6.4502 17.0899 5.5002 14.0599L1.2702 17.3899C3.2502 21.3099 7.3202 23.9999 12.0002 23.9999Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t("termsNote") ||
              "By continuing, you agree to our Terms of Service and Privacy Policy"}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
