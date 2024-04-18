import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import classNames from "classnames";

// stores
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { handleCloseModals } from "@/redux/modals";
interface ModalProps {
  isOpen: boolean;
  bgClose: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SidePanelLayout = ({
  isOpen,
  className,
  bgClose = false,
  children,
}: ModalProps) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 z-[100] w-screen">
        <div className="flex flex-col min-h-[100vh]  items-end">
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

          <div className="relative">
            <button
              type="button"
              className="absolute left-[-5rem] top-[2rem] leading-none text-white text-h4"
              onClick={() => {
                dispatch(handleCloseModals());
              }}
            >
              X
            </button>
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
                className={classNames(
                  "relative bg-bg text-left shadow-xl transition-all h-[100vh] w-[70rem] min-h-[100vh] flex-1 p-[2rem]",
                  className
                )}
              >
                <div className="h-full overflow-y-auto">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition>
  );
};
