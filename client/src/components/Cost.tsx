import React from "react";

const Cost: React.FC<{ subTotal: number }> = ({ subTotal }) => {
  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Giá tiền</p>
        <p className="text-gray-700">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(subTotal)}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">VAT (8%)</p>
        <p className="text-gray-700">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(subTotal * 0.08)}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Tổng thanh toán</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(subTotal * 1.08)}
          </p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
        Thanh toán
      </button>
    </div>
  );
};

export default Cost;
