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

// apis
import { api } from "@/axios";

export const Register = () => {
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

      await api.post("/register", values).then(data => {
        console.log("DATA", data);
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
      <div className="bg-bg py-5 px-5">
        <h3 className="mb-5 text-center font-bold text-2xl">Register</h3>
        <div className="rounded-md sm:w-[320px] w-[500px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="w-full flex flex-wrap gap-[10px]">
              <div className="w-[calc(50%-5px)]">
                <Field type="text" name="name" placeholder="Name" as={Input} />
                {formErrors.name && (
                  <div className="text-error  text-xs">{formErrors.name}</div>
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
                  <div className="text-error text-xs">{formErrors.surname}</div>
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
                  <div className="text-error text-xs">{formErrors.email}</div>
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
                  <div className="text-error text-xs">
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
                  <div className="text-error text-xs">
                    {formErrors.confirmPassword}
                  </div>
                )}
              </div>

              <Button classNames="mt-2 flex mx-auto" type="submit">
                Register
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </ModalContent>
  );
};
