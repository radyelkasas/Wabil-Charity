"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, Search } from "lucide-react";

// Mock data for donations
const mockDonations = [
  {
    id: "1",
    date: "2023-11-01",
    amount: 100,
    project: "حملة إطعام رمضان للأسر في الريف",
    projectId: "proj-1",
    status: "completed",
  },
  {
    id: "2",
    date: "2023-10-15",
    amount: 200,
    project: "حملة علاج المرضى غير القادرين",
    projectId: "proj-2",
    status: "completed",
  },
  {
    id: "3",
    date: "2023-09-22",
    amount: 50,
    project: "دعم زواج الشباب",
    projectId: "proj-3",
    status: "completed",
  },
  {
    id: "4",
    date: "2023-08-10",
    amount: 150,
    project: "بناء مسجد في قرية نائية",
    projectId: "proj-4",
    status: "completed",
  },
  {
    id: "5",
    date: "2023-07-05",
    amount: 300,
    project: "توفير مياه نظيفة للقرى المحرومة",
    projectId: "proj-5",
    status: "completed",
  },
];

export default function MyDonationsPage() {
  const { status } = useSession();
  const t = useTranslations("my_donations");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort donations
  const filteredDonations = mockDonations
    .filter((donation) => {
      // Apply search
      const matchesSearch = donation.project
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Apply status filter
      const matchesStatus =
        statusFilter === "all" || donation.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "recent":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Display placeholder if no results
  const noResults = filteredDonations.length === 0;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {t("statuses.completed")}
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            {t("statuses.pending")}
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {t("statuses.failed")}
          </span>
        );
      default:
        return null;
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("description")}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder={t("filterBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all")}</SelectItem>
              <SelectItem value="completed">
                {t("filters.completed")}
              </SelectItem>
              <SelectItem value="pending">{t("filters.pending")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger>
              <SelectValue placeholder={t("sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">{t("sort.recent")}</SelectItem>
              <SelectItem value="oldest">{t("sort.oldest")}</SelectItem>
              <SelectItem value="highest">{t("sort.highest")}</SelectItem>
              <SelectItem value="lowest">{t("sort.lowest")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredDonations.length} {t("results")}
        </p>
      </div>

      {/* Donations Table */}
      {noResults ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-center mb-2">
              {t("noResults")}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              {searchTerm || statusFilter !== "all"
                ? t("tryAdjustingFilters")
                : t("startDonating")}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button asChild>
                <Link href="/projects">{t("startDonating")}</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("amount")}</TableHead>
                  <TableHead>{t("project")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead className="text-right">
                    {t("viewDetails")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">
                      {formatDate(donation.date)}
                    </TableCell>
                    <TableCell>
                      {donation.amount} {t("currency")}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {donation.project}
                    </TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${donation.projectId}`}>
                          {t("viewDetails")}
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Show only current page, first, last, and adjacent pages
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  return null;
                }
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="mt-2 text-center text-sm text-gray-500">
            <span>
              {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredDonations.length)}{" "}
              {t("paginationOf")} {filteredDonations.length} {t("results")}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
