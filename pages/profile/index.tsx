import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import * as yup from "yup";
import { Formik, Form, Field } from "formik";

// components
import PrivateRoute from "@/components/PrivateRoute";
import { ProfileLayout } from "@/modules/Profile/ProfileLayout";
import { Layout as PageLayout } from "@/components/Layout";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

// apis
import { api } from "@/axios";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";
import { handleSaveUser } from "@/redux/user";

// helpers
import { toast } from "react-toastify";

const UserProfile = () => {
  const router = useRouter();
  const user = useTypedSelector(({ user }) => user.user);

  const initialValues = {
    name: "",
    surname: "",
  };

  const [userFields, setUserFields] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const dispatch = useDispatch();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });

      if (JSON.stringify(values) === JSON.stringify(userFields)) {
        return toast.success("You should change something.");
      }

      await api
        .patch("me", {
          ...values,
        })
        .then(({ data, message }: any) => {
          toast.success(message);
          dispatch(handleSaveUser(data));
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

  const validationSchema = yup.object().shape({
    name: yup.string().required("Имя обязательно"),
    surname: yup.string().required("Фамилия обязательна"),
  });

  useEffect(() => {
    const { projects, email, ...rest } = user;

    setUserFields(prev => ({
      ...prev,
      ...rest,
    }));
  }, [user]);

  return (
    <PrivateRoute>
      <PageLayout>
        <Container>
          <ProfileLayout>
            <h1 className="mb-2 font-bold text-2xl leading-none">Account</h1>
            <p className="mb-4">
              Here, you can edit your personal information such as your name and
              email address.
            </p>

            <div className="flex flex-col">
              <Formik
                initialValues={userFields}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                <Form className="w-full flex flex-wrap gap-[10px]">
                  <div className="w-full">
                    <Field
                      type="name"
                      name="name"
                      placeholder="Name"
                      as={Input}
                    />
                    {formErrors.name && (
                      <div className="text-error text-xs">
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <Field
                      type="surname"
                      name="surname"
                      placeholder="Surname"
                      as={Input}
                    />
                    {formErrors.surname && (
                      <div className="text-error text-xs">
                        {formErrors.surname}
                      </div>
                    )}
                  </div>

                  <Button classNames="mt-4 flex" type="submit">
                    Update
                  </Button>
                </Form>
              </Formik>
            </div>
          </ProfileLayout>
        </Container>
      </PageLayout>
    </PrivateRoute>
  );
};

export default UserProfile;
