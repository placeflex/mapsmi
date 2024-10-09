/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";

import { useState } from "react";

// components
import { Button } from "@/components/Button";
import { ModalContent } from "./ModalContent";
import { Input } from "@/components/Input";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import { handleCloseModals } from "@/redux/modals";

// helpers
import { toast } from "react-toastify";

// apis
import { api } from "@/axios";

export const LiqPayModal = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useTypedSelector(({ modals }) => modals.liqpay);

  return (
    <ModalContent isModalOpen={isOpen} bgClose>
      <div className="">
        <div className="rounded-md sm:w-[520px]">{children}</div>
      </div>
    </ModalContent>
  );
};
