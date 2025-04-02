"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
import { ModeToggle } from "./ui/ModeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import { Search, Menu, HeartHandshake, User, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <nav className="w-full bg-white dark:bg-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t("logo")}
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation - only visible on medium screens and above */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/projects">{t("charity_projects")}</Link>
          <Link href="/donate">{t("donation_methods")}</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("sections")}</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/section1"
                          className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          {t("section1")}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/section2"
                          className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          {t("section2")}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("about_us")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about"
                          className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          {t("about_page")}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contact"
                          className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                        >
                          {t("contact_us")}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="hidden md:flex items-center border-secondary border-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="bg-transparent border-none outline-none text-sm dark:text-gray-200 w-32 ml-2 text-right rtl:text-right ltr:text-left"
            />
            <Search className="h-4 w-4 text-secondary dark:text-secondary/20" />
          </div>

          {/* Theme Switcher */}
          <ModeToggle />

          {/* Language Selector */}
          <LocaleSwitcher />

          {/* User Authentication Section */}
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  {session.user?.image ? (
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image || "/default-avatar.png"}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback>
                        {session.user?.name || t("user_account")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {session.user?.name || t("user_account")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    {t("profile") || "Profile"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-donations" className="cursor-pointer">
                    {t("my_donations") || "My Donations"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("logout") || "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* Login Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden md:flex bg-primary">
                    {t("login")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {t("login")}
                      </h2>
                    </DialogTitle>
                    <DialogDescription>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("login_description")}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4 py-4">
                      <div className="flex flex-col items-start justify-between gap-4">
                        <Label htmlFor="username" className="text-right">
                          {t("username")}
                        </Label>
                        <Input
                          id="username"
                          className="col-span-3"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col items-start justify-between gap-4">
                        <Label htmlFor="password" className="text-right">
                          {t("password")}
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          className="col-span-3"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="w-full" type="submit">
                        {t("login")}
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
                        onClick={() => signIn("google")}
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

              {/* Register Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="hidden md:flex bg-secondary hover:bg-secondary/80 text-xl">
                    {t("register")}
                    <HeartHandshake
                      size={40}
                      strokeWidth={1.75}
                      className="mX-2 text-2xl"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {t("register")}
                      </h2>
                    </DialogTitle>
                    <DialogDescription>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("register_description")}
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start justify-between gap-4">
                      <Label htmlFor="username" className="text-right">
                        {t("username")}
                      </Label>
                      <Input id="username" className="col-span-3" />
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4">
                      <Label htmlFor="password" className="text-right">
                        {t("password")}
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full" type="submit">
                      {t("register")}
                    </Button>
                  </DialogFooter>

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
                        onClick={() => signIn("google")}
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
            </>
          )}

          {/* Mobile Menu - Using Sheet from your original code */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col h-full px-4">
                  <SheetTitle className="sr-only">{t("menu")}</SheetTitle>

                  <div className="py-4 border-b">
                    <h2 className="text-xl font-bold text-center">
                      {t("menu")}
                    </h2>
                  </div>

                  {/* User Profile - Mobile */}
                  {status === "authenticated" && (
                    <div className="py-4 border-b flex items-center gap-3">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="text-sm text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center bg-gray-100 border-secondary border-2 dark:bg-gray-800 rounded-full px-3 py-1 my-4">
                    <input
                      type="text"
                      placeholder={t("search_placeholder")}
                      className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-200 w-full ml-2 rtl:text-right ltr:text-left"
                    />
                    <Search className="h-4 w-4 text-secondary dark:text-gray-400" />
                  </div>

                  <div className="space-y-4 flex-1 overflow-auto py-4">
                    <Link href="/projects" className="block">
                      <Button className="w-full">
                        {t("charity_projects")}
                      </Button>
                    </Link>
                    <Link href="/donate" className="block">
                      <Button className="w-full">
                        {t("donation_methods")}
                      </Button>
                    </Link>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="sections">
                        <AccordionTrigger className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          {t("sections")}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 space-y-2">
                            <Link
                              href="/section1"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              {t("section1")}
                            </Link>
                            <Link
                              href="/section2"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              {t("section2")}
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="about">
                        <AccordionTrigger className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          {t("about_us")}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4 space-y-2">
                            <Link
                              href="/about"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              {t("about_page")}
                            </Link>
                            <Link
                              href="/contact"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              {t("contact_us")}
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="mt-auto border-t py-4 flex flex-col gap-3">
                    {status === "authenticated" ? (
                      <>
                        <Link href="/profile">
                          <Button variant="outline" className="w-full">
                            {t("profile") || "Profile"}
                          </Button>
                        </Link>
                        <Link href="/my-donations">
                          <Button variant="outline" className="w-full">
                            {t("my_donations") || "My Donations"}
                          </Button>
                        </Link>
                        <Button
                          onClick={() => signOut()}
                          className="w-full"
                          variant="destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t("logout") || "Logout"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full">{t("login")}</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {t("login")}
                                </h2>
                              </DialogTitle>
                              <DialogDescription>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {t("login_description")}
                                </p>
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleLogin}>
                              <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start justify-between gap-4">
                                  <Label
                                    htmlFor="mobile-username"
                                    className="text-right"
                                  >
                                    {t("username")}
                                  </Label>
                                  <Input
                                    id="mobile-username"
                                    className="col-span-3"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="flex flex-col items-start justify-between gap-4">
                                  <Label
                                    htmlFor="mobile-password"
                                    className="text-right"
                                  >
                                    {t("password")}
                                  </Label>
                                  <Input
                                    id="mobile-password"
                                    type="password"
                                    className="col-span-3"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button className="w-full" type="submit">
                                  {t("login")}
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
                                    {t("or_continue_with") ||
                                      "Or continue with"}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => signIn("google")}
                                >
                                  <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                  >
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
                        {/* Register Button */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-secondary hover:bg-secondary/80 text-xl w-full">
                              {t("register")}
                              <HeartHandshake
                                size={40}
                                strokeWidth={1.75}
                                className="mX-2 text-2xl"
                              />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {t("register")}
                                </h2>
                              </DialogTitle>
                              <DialogDescription>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {t("register_description")}
                                </p>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex flex-col items-start justify-between gap-4">
                                <Label
                                  htmlFor="username"
                                  className="text-right"
                                >
                                  {t("username")}
                                </Label>
                                <Input id="username" className="col-span-3" />
                              </div>
                              <div className="flex flex-col items-start justify-between gap-4">
                                <Label
                                  htmlFor="password"
                                  className="text-right"
                                >
                                  {t("password")}
                                </Label>
                                <Input
                                  id="password"
                                  type="password"
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="w-full" type="submit">
                                {t("register")}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
