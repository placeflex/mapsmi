import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import clsx from 'clsx';

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { handleCloseModals } from "@/redux/modals";
interface ModalProps {
  isModalOpen: boolean;
  bgClose: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ModalContent = ({
  isModalOpen,
  className,
  bgClose = false,
  children,
}: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Transition show={isModalOpen}>
      <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-[2rem] py-[4rem]">
          {bgClose && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed left-0 top-0 bottom-0 right-0 bg-black bg-opacity-75 transition-opacity w-full h-full"
                onClick={() => {
                  dispatch(handleCloseModals());
                }}
              />
            </Transition.Child>
          )}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 "
          >
            <div className="relative bg-bg transform overflow-hidden overflow-y-auto rounded-lg text-left shadow-xl transition-all">
              <button
                type="button"
                className="absolute right-2 top-2 leading-none"
                onClick={() => {
                  dispatch(handleCloseModals());
                }}
              >
                X
              </button>

              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};
