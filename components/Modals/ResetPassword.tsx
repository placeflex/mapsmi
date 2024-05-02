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

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useTypedSelector(({ modals }) => modals.resetPassword);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    password: yup.string().required("Пароль обязателен"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают")
      .required("Пароли не совпадают"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });

      await api
        .post(`auth/reset-password`, {
          ...values,
          resetPasswordToken: router.query.resetPasswordToken,
        })
        .then(({ message }: any) => {
          router.push("/");
          dispatch(handleCloseModals());
          toast.success(message);
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
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
        <h3 className="mb-2 text-center font-bold">New Password</h3>
        <div className="rounded-md sm:w-[520px] ">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="w-full flex flex-wrap gap-[10px]">
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

              <div className="w-full">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  as={Input}
                />
                {formErrors.confirmPassword && (
                  <div className="text-error">
                    {formErrors.confirmPassword}
                  </div>
                )}
              </div>

              <Button className="mt-2 flex mx-auto" type="submit">
                Update
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </ModalContent>
  );
};
