"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Bell,
  Lock,
  CreditCard,
  LogOut,
  Settings,
  UserCog,
  KeyRound,
  Shield,
  BellRing,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const t = useTranslations("settings");
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    language: "ar",
    notifications: {
      email: true,
      marketing: false,
      newProjects: true,
      donationReceipts: true,
    },
  });

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update session data
    if (session) {
      await update({
        ...session,
        user: {
          ...session.user,
          name: userInfo.name,
        },
      });
    }

    setSuccessMessage(t("profile.saveSuccess"));
    setIsSaving(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSuccessMessage("");
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20">
                {session?.user?.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="mt-4 text-center">
                <h3 className="font-medium text-lg">{session?.user?.name}</h3>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 px-4">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("profile")}
              >
                <UserCog className="mr-2 h-4 w-4" />
                {t("tabs.profile")}
              </Button>
              <Button
                variant={activeTab === "security" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("security")}
              >
                <Shield className="mr-2 h-4 w-4" />
                {t("tabs.security")}
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("notifications")}
              >
                <BellRing className="mr-2 h-4 w-4" />
                {t("tabs.notifications")}
              </Button>
              <Button
                variant={activeTab === "payment" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabChange("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {t("tabs.payment")}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col pt-6">
            <Separator className="mb-6" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("logoutConfirmTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t("logoutConfirmMessage")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                  <AlertDialogAction>{t("logout")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-4 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              {successMessage}
            </div>
          )}

          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("profile.title")}</CardTitle>
                <CardDescription>{t("profile.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("profile.name")}</Label>
                    <Input
                      id="name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("profile.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                      disabled
                    />
                    <p className="text-sm text-gray-500">
                      {t("profile.emailCannotChange")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("profile.phone")}</Label>
                    <Input
                      id="phone"
                      placeholder="+20 10 XXXX XXXX"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">{t("profile.language")}</Label>
                    <Select
                      value={userInfo.language}
                      onValueChange={(value) =>
                        setUserInfo({ ...userInfo, language: value })
                      }
                    >
                      <SelectTrigger id="language">
                        <SelectValue
                          placeholder={t("profile.selectLanguage")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">
                          {t("profile.arabic")}
                        </SelectItem>
                        <SelectItem value="en">
                          {t("profile.english")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{t("cancel")}</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? t("saving") : t("saveChanges")}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("security.title")}</CardTitle>
                <CardDescription>{t("security.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">
                      {t("security.currentPassword")}
                    </Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">
                      {t("security.newPassword")}
                    </Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      {t("security.confirmPassword")}
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {t("security.twoFactorTitle")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("security.twoFactorDescription")}
                  </p>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="two-factor" />
                    <Label htmlFor="two-factor">
                      {t("security.enableTwoFactor")}
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{t("cancel")}</Button>
                <Button>{t("saveChanges")}</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("notifications.title")}</CardTitle>
                <CardDescription>
                  {t("notifications.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        {t("notifications.emailNotifications")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("notifications.emailDescription")}
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={userInfo.notifications.email}
                      onCheckedChange={(checked) =>
                        setUserInfo({
                          ...userInfo,
                          notifications: {
                            ...userInfo.notifications,
                            email: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">
                        {t("notifications.marketing")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("notifications.marketingDescription")}
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={userInfo.notifications.marketing}
                      onCheckedChange={(checked) =>
                        setUserInfo({
                          ...userInfo,
                          notifications: {
                            ...userInfo.notifications,
                            marketing: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-projects">
                        {t("notifications.newProjects")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("notifications.newProjectsDescription")}
                      </p>
                    </div>
                    <Switch
                      id="new-projects"
                      checked={userInfo.notifications.newProjects}
                      onCheckedChange={(checked) =>
                        setUserInfo({
                          ...userInfo,
                          notifications: {
                            ...userInfo.notifications,
                            newProjects: checked,
                          },
                        })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="donation-receipts">
                        {t("notifications.donationReceipts")}
                      </Label>
                      <p className="text-sm text-gray-500">
                        {t("notifications.donationReceiptsDescription")}
                      </p>
                    </div>
                    <Switch
                      id="donation-receipts"
                      checked={userInfo.notifications.donationReceipts}
                      onCheckedChange={(checked) =>
                        setUserInfo({
                          ...userInfo,
                          notifications: {
                            ...userInfo.notifications,
                            donationReceipts: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{t("cancel")}</Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? t("saving") : t("saveChanges")}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("payment.title")}</CardTitle>
                <CardDescription>{t("payment.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <CreditCard className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {t("payment.savedMethods")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t("payment.noSavedMethods")}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("payment.addMethod")}
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("payment.donationHistory")}
                  </h3>
                  <div className="rounded-lg border">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {t("payment.recentDonations")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t("payment.viewAll")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          {t("payment.downloadReceipts")}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-500">
                        {t("payment.viewDonationsDescription")}
                      </p>
                      <Button
                        variant="link"
                        onClick={() => router.push("/my-donations")}
                      >
                        {t("payment.viewDonations")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
