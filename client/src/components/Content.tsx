import React, { useEffect, useState } from "react";
import Product from "./Product";
import Products from "./Products";
import Filter from "./Filter";
import Pagination from "./Pagination";

const Content = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Perform API request or update data based on the new page number
  };
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="#"
            >
              Store
            </a>
          </div>
          <Filter
            setNameFilter={setNameFilter}
            setCategoryFilter={setCategoryFilter}
            setPriceFilter={setPriceFilter}
            setSort={setSort}
          />
        </nav>

        <Products
          categoryFilter={categoryFilter}
          priceFilter={priceFilter}
          nameFilter={nameFilter}
          currentPage={currentPage}
          sort={sort}
          setProductsCount={setProductsCount}
        />
      </div>
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(productsCount / 8)}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Content;
