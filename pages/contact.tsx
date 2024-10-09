import { useState } from "react";

import { Layout } from "@/components/Layout";

import { Container } from "@/components/Container";
import { Input, LabelWrapper } from "@/components/Input";
import { Input as InputAntd } from "antd";
import { Button } from "@/components/Button";
import { AutoComplete } from "@/components/AutoComplete";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { SearchSelect } from "@/components/SearchSelect";
import { v4 as uuidv4 } from "uuid";
const { TextArea } = InputAntd;

// helpers
import { toast } from "react-toastify";

import { api } from "@/axios";

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
    subject: yup.string().required("subject обязательно"),
    orderID: yup.string().required("orderID обязательна"),
    question: yup.string().required("question обязателен"),
    desc: yup.string().required("desc обязательна"),
  });

  const handleSubmit = async (values: typeof initialValues, resetForm) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });

      const rq = api
        .post("contact-us", values)
        .then((data: any) => {
          toast.success(data?.message);
          resetForm();
        })
        .catch(error => {
          toast.error(error?.response?.data?.message ?? error?.message);
        });

      toast.promise(rq, {
        pending: "Sending",
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
            <div className="max-w-[80rem] mx-auto">
              <h3 className="text-center mb-[2rem] text-h3">Contact Us</h3>

              <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                  handleSubmit(values, resetForm);
                }}
              >
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
                      label="Order Id"
                      required
                      labelClasses="w-full"
                      placeholder="EXAMPLE: b1bc3ba6-6578-4665-92c3-e0bfe8fe393e"
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
                      className="w-full"
                      required
                      render={({ field, form }) => (
                        <LabelWrapper
                          label="Question is about"
                          required={true}
                          labelClasses="w-full"
                        >
                          <SearchSelect
                            {...field}
                            options={[
                              {
                                value: "damage",
                                label: "Damaged order",
                                id: 0,
                              },
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
                              {
                                value: "wrong_order",
                                label: "Wrong order",
                                id: 4,
                              },
                              {
                                value: "shipping_address",
                                label: "Shipping Address",
                                id: 5,
                              },
                              {
                                value: "custom_feature",
                                label: "Custom/Feature",
                                id: 6,
                              },
                              {
                                value: "invoice_request",
                                label: "Invoice request",
                                id: 7,
                              },
                              {
                                value: "confirmation_email",
                                label: "Confirmation email",
                                id: 8,
                              },
                            ]}
                            // mode="multiple"
                            // allowClear
                            className="w-full"
                            placeholder="Orientation"
                            // defaultValue={layout.orientation}
                            onChange={value =>
                              form.setFieldValue(field.name, value)
                            }
                          />
                        </LabelWrapper>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <Field
                      type="text"
                      name="desc"
                      label="Description"
                      labelClasses="w-full mb-0"
                      render={({ field, form }) => {
                        return (
                          <>
                            <LabelWrapper
                              required={true}
                              label={"Description"}
                              labelClasses={""}
                            >
                              <TextArea
                                {...field}
                                placeholder="Add text description"
                                autoSize={{ minRows: 6, maxRows: 6 }}
                                className="border-1 rounded-none"
                                onChange={e => {
                                  form.setFieldValue(
                                    field.name,
                                    e.target.value
                                  );
                                }}
                              />
                            </LabelWrapper>
                          </>
                        );
                      }}
                    />

                    {formErrors.desc && (
                      <div className="text-error">{formErrors.desc}</div>
                    )}
                  </div>

                  {/* <div className="w-full">
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
                  </div> */}

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
