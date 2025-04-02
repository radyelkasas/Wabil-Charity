"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Heart, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();
  const t = useTranslations("profile");

  if (!session) {
    return null; // This should not happen due to middleware protection
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t("title") || "My Profile"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                {session.user?.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <CardTitle className="text-center">{session.user?.name}</CardTitle>
            <CardDescription className="text-center">
              {session.user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t("memberSince") || "Member Since"}</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                {t("editProfile") || "Edit Profile"}
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Donation History */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                {t("donationHistory") || "Donation History"}
              </div>
            </CardTitle>
            <CardDescription>
              {t("recentDonations") || "Your recent donations"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This is just placeholder data - in a real app, you'd fetch from your API */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">
                      {t("project")} #{item}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {100 * item} {t("currency") || "$"}
                    </p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {t("completed") || "Completed"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/my-donations">
                {t("viewAllDonations") || "View All Donations"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
