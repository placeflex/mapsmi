import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import clsx from "clsx";

import { useState } from "react";

// components
import { Button } from "@/components/Button";
import { ModalContent } from "./ModalContent";
import { Input } from "@/components/Input";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import { handleShowLoginModal, handleCloseModals } from "@/redux/modals";

// apis
import { api } from "@/axios";

// helpers
import { toast } from "react-toastify";

export const Register = () => {
  const dispatch = useDispatch();
  const isOpen = useTypedSelector(({ modals }) => modals.registerModal);

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Имя обязательно"),
    surname: yup.string().required("Фамилия обязательна"),
    email: yup
      .string()
      .email("Введите правильный адрес электронной почты")
      .required("Email обязателен"),
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
        .post("auth/register", { ...values })
        .then(data => {
          toast.success(
            "We have sent you a message to your new email address, please go to confirm."
          );
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
        });

      // Если валидация прошла успешно, данные можно отправить
    } catch (errors: any) {
      // Если есть ошибки валидации, обновите состояния ошибок
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
        <h3 className="mb-5 text-center font-bold">Register</h3>
        <div className="rounded-md sm:w-[520px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="w-full flex flex-wrap gap-[10px]">
              <div className="w-[calc(50%-5px)]">
                <Field type="text" name="name" placeholder="Name" as={Input} />
                {formErrors.name && (
                  <div className="text-error">{formErrors.name}</div>
                )}
              </div>

              <div className="w-[calc(50%-5px)]">
                <Field
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  as={Input}
                />
                {formErrors.surname && (
                  <div className="text-error">{formErrors.surname}</div>
                )}
              </div>

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
                  <div className="text-error">{formErrors.password}</div>
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
                  <div className="text-error">{formErrors.confirmPassword}</div>
                )}
              </div>

              <Button className={clsx("mt-2 flex mx-auto")} type="submit">
                Register
              </Button>
            </Form>
          </Formik>

          <span className="text-right block mt-4">
            Already have an account?{" "}
            <span
              className="text-link underline cursor-pointer hover:no-underline"
              onClick={() => {
                dispatch(handleCloseModals());
                dispatch(handleShowLoginModal());
              }}
            >
              Sign In
            </span>
          </span>
        </div>
      </div>
    </ModalContent>
  );
};
