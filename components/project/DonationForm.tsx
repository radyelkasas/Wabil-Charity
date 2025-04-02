"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonationFormProps {
  projectId?: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ projectId }) => {
  const t = useTranslations("project.donationForm");
  const { data: session, status } = useSession();
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);

  const predefinedAmounts = [50, 100, 200, 500];

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setAmount(value ? parseInt(value) : null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: window.location.pathname,
    });
    setLoginDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return;
    }

    // Check if user is authenticated
    if (status !== "authenticated") {
      setLoginDialogOpen(true);
      return;
    }

    setIsLoading(true);

    // Mock donation process
    try {
      // Artificial delay to simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fill in the user information from the session if available
      if (session && session.user) {
        if (!name && session.user.name) setName(session.user.name);
        if (!email && session.user.email) setEmail(session.user.email);
      }

      // Reset form and show success message
      setSuccess(true);
      setAmount(null);
      setCustomAmount("");
      setName("");
      setEmail("");

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting donation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-5 text-center">{t("title")}</h3>

      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4 text-center"
        >
          <Heart className="h-10 w-10 text-green-500 mx-auto mb-2" />
          <p className="text-green-800 dark:text-green-400 font-medium">
            {t("successMessage")}
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Predefined amounts */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountSelect(value)}
                className={`py-2 px-4 rounded-xl text-center transition-colors ${
                  amount === value
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {value} {t("currency")}
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          <div className="mb-5">
            <div className="relative">
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder={t("customAmount")}
                className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                {t("currency")}
              </div>
            </div>
          </div>

          {/* Additional fields - only show if not logged in or values not present */}
          {(!session?.user?.name || !session?.user?.email) && (
            <div className="space-y-4 mb-6">
              {!session?.user?.name && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("name")}
                  className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              )}

              {!session?.user?.email && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email")}
                  className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-right"
                />
              )}
            </div>
          )}

          {/* Donation button */}
          <motion.button
            type="submit"
            disabled={!amount || amount <= 0 || isLoading}
            className="w-full py-3 px-6 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                <span>{t("processing")}</span>
              </>
            ) : (
              <>
                <Heart className="h-5 w-5" />
                <span>{t("donate")}</span>
              </>
            )}
          </motion.button>
        </form>
      )}

      {/* Additional information */}
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 text-center">
        {t("taxInfo")}
      </p>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {t("loginRequired") || "Login Required"}
              </h2>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("loginToDonateDsc") ||
                  "You need to login to make a donation."}
              </p>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-start justify-between gap-4">
                <Label htmlFor="login-username" className="text-right">
                  {t("username") || "Username"}
                </Label>
                <Input
                  id="login-username"
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start justify-between gap-4">
                <Label htmlFor="login-password" className="text-right">
                  {t("password") || "Password"}
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  className="col-span-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full" type="submit">
                {t("login") || "Login"}
              </Button>
            </DialogFooter>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("or_continue_with") || "Or continue with"}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  signIn("google", { callbackUrl: window.location.pathname })
                }
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationForm;
