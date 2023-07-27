import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";

type Category = {
  id: number;
  name: string;
  createdDate: Date;
  updatedDate: Date;
};

type FilterProps = {
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  setPriceFilter: Dispatch<SetStateAction<string>>;
  setNameFilter: Dispatch<SetStateAction<string>>;
  setSort: Dispatch<SetStateAction<string>>;
};

const Filter: React.FC<FilterProps> = ({
  setCategoryFilter,
  setPriceFilter,
  setNameFilter,
  setSort,
}: FilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nameProduct, setNameProduct] = useState<string>("");
  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCategoryFilter(`category=${e.target.value}`);
  };

  const handleSelectPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    let minPrice, maxPrice;
    if (!e.target.value) {
      minPrice = 0;
      maxPrice = 99999999999999;
    } else {
      minPrice = e.target.value.split(",")[0];
      maxPrice = e.target.value.split(",")[1];
    }
    setPriceFilter(`minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  const handleSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSort(`sort=${e.target.value}`);
  };

  const handleSearchByName = (e: React.FormEvent) => {
    e.preventDefault();
    setNameFilter(`name=${nameProduct}`);
  };
  useEffect(() => {
    let controller = new AbortController();
    const getCategories = async () => {
      const response = await fetch(categoryApi, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const categories = await response.json();
      setCategories(categories);
    };
    getCategories();
    return () => controller.abort();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="py-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          <form className="flex" onSubmit={handleSearchByName}>
            <input
              type="text"
              id="name"
              placeholder="Tìm kiếm theo tên"
              className="mt block w-full rounded-l-md border-gray-300 shadow-sm focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              onChange={(e) => setNameProduct(e.target.value)}
            />

            <button className="px-4 py-2 rounded-r-lg text-orange-50 bg-gray-900 hover:bg-slate-400 font-bold text-white shadow-lgtransition ease-in-out duration-200 translate-10">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
        <div className="flex flex-col h-16">
          <label
            htmlFor="status"
            className="font-medium text-sm text-stone-600"
          >
            Khoảng giá
          </label>

          <select
            onChange={handleSelectPrice}
            id="status"
            className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-2"
          >
            <option value={""}>Không giới hạn</option>
            <option value={["0", "1000000"]}>Dưới 1.000.000 VND</option>
            <option value={["1000000", "5000000"]}>
              1.000.000 - 5.000.000 VND
            </option>
            <option value={["5000000", "10000000"]}>
              5.000.000 - 10.000.000 VND
            </option>
            <option value={["10000000", "30000000"]}>
              10.000.000 - 30.000.000 VND
            </option>
            <option value={["30000000", "100000000"]}>
              30.000.000 - 100.000.000 VND
            </option>
            <option value={["100000000", "999999999999999"]}>
              Trên 100.000.000 VND
            </option>
          </select>
        </div>

        <div className="flex flex-col h-16">
          <label
            htmlFor="category"
            className="font-medium text-sm text-stone-600"
          >
            Thương hiệu
          </label>

          <select
            onChange={handleSelectCategory}
            id="category"
            className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-2"
          >
            <option value={""}>Tất cả thương hiệu</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={`${category.name}`}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col h-16">
          <label
            htmlFor="status"
            className="font-medium text-sm text-stone-600"
          >
            Sắp xếp theo
          </label>

          <select
            id="status"
            className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 p-2"
            onChange={handleSelectSort}
          >
            <option value={""}>Mới nhất</option>
            <option value={"priceAsc"}>Giá tăng dần</option>
            <option value={"priceDesc"}>Giá giảm dần</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
