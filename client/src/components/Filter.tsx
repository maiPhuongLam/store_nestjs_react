import React, { useEffect, useState } from "react";
import { categoryApi } from "../api/categoryApi";

type Category = {
  id: number;
  name: string;
  createdDate: Date;
  updatedDate: Date;
};

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
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
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div className="py-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="font-medium text-sm text-stone-600"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tìm kiếm theo tên"
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="font-medium text-sm text-stone-600"
            >
              Khoảng giá
            </label>

            <select
              id="status"
              className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            >
              <option>Không giới hạn</option>
              <option value={["0", "1000000"]}>{"Dưới 1.000.000 VND"}</option>
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

          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="font-medium text-sm text-stone-600"
            >
              Thương hiệu
            </label>

            <select
              id="category"
              className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            >
              <option>Tất cả thương hiệu</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={`${category.name}`}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="font-medium text-sm text-stone-600"
            >
              Sắp xếp theo
            </label>

            <select
              id="status"
              className="h-full mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            >
              <option>Mới nhất</option>
              <option>Giá tăng dần</option>
              <option>Giá giảm dần</option>
            </select>
          </div>
        </div>

        <div className="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
          <button className="px-4 py-2 rounded-lg text-stone-50 bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10">
            Reset
          </button>

          <button className="px-4 py-2 rounded-lg text-orange-50 bg-orange-400 hover:bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition ease-in-out duration-200 translate-10">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
