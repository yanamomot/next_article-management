"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useStore } from "../../store/store";
import { ArticleItem } from "../../components/Article";
import { SortBy } from "@/types/Sort&Filter";
import { filter } from "../../helper/filter";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function AdminPanel() {
  const { articles, fetch } = useStore();
  const [sortBy, setSortBy] = useState(SortBy.All);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const normalized = articles.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    url: item.url,
    published: item.published.split("T")[0],
  }));

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value as SortBy;

    setSortBy(selectedCategory);
  };

  const total = useMemo(() => articles.length, [articles]);
  const filtered = filter(normalized, { sortBy, query });

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="flex-grow">
          <div className="p-6 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-bold mb-3">Articles</h1>
            <h3 className="text-lg mb-6">{`${total} articles on page`}</h3>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 space-y-4 sm:space-y-0 mb-10 sm:mb-20">
              <div className="flex items-center mb-20 sm:mb-0">
                <div className="flex flex-col">
                  <span className="mr-4 text-gray-700 mb-2">Sort by:</span>
                  <select
                    name="sort"
                    onChange={handleSort}
                    value={sortBy}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value={SortBy.All}>{SortBy.All}</option>
                    <option value={SortBy.Newest}>{SortBy.Newest}</option>
                    <option value={SortBy.Oldest}>{SortBy.Oldest}</option>
                  </select>
                </div>
                <div className="flex flex-col ml-10">
                  <span className="mr-4 text-gray-700 mb-2">
                    Items per page:
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="p-2 border border-gray-300 rounded-md mr-9"
                  >
                    <option value={total}>All</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>
              </div>
              <div>
                <Link href={`/admin-panel/create`}>
                  <i className="bi bi-plus-lg fs-5 me-5 p-2 cursor-pointer bg-green-100 hover:bg-green-200 rounded-md text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2"></i>
                </Link>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="p-2 border border-gray-300 rounded-md w-full sm:w-auto mt-10 sm:mt-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <ArticleItem key={item.id} item={item} isAdmin={true} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No articles found
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center space-x-4 mt-2 mb-10">
          {Array.from(
            { length: Math.ceil(filtered.length / itemsPerPage) },
            (_, i) => i + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`flex items-center justify-center px-3 py-3 border border-gray-300 rounded-md ${
                currentPage === pageNumber ? "bg-gray-200" : ""
              }`}
              style={{ width: "10px", height: "10px", margin: "4px" }} // Ensure square buttons with margin for wrapping
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
