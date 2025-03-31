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
import { Search, Menu, HeartHandshake } from "lucide-react";
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

export default function Navbar() {
  const t = useTranslations("navbar");

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
          <div className="hidden md:flex items-center  border-secondary border-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
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
                  <Input id="password" type="password" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full" type="submit">
                  {t("login")}
                </Button>
              </DialogFooter>
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
                  <Input id="password" type="password" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full" type="submit">
                  {t("register")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

                  <div className="flex items-center bg-gray-100 border-secondary border-2 dark:bg-gray-800 rounded-full px-3 py-1 my-4">
                    <input
                      type="text"
                      placeholder={t("search_placeholder")}
                      className="bg-transparent border-none  outline-none text-sm text-gray-700 dark:text-gray-200 w-full ml-2 rtl:text-right ltr:text-left"
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
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button className="w-full" type="submit">
                            {t("login")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {/* Register Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className=" md:flex bg-secondary hover:bg-secondary/80 text-xl">
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
                      </DialogContent>
                    </Dialog>
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
