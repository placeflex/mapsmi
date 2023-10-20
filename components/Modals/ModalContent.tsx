import classNames from "classnames";

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
    isModalOpen && (
      <>
        <div
          className="absolute w-full h-full top-0 left-0 z-[998] bg-black/[0.9]"
          onClick={() => {
            bgClose && dispatch(handleCloseModals());
          }}
        ></div>
        <div
          className={classNames(
            "absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-4/5 bg-transparent z-[999]",
            className
          )}
        >
          {children}
        </div>
      </>
    )
  );
};
