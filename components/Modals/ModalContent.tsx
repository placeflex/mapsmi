import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import clsx from "clsx";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";

import { handleCloseModals } from "@/stores/modals";

// icons
import Close from "@/public/icons/close.svg";
interface ModalProps {
  isModalOpen: boolean;
  bgClose: boolean;
  className?: string;
  children: React.ReactNode;
  bgColor?: string;
}

export const ModalContent = ({
  isModalOpen,
  className,
  bgClose = false,
  children,
  bgColor = "bg-bg",
}: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Transition show={isModalOpen}>
      <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
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
            <div
              className={`relative ${bgColor} transform overflow-hidden overflow-y-auto rounded-lg text-left shadow-xl transition-all m-[2rem] `}
            >
              <button
                type="button"
                className="absolute right-[1rem] top-[1rem] leading-none"
                onClick={() => {
                  dispatch(handleCloseModals());
                }}
              >
                <Close width={20} height={20} />
              </button>

              {children}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};
