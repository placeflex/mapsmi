/* eslint-disable react/no-unescaped-entities */
import * as yup from "yup";
import { Formik, Form, Field } from "formik";

import { useEffect, useState } from "react";

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

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const isOpen = useTypedSelector(({ modals }) => modals.forgotPassword);

  const initialValues = {
    email: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите правильный адрес электронной почты")
      .required("Email обязателен"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });

      await api
        .post("auth/send-reset-password-email", values)
        .then(({ message }: any) => {
          dispatch(handleCloseModals());
          toast.success(message);
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

  useEffect(() => {
    if (!isOpen) {
      setFormErrors(initialValues);
    }
  }, [isOpen]);

  return (
    <ModalContent isModalOpen={isOpen} bgClose>
      <div className="py-5 px-5">
        <h3 className="mb-2 text-center font-bold text-2xl">Forgot Password</h3>
        <p className="text-xs text-center mb-5">
          Password reset instructions will be sent to <br /> your registered
          email address.
        </p>
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
                  <div className="text-error  text-xs">{formErrors.email}</div>
                )}
              </div>

              <Button classNames="mt-2 flex mx-auto" type="submit">
                Next
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </ModalContent>
  );
};
