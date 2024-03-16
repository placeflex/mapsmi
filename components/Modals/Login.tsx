/* eslint-disable react/no-unescaped-entities */
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
import {
  handleShowRegisterModal,
  handleCloseModals,
  handleShowForgorPasswordModal,
} from "@/redux/modals";
import { handleSaveUser } from "@/redux/user";

// helpers
import { toast } from "react-toastify";

// apis
import { api } from "@/axios";

export const Login = () => {
  const dispatch = useDispatch();
  const isOpen = useTypedSelector(({ modals }) => modals.loginModal);

  const initialValues = {
    email: "",
    password: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите правильный адрес электронной почты")
      .required("Email обязателен"),
    password: yup.string().required("Пароль обязателен"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });

      await api
        .post("auth/login", values)
        .then(({ data }) => {
          dispatch(handleSaveUser(data));
          dispatch(handleCloseModals());
        })
        .catch(({ error }) => {
          toast.error(error);
        });
    } catch (errors: any) {
      const errorMessages: any = {};
      errors.inner.forEach((error: any) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages);
    }
  };

  return (
    <ModalContent isModalOpen={isOpen} bgClose>
      <div className="py-5 px-5">
        <h3 className="mb-5 text-center font-bold">Login</h3>
        <div className="rounded-md sm:w-[520px] ">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="w-full flex flex-wrap gap-[10px]">
              <div className="w-full">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  as={Input}
                />
                {formErrors.email && (
                  <div className="text-error">{formErrors.email}</div>
                )}
              </div>

              <div className="w-full">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  as={Input}
                />
                {formErrors.password && (
                  <div className="text-error">
                    {formErrors.password}
                  </div>
                )}
              </div>

              <Button classNames="mt-2 flex mx-auto" type="submit">
                Login
              </Button>
            </Form>
          </Formik>

          <div className="flex items-center justify-between mt-4">
            <span
              className=" text-button underline cursor-pointer hover:no-underline"
              onClick={() => {
                dispatch(handleCloseModals());
                dispatch(handleShowForgorPasswordModal());
              }}
            >
              Forgot Password?
            </span>

            <span className="">
              Don't have an account?{" "}
              <span
                className="text-button underline cursor-pointer hover:no-underline"
                onClick={() => {
                  dispatch(handleCloseModals());
                  dispatch(handleShowRegisterModal());
                }}
              >
                Register
              </span>
            </span>
          </div>
        </div>
      </div>
    </ModalContent>
  );
};
