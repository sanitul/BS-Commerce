import type { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

import { ResponseItem } from 'models';
import { deleteCartItem } from 'toolkit/cartSlice';
import { useAppDispatch, useAppSelector } from 'customHooks/hooks';

import Buttons from '@/components/global/components/buttons/button';
import Modal from '@/components/global/components/modal/modal';
import Image from 'next/image';
import { userAPI } from 'APIs';

const CartDropdown: NextComponentType = () => {
  const componentRef = useRef();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [cartTotal, setCartTotal] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const cartData = useAppSelector(
    (state) => state.persistedReducer.cart.allCartItems
  );

  const token = useAppSelector(
    (state) => state.persistedReducer.auth.access_token
  );

  const totalCartPrice = cartData!.reduce((total, data) => {
    return total + data?.product?.info?.price! * data.quantity;
  }, 0);

  const handleCartItemDelete = async (product: ResponseItem) => {
    const productId = product.productId;
    await userAPI.deleteSingleCartItem(productId);
    dispatch(deleteCartItem(product));
  };

  const handleClickProceed = () => {
    if (!token) setModalOn(true);
    else {
      router.push('/checkout');
    }
  };

  const handleClickViewCart = () => {
    if (!token) setModalOn(true);
    else {
      router.push('/cart');
    }
  };

  const cartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 hover:text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
  const cross = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e: any) {
      if (componentRef && componentRef.current) {
        const ref: any = componentRef.current;
        if (!ref.contains(e.target)) {
          setCartTotal(false);
        }
      }
    }
  }, []);
  const dropdownData = () => {
    return cartData?.map((cartData, index) => {
      return (
        <div key={cartData.productId}>
          <div className="mr-4 flex items-center justify-between">
            <div className="group flex h-auto w-full items-center px-4 py-2 text-sm leading-5 text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-none">
              <div className="flex-col-4 flex items-center bg-white">
                <div className="col-span-2">
                  <a href="#" className="">
                    <Image
                      src={cartData?.product?.photos![0]?.url!}
                      alt="Product Image"
                      height={100}
                      width={100}
                    />
                  </a>
                </div>
                <div className="col-span-2 justify-between px-4 leading-normal">
                  <div>
                    <a
                      href="#"
                      className="mr-2 text-sm font-bold text-gray-900"
                    >
                      {cartData?.product?.info?.name}
                    </a>
                  </div>
                  <div>
                    <div className="py-2">
                      <span className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        {cartData?.quantity} &nbsp;
                      </span>
                      X &nbsp;
                      <p className="mb-2 font-semibold text-gray-700 dark:text-gray-400">
                        $ {cartData?.product?.info?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-16 mb-16">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCartItemDelete(cartData);
                }}
              >
                {cross}
              </button>
            </div>
          </div>
          <div className="border-t border-gray-100"></div>
        </div>
      );
    });
  };
  return (
    <>
      {modalOn && (
        <Modal
          setModalOn={setModalOn}
          setChoice={setChoice}
          modalTitle="You need to login first."
          bodyText="Proceed to login?"
        />
      )}
      <div
        ref={componentRef as any}
        className="flex items-center justify-center"
      >
        <div className="relative inline-block text-left">
          <div className="hover:text-green-600">
            <button
              type="button"
              className="focus:shadow-outline-blue inline-flex w-full justify-center text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-green-600 focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800"
              onClick={(e) => setCartTotal(!cartTotal)}
            >
              {cartIcon}
              <p className="badge badge-light ">
                {cartData?.length > 0 ? cartData?.length : 0}
              </p>
            </button>
          </div>
          {cartTotal && document.body.clientWidth >= 1024 ? (
            <div className="absolute right-0 mt-2 h-auto w-96 origin-top-right rounded-md ">
              <div className=" rounded-md bg-white">
                {/* new div starts here */}
                <div
                  className={
                    cartData.length
                      ? 'h-48 overflow-y-scroll border-x-2 py-1'
                      : 'h-20 border'
                  }
                >
                  {cartData.length > 0 ? (
                    dropdownData()
                  ) : (
                    <div className="p-5 text-lg">
                      Your cart is currently empty
                    </div>
                  )}
                </div>
                {/* new div ends here */}
                {cartData.length > 0 ? (
                  <>
                    <div className="flex justify-between border-x-2 p-6">
                      <span className="text-base font-semibold">Total</span>
                      <span className="text-base font-semibold">
                        ${totalCartPrice}
                      </span>
                    </div>
                    <div className="border-x-2 px-6 py-2">
                      <Link href="/cart" passHref>
                        <a>
                          <button
                            className="h-10 w-full bg-slate-300 hover:bg-[#40A944] hover:text-white"
                            onClick={() => {
                              handleClickViewCart();
                              setCartTotal(!cartTotal);
                            }}
                          >
                            VIEW CART
                          </button>
                        </a>
                      </Link>
                    </div>
                    <div className="mb-4 border-x-2 border-b-2 px-6 pb-5">
                      <button
                        className="h-10 w-full bg-slate-300 hover:bg-[#40A944] hover:text-white"
                        onClick={handleClickProceed}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default CartDropdown;
