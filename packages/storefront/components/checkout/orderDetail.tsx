import { NextComponentType } from "next";
import React from "react";
import ProductList from "./productList";

const OrderedProducts = (props: any) => {
  return (
    <>
      <div className="row mx-12 my-7">
        <div className="flex flex-col divide-y-2">
          <div>
            <ProductList />
          </div>
          <div className="mt-5">
            <div className="row text-sm">
              <div className="flex flex-wrap justify-between mt-4">
                <p className="text-gray-600/100">Subtotal</p>
                <p className="font-semibold">$11.39</p>
              </div>
              <div className="flex flex-wrap justify-between mt-2">
                <p className="text-gray-600/100 ">Shipping</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="flex flex-wrap justify-between mt-2">
                <p className="text-gray-600/100">Taxes</p>
                <p className="font-semibold">$2.33</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="row">
              <div className="flex flex-wrap justify-between mt-4">
                <p className="text-gray-600/100">Total</p>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs text-gray-500">USD</p>
                  <p className="text-2xl font-semibold">$13.72</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderedProducts;
