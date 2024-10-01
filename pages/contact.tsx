import { useState } from "react";

import { Layout } from "@/components/Layout";

import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AutoComplete } from "@/components/AutoComplete";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { SearchSelect } from "@/components/SearchSelect";
import { v4 as uuidv4 } from "uuid";

const About = () => {
  const initialValues = {
    email: "",
    subject: "",
    orderID: "",
    question: [],
    desc: "",
    language: "",
    attachments: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите правильный адрес электронной почты")
      .required("Email обязателен"),
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    address: yup.string().required("Пароль обязателен"),
    apartment: yup.string().required("Фамилия обязательна"),
    city: yup.string().required("Фамилия обязательна"),
    phone: yup.string().required("Фамилия обязательна"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });
      console.log("COLL");

      // Если валидация прошла успешно, данные можно отправить
      // handlePaymentEmbed(values);
    } catch (errors: any) {
      // Если есть ошибки валидации, обновите состояния ошибок
      console.log("ERRORs", errors);

      const errorMessages: any = {};
      errors.inner.forEach((error: any) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages);
    }
  };

  return (
    <Layout headerProps={{ classNames: "bg-secondary" }} scroll={true}>
      <div>
        <div className="bg-button">
          <Container>
            <div className="py-[4rem] text-center">
              <span className="uppercase text-white text-caption"></span>
              <h1 className="text-white text-h2 mb-[2rem]">Get in touch</h1>
              <p className="text-white text-bodySmall">
                Please enter the e-mail address that you placed your order with,
                <br />
                plus your order ID number and a short description of how we can
                best help you!
                <br /> We will do our best to answer you as fast as possible
                within the next 48 hours.
              </p>
            </div>
          </Container>
        </div>

        <div className="py-[12rem]">
          <Container>
            <div>
              <h3 className="text-center mb-[2rem] text-h3">Contact Us</h3>

              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="w-full flex flex-wrap gap-[10px]">
                  <div className="w-full">
                    <Field
                      type="email"
                      name="email"
                      label="Your email address"
                      required
                      as={Input}
                      labelClasses="w-full"
                      className="w-full"
                    />

                    {formErrors.email && (
                      <div className="text-error">{formErrors.email}</div>
                    )}
                  </div>

                  <div className="w-[calc(50%-0.5rem)] mb-0">
                    <Field
                      type="text"
                      name="subject"
                      label="Subject"
                      required
                      labelClasses="w-full"
                      as={Input}
                    />

                    {formErrors.subject && (
                      <div className="text-error">{formErrors.subject}</div>
                    )}
                  </div>

                  <div className="w-[calc(50%-0.5rem)] mb-0">
                    <Field
                      type="text"
                      name="orderID"
                      label="order ID"
                      required
                      labelClasses="w-full"
                      as={Input}
                    />

                    {formErrors.orderID && (
                      <div className="text-error">{formErrors.orderID}</div>
                    )}
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name="question"
                      label="Question is about"
                      labelClasses="w-full"
                      className="w-full"
                      // options={initialValues.question}
                      required
                      as={() => (
                        <SearchSelect
                          options={[
                            { value: "damage", label: "Damaged order", id: 0 },
                            {
                              value: "delivery_tracking",
                              label: "Delivery/Tracking",
                              id: 1,
                            },
                            {
                              value: "edit_order",
                              label: "Edit my order",
                              id: 2,
                            },
                            {
                              value: "cancel_order",
                              label: "Cancel order",
                              id: 3,
                            },
                            { value: "lost", label: "Lost", id: 4 },
                            { value: "lost", label: "Lost", id: 5 },
                            {
                              value: "wrong_order",
                              label: "Wrong order",
                              id: 6,
                            },
                            {
                              value: "shipping_address",
                              label: "Shipping Address",
                              id: 7,
                            },
                            {
                              value: "custom_feature",
                              label: "Custom/Feature",
                              id: 8,
                            },
                            {
                              value: "invoice_request",
                              label: "Invoice request",
                              id: 9,
                            },
                            {
                              value: "confirmation_email",
                              label: "Confirmation email",
                              id: 10,
                            },
                          ]}
                          // mode="multiple"
                          // allowClear
                          className="w-full"
                          label="Question is about"
                          placeholder="Orientation"
                          // defaultValue={layout.orientation}
                          // onChange={value =>
                          //   handleSetWallartAdminSettings("orientation", value)
                          // }
                        />
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name="desc"
                      label="Description"
                      placeholder=""
                      labelClasses="w-full  mb-0"
                      as={Input}
                    />

                    {formErrors.desc && (
                      <div className="text-error">{formErrors.desc}</div>
                    )}
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name="language"
                      label="Preferred language"
                      labelClasses="w-full  mb-0"
                      as={Input}
                    />

                    {formErrors.language && (
                      <div className="text-error">{formErrors.language}</div>
                    )}
                  </div>

                  {/* <div className="w-full">
                    <Field
                      type="text"
                      name="city"
                      label="Town / City"
                      labelClasses="w-full  mb-0"
                      as={Input}
                    />
                    {formErrors.city && (
                      <div className="text-error">{formErrors.city}</div>
                    )}
                  </div> */}
                  {/* 
                  <div className="w-full">
                    <Field
                      type="text"
                      name="phone"
                      label="PHONE (FOR SHIPPING PURPOSES)"
                      labelClasses="w-full  mb-0"
                      as={Input}
                    />

                    {formErrors.phone && (
                      <div className="text-error">{formErrors.phone}</div>
                    )}
                  </div> */}

                  {/* <Button
                    type="submit"
                    variant="contained"
                    className="text-buttonSmall font-bold w-full mt-[2rem]"
                  >
                    Submit
                  </Button> */}

                  <Button
                    type="submit"
                    color="primary"
                    className="text-bodySmall w-full"
                    rounded={true}
                  >
                    Submit
                  </Button>

                  {/* <div onClick={handlePaymentEmbed}>CLOCK</div> */}
                </Form>
              </Formik>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default About;
