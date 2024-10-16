declare global {
  interface Window {
    LiqPayCheckout: any;
    LiqPayCheckoutCallback: any;
  }
}

import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import Head from "next/head";
import Liqpay from "@/pages/api/liqpay-sdk";

// components
import { Layout } from "@/components/Layout";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/Button";
import { LiqPayModal } from "@/components/Modals/LiqPayModal";

const countries = [
  { value: "Ukraine", label: "Ukraine" },
  { value: "Poland", label: "Poland" },
  //   { value: "select2-billing_country-result-lkt2-AX", label: "Åland Islands" },
  //   { value: "select2-billing_country-result-u6ts-AL", label: "Albania" },
  //   { value: "select2-billing_country-result-ib2j-DZ", label: "Algeria" },
  //   { value: "select2-billing_country-result-8pub-AS", label: "American Samoa" },
  //   { value: "select2-billing_country-result-iotr-AD", label: "Andorra" },
  //   { value: "select2-billing_country-result-ubin-AO", label: "Angola" },
  //   { value: "select2-billing_country-result-mg8p-AI", label: "Anguilla" },
  //   { value: "select2-billing_country-result-2otk-AQ", label: "Antarctica" },
  //   {
  //     value: "select2-billing_country-result-kyab-AG",
  //     label: "Antigua and Barbuda",
  //   },
  //   { value: "select2-billing_country-result-og4y-AR", label: "Argentina" },
  //   { value: "select2-billing_country-result-emy7-AM", label: "Armenia" },
  //   { value: "select2-billing_country-result-01ys-AW", label: "Aruba" },
  //   { value: "select2-billing_country-result-dkvs-AU", label: "Australia" },
  //   { value: "select2-billing_country-result-qeu7-AT", label: "Austria" },
  //   { value: "select2-billing_country-result-hl8u-AZ", label: "Azerbaijan" },
  //   { value: "select2-billing_country-result-rj5b-BS", label: "Bahamas" },
  //   { value: "select2-billing_country-result-5ora-BH", label: "Bahrain" },
  //   { value: "select2-billing_country-result-vyfm-BD", label: "Bangladesh" },
  //   { value: "select2-billing_country-result-7qz7-BB", label: "Barbados" },
  //   { value: "select2-billing_country-result-k9rr-BY", label: "Belarus" },
  //   { value: "select2-billing_country-result-lt4i-PW", label: "Belau" },
  //   { value: "select2-billing_country-result-gh1d-BE", label: "Belgium" },
  //   { value: "select2-billing_country-result-lx69-BZ", label: "Belize" },
  //   { value: "select2-billing_country-result-xk1r-BJ", label: "Benin" },
  //   { value: "select2-billing_country-result-xc4p-BM", label: "Bermuda" },
  //   { value: "select2-billing_country-result-sb3z-BT", label: "Bhutan" },
  //   { value: "select2-billing_country-result-mkyj-BO", label: "Bolivia" },
  //   {
  //     value: "select2-billing_country-result-2x2y-BQ",
  //     label: "Bonaire, Saint Eustatius and Saba",
  //   },
  //   {
  //     value: "select2-billing_country-result-ecce-BA",
  //     label: "Bosnia and Herzegovina",
  //   },
  //   { value: "select2-billing_country-result-dcyo-BW", label: "Botswana" },
  //   { value: "select2-billing_country-result-i3rq-BV", label: "Bouvet Island" },
  //   {
  //     value: "select2-billing_country-result-3nji-IO",
  //     label: "British Indian Ocean Territory",
  //   },
  //   { value: "select2-billing_country-result-971j-BN", label: "Brunei" },
  //   { value: "select2-billing_country-result-29h3-BG", label: "Bulgaria" },
  //   { value: "select2-billing_country-result-3nu1-BF", label: "Burkina Faso" },
  //   { value: "select2-billing_country-result-1sjg-BI", label: "Burundi" },
  //   { value: "select2-billing_country-result-f7a5-KH", label: "Cambodia" },
  //   { value: "select2-billing_country-result-8rqh-CM", label: "Cameroon" },
  //   { value: "select2-billing_country-result-jrrm-CA", label: "Canada" },
  //   { value: "select2-billing_country-result-8u24-CV", label: "Cape Verde" },
  //   { value: "select2-billing_country-result-skmo-KY", label: "Cayman Islands" },
  //   {
  //     value: "select2-billing_country-result-mtj7-CF",
  //     label: "Central African Republic",
  //   },
  //   { value: "select2-billing_country-result-s1k1-TD", label: "Chad" },
  //   { value: "select2-billing_country-result-w119-CL", label: "Chile" },
  //   { value: "select2-billing_country-result-6vml-CN", label: "China" },
  //   {
  //     value: "select2-billing_country-result-th0h-CX",
  //     label: "Christmas Island",
  //   },
  //   {
  //     value: "select2-billing_country-result-ek7o-CC",
  //     label: "Cocos (Keeling) Islands",
  //   },
  //   { value: "select2-billing_country-result-qc5f-CO", label: "Colombia" },
  //   { value: "select2-billing_country-result-6a1o-KM", label: "Comoros" },
  //   { value: "ubtb-CG", label: "Congo (Brazzaville)" },
  //   { value: "viw0-CD", label: "Congo (Kinshasa)" },
  //   { value: "r6k4-CK", label: "Cook Islands" },
  //   { value: "7xfs-CR", label: "Costa Rica" },
  //   { value: "mbh4-HR", label: "Croatia" },
  //   { value: "hebb-CU", label: "Cuba" },
  //   { value: "3r81-CW", label: "Curaçao" },
  //   { value: "9f00-CY", label: "Cyprus" },
  //   { value: "4u9i-CZ", label: "Czech Republic" },
  //   { value: "tp6w-DK", label: "Denmark" },
  //   { value: "nxsr-DJ", label: "Djibouti" },
  //   { value: "ow8i-DM", label: "Dominica" },
  //   { value: "7ffx-DO", label: "Dominican Republic" },
  //   { value: "6agj-EC", label: "Ecuador" },
  //   { value: "o0qu-EG", label: "Egypt" },
  //   { value: "sap4-SV", label: "El Salvador" },
  //   { value: "kx81-GQ", label: "Equatorial Guinea" },
  //   { value: "htx3-ER", label: "Eritrea" },
  //   { value: "0e9w-EE", label: "Estonia" },
  //   { value: "w7eq-SZ", label: "Eswatini" },
  //   { value: "djqj-ET", label: "Ethiopia" },
  //   { value: "4aqv-FK", label: "Falkland Islands" },
  //   { value: "dkz5-FO", label: "Faroe Islands" },
  //   { value: "pc8n-FJ", label: "Fiji" },
  //   { value: "6rtb-FI", label: "Finland" },
  //   { value: "y7df-FR", label: "France" },
  //   { value: "zmfq-GF", label: "French Guiana" },
  //   { value: "2tui-PF", label: "French Polynesia" },
  //   { value: "dari-TF", label: "French Southern Territories" },
  //   { value: "69kt-GA", label: "Gabon" },
  //   { value: "pvll-GM", label: "Gambia" },
  //   { value: "ra1u-GE", label: "Georgia" },
  //   { value: "d9wc-DE", label: "Germany" },
  //   { value: "5bcd-GH", label: "Ghana" },
  //   { value: "jbok-GI", label: "Gibraltar" },
  //   { value: "qx0f-GR", label: "Greece" },
  //   { value: "ttx1-GL", label: "Greenland" },
  //   { value: "6blm-GD", label: "Grenada" },
  //   { value: "gy8q-GP", label: "Guadeloupe" },
  //   { value: "731f-GU", label: "Guam" },
  //   { value: "k5xu-GT", label: "Guatemala" },
  //   { value: "m3dp-GG", label: "Guernsey" },
  //   { value: "eh9c-GN", label: "Guinea" },
  //   { value: "phip-GW", label: "Guinea-Bissau" },
  //   { value: "3rhr-GY", label: "Guyana" },
  //   { value: "by3g-HT", label: "Haiti" },
  //   { value: "lpq6-HM", label: "Heard Island and McDonald Islands" },
  //   { value: "dtbl-HN", label: "Honduras" },
  //   { value: "s4cv-HK", label: "Hong Kong" },
  //   { value: "86ur-HU", label: "Hungary" },
  //   { value: "ar7e-IS", label: "Iceland" },
  //   { value: "snnr-IN", label: "India" },
  //   { value: "q99l-value", label: "Indonesia" },
  //   { value: "s2pi-IR", label: "Iran" },
  //   { value: "m0rv-IQ", label: "Iraq" },
  //   { value: "qd21-IE", label: "Ireland" },
  //   { value: "kgtu-IM", label: "Isle of Man" },
  //   { value: "0cmw-IL", label: "Israel" },
  //   { value: "sps2-IT", label: "Italy" },
  //   { value: "tn3b-JM", label: "Jamaica" },
  //   { value: "e8y3-JP", label: "Japan" },
  //   { value: "8bvh-JE", label: "Jersey" },
  //   { value: "5i6w-JO", label: "Jordan" },
  //   { value: "xqy5-KZ", label: "Kazakhstan" },
  //   { value: "tk9y-KE", label: "Kenya" },
  //   { value: "ngsn-KI", label: "Kiribati" },
  //   { value: "zeyb-KP", label: "Korea (North)" },
  //   { value: "kth9-KR", label: "Korea (South)" },
  //   { value: "w8eb-KW", label: "Kuwait" },
  //   { value: "5bkz-KG", label: "Kyrgyzstan" },
  //   { value: "2sc8-LA", label: "Laos" },
  //   { value: "twav-LV", label: "Latvia" },
  //   { value: "06mn-LB", label: "Lebanon" },
  //   { value: "zqxx-LS", label: "Lesotho" },
  //   { value: "hrrr-LR", label: "Liberia" },
  //   { value: "tnzg-LY", label: "Libya" },
  //   { value: "hz57-LI", label: "Liechtenstein" },
  //   { value: "m7y5-LT", label: "Lithuania" },
  //   { value: "2rdx-LU", label: "Luxembourg" },
  //   { value: "pr1p-MO", label: "Macao" },
  //   { value: "0kvp-MK", label: "North Macedonia" },
  //   { value: "waa9-MG", label: "Madagascar" },
  //   { value: "hxwv-MW", label: "Malawi" },
  //   { value: "zfyn-MY", label: "Malaysia" },
  //   { value: "1qq4-MV", label: "Maldives" },
  //   { value: "0f9m-ML", label: "Mali" },
  //   { value: "hpns-MT", label: "Malta" },
  //   { value: "tdx5-MH", label: "Marshall Islands" },
  //   { value: "2fxy-MQ", label: "Martinique" },
  //   { value: "9j2v-MR", label: "Mauritania" },
  //   { value: "c62v-MU", label: "Mauritius" },
  //   { value: "09jz-YT", label: "Mayotte" },
  //   { value: "hfnk-MX", label: "Mexico" },
  //   { value: "h7yn-FM", label: "Micronesia" },
  //   { value: "xugy-MD", label: "Moldova" },
  //   { value: "ahjp-MC", label: "Monaco" },
  //   { value: "6r24-MN", label: "Mongolia" },
  //   { value: "jqcr-ME", label: "Montenegro" },
  //   { value: "mequ-MS", label: "Montserrat" },
  //   { value: "36vz-MA", label: "Morocco" },
  //   { value: "vcru-MZ", label: "Mozambique" },
  //   { value: "xzz9-MM", label: "Myanmar" },
  //   { value: "t4yf-NA", label: "Namibia" },
  //   { value: "ikyf-NR", label: "Nauru" },
  //   { value: "nhmm-NP", label: "Nepal" },
  //   { value: "9tqs-NL", label: "Netherlands" },
  //   { value: "5mcw-NC", label: "New Caledonia" },
  //   { value: "sk8t-NZ", label: "New Zealand" },
  //   { value: "xwuv-NI", label: "Nicaragua" },
  //   { value: "ydpv-NE", label: "Niger" },
  //   { value: "62z2-NG", label: "Nigeria" },
  //   { value: "bdpa-NI", label: "Niue" },
  //   { value: "krfv-NF", label: "Norfolk Island" },
  //   { value: "5q2z-MP", label: "Northern Mariana Islands" },
  //   { value: "fqkx-NO", label: "Norway" },
  //   { value: "exwh-OM", label: "Oman" },
  //   { value: "50rm-PK", label: "Pakistan" },
  //   { value: "qkqx-PW", label: "Palau" },
  //   { value: "r6g9-PS", label: "Palestinian Territories" },
  //   { value: "bss3-PA", label: "Panama" },
  //   { value: "igyg-PG", label: "Papua New Guinea" },
  //   { value: "itk3-PY", label: "Paraguay" },
  //   { value: "rqfr-PE", label: "Peru" },
  //   { value: "dp7n-PH", label: "Philippines" },
  //   { value: "5hrp-PN", label: "Pitcairn" },
  //   { value: "bk4y-PL", label: "Poland" },
  //   { value: "pc3j-PT", label: "Portugal" },
  //   { value: "h5jn-PR", label: "Puerto Rico" },
  //   { value: "apq7-QA", label: "Qatar" },
  //   { value: "ye7p-RE", label: "Réunion" },
  //   { value: "r7u8-RO", label: "Romania" },
  //   { value: "22p9-RU", label: "Russia" },
  //   { value: "j4b3-RW", label: "Rwanda" },
  //   { value: "8t5w-BL", label: "Saint Barthélemy" },
  //   { value: "qhjv-SH", label: "Saint Helena" },
  //   { value: "qykc-KN", label: "Saint Kitts and Nevis" },
  //   { value: "tj6v-LC", label: "Saint Lucia" },
  //   { value: "z2tr-MF", label: "Saint Martin (French part)" },
  //   { value: "t7z3-PM", label: "Saint Pierre and Miquelon" },
];

import Image from "next/image";

// stores
import { useDispatch } from "react-redux";
import { useTypedSelector, AppDispatch } from "@/redux/store";
import { handleDeleteItem } from "@/redux/cart";
import { handleShowLiqaPayModal } from "@/redux/modals";

// constatns
import { productNames } from "@/constants/constants";
import { MATERIAL_PRICES, frames } from "@/layouts/wallartAttributes";

// icons
import Delete from "@/public/icons/close.svg";

import { api } from "@/axios";

const Cart = () => {
  const dispatch = useDispatch();
  const [payMethod, setPayMethod] = useState("liqpay");
  const cartItems = useTypedSelector(({ cart }) => cart?.cart);
  const liqpayModal = useTypedSelector(({ modals }) => modals.liqpay);

  const RESULT_PRICE = cartItems?.reduce((acc, item: any) => {
    const RESULT_PRICE = item?.selectedAttributes?.frame?.type
      ? MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
          item.selectedAttributes.size.id
        ].price +
        frames[item?.selectedAttributes?.size?.id]?.[
          item?.selectedAttributes?.frame?.id
        ]?.price
      : MATERIAL_PRICES[item?.selectedAttributes?.material?.id]?.prices[
          item.selectedAttributes.size.id
        ].price;

    const itemPrice = RESULT_PRICE;
    const itemQuantity = item.quantity || 1; // ураховуємо поле quantity

    return acc + itemPrice * itemQuantity; // додаємо ціну кожного товару до загальної суми, помножену на його кількість
  }, 0);

  const PRODUCTS_LINKS = cartItems?.map(item => JSON.stringify(item));

  // PRODUCTS_LINKS.map(link => {
  //   console.log("link", link);

  //   // const prj = JSON.parse(link);
  //   // const prjid = prj.productId;

  //   console.log(`http://localhost:3000/editor?product_id=0&fields=${link}`);
  // });

  const handlePaymentEmbed = async values => {
    if (RESULT_PRICE) {
      const liqpay = new Liqpay(
        "sandbox_i20692662440",
        "sandbox_j8X4A0WdvWW3oj2YtbHC9iGkWRjHtSUzhapudLr1"
      );
      const orderId = uuidv4();

      const names = cartItems.map((item: any) => productNames[item.productId]);

      dispatch(handleShowLiqaPayModal());

      const formObj = liqpay.cnb_object({
        action: "pay",
        amount: RESULT_PRICE,
        currency: "EUR",
        description: names.length
          ? `${names.join(", ")} Posters, ID: ${orderId}`
          : `${names.join(", ")} Poster, ID: ${orderId}`,
        order_value: orderId,
        version: "3",
        language: "en",
      });

      const PRODUCTS_PREVIEWS_LINKS = cartItems?.map(
        ({ path, ...project }: { path: any; project: any }): any => ({
          path: path,
          data: project,
        })
      );

      setTimeout(() => {
        window?.LiqPayCheckout.init({
          data: formObj.data,
          signature: formObj.signature,
          embedTo: "#liqpay_checkout",
          mode: "embed", // embed || popup,
          language: "en",
        })
          .on("liqpay.callback", function (data) {
            console.log(data.status);
            console.log(data);
            api
              .post("summary", {
                orderId,
                name: names.length
                  ? `${names.join(", ")} Posters`
                  : `${names.join(", ")} Poster`,
                price: `${RESULT_PRICE} €`,
                links: PRODUCTS_PREVIEWS_LINKS,

                email: values.email,
                userName: values.firstName,
                userLastName: values.lastName,
                country: values.country,
                address: values.address,
                apartment: values.apartment,
                city: values.city,
                phone: values.phone,
              })
              .then(() => {
                window.location.reload();
              });
          })
          .on("liqpay.ready", function (data) {
            // ready
          })
          .on("liqpay.close", function (data) {
            // close
          });
      }, 500);
    } else {
      alert("SHOW ERROR");
    }
  };

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
  };

  const [formErrors, setFormErrors] = useState(initialValues);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    country: yup.string().required("Country is required"),
    address: yup.string().required("Address is required"),
    apartment: yup.string().required("Apartment is required"),
    city: yup.string().required("City is required"),
    phone: yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setFormErrors(initialValues);
      await validationSchema.validate(values, { abortEarly: false });
      console.log("COLL");

      // Если валидация прошла успешно, данные можно отправить
      handlePaymentEmbed(values);
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
    <>
      <Head>
        <script src="//static.liqpay.ua/libjs/checkout.js" async></script>
      </Head>

      <Layout className="bg-bg" scroll={true}>
        <Container>
          <div className="py-[4rem]">
            <div className="flex items-start gap-[2rem]">
              <div className="flex flex-wrap gap-[1rem] w-[70%]">
                <h1 className="text-body mb-[2rem]">Your billing details</h1>

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form className="w-full flex flex-wrap gap-[10px]">
                    <div className="w-full">
                      <Field
                        type="email"
                        name="email"
                        label="E-MAIL TO RECIPIENT"
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
                        name="firstName"
                        label="FIRST NAME"
                        required
                        labelClasses="w-full"
                        as={Input}
                      />

                      {formErrors.firstName && (
                        <div className="text-error">{formErrors.firstName}</div>
                      )}
                    </div>

                    <div className="w-[calc(50%-0.5rem)] mb-0">
                      <Field
                        type="text"
                        name="lastName"
                        label="LAST NAME"
                        labelClasses="w-full"
                        as={Input}
                      />

                      {formErrors.lastName && (
                        <div className="text-error">{formErrors.lastName}</div>
                      )}
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="country"
                        className="w-full"
                        required
                        render={({ field, form }) => {
                          return (
                            <AutoComplete
                              {...field}
                              options={countries}
                              label="COUNTRY/REGION"
                              required
                              onSelect={v => {
                                console.log("V", v);
                                form.setFieldValue(field.name, v);
                              }}
                            />
                          );
                        }}
                      />

                      {formErrors.country && (
                        <div className="text-error">{formErrors.country}</div>
                      )}
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="address"
                        label="STREET ADDRESS"
                        placeholder="House number and street name"
                        labelClasses="w-full  mb-0"
                        required
                        as={Input}
                      />

                      {formErrors.address && (
                        <div className="text-error">{formErrors.address}</div>
                      )}
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="apartment"
                        label="Apartment, suite, unit, etc."
                        required
                        labelClasses="w-full  mb-0"
                        as={Input}
                      />

                      {formErrors.apartment && (
                        <div className="text-error">{formErrors.apartment}</div>
                      )}
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="city"
                        label="Town / City"
                        labelClasses="w-full  mb-0"
                        required
                        as={Input}
                      />
                      {formErrors.city && (
                        <div className="text-error">{formErrors.city}</div>
                      )}
                    </div>

                    <div className="w-full">
                      <Field
                        type="text"
                        name="phone"
                        label="PHONE (FOR SHIPPING PURPOSES)"
                        labelClasses="w-full  mb-0"
                        required
                        as={Input}
                      />

                      {formErrors.phone && (
                        <div className="text-error">{formErrors.phone}</div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="text-buttonSmall font-bold w-full mt-[2rem]"
                    >
                      Pay
                    </Button>

                    {/* <div onClick={handlePaymentEmbed}>CLOCK</div> */}
                  </Form>
                </Formik>

                {/* <AutoComplete
                label="COUNTRY/REGION"
                required
                labelClasses="w-full"
                options={countries}
                className="w-full"
              /> */}
                {/* <Input
                label="STREET ADDRESS"
                required
                placeholder="House number and street name"
                labelClasses="w-full  mb-0"
              /> */}
                {/* <Input
                required
                label="Apartment, suite, unit, etc. (optional)"
                labelClasses="w-full  mb-0"
              /> */}
                {/* <Input label="Town / City" labelClasses="w-full  mb-0" /> */}
                {/* <Input
                required
                label="PHONE (FOR SHIPPING PURPOSES)"
                labelClasses="w-full  mb-0"
              /> */}
              </div>

              <div className="w-[30%] ml-auto">
                <div className="w-full h-full flex flex-col">
                  <h3 className="text-body mb-[2rem]">Your order</h3>

                  <div className="flex flex-col overflow-y-auto pr-[2rem]">
                    {[...cartItems, ...cartItems, ...cartItems].map(
                      (item: any, index: number) => {
                        const { selectedAttributes } = item;

                        const RESULT_PRICE = item?.selectedAttributes?.frame
                          ?.type
                          ? MATERIAL_PRICES[
                              item?.selectedAttributes?.material?.id
                            ]?.prices[item.selectedAttributes.size.id].price +
                            frames[item?.selectedAttributes?.size?.id]?.[
                              item?.selectedAttributes?.frame?.id
                            ]?.price
                          : MATERIAL_PRICES[
                              item?.selectedAttributes?.material?.id
                            ]?.prices[item.selectedAttributes.size.id].price;

                        return (
                          <div key={index} className="mb-[2rem]">
                            <div className="flex flex-col">
                              <div className="relative">
                                <div className="flex items-center">
                                  <Image
                                    src={item.path}
                                    alt={"cart item"}
                                    width={150}
                                    height={100}
                                    quality={100}
                                    className="object-cover"
                                  />

                                  <div className="ml-[2rem]">
                                    <h3 className="text-captionSmall mb-[.5rem]">
                                      {productNames[item.productId]} -{" "}
                                      {selectedAttributes.orientation.name} -{" "}
                                      {selectedAttributes.size.name}
                                    </h3>

                                    <h5 className="text-captionSmall font-semibold">
                                      1 x{" "}
                                      {
                                        MATERIAL_PRICES[
                                          item?.selectedAttributes?.material?.id
                                        ]?.prices[
                                          item.selectedAttributes.size.id
                                        ].price
                                      }{" "}
                                      €
                                    </h5>

                                    <h3 className="text-captionSmall mb-[.5rem]">
                                      Frame:{" "}
                                      {
                                        frames[
                                          item?.selectedAttributes?.size?.id
                                        ]?.[item?.selectedAttributes?.frame?.id]
                                          ?.material
                                      }
                                    </h3>
                                    <h5 className="text-captionSmall font-semibold">
                                      1 x{" "}
                                      {
                                        frames[
                                          item?.selectedAttributes?.size?.id
                                        ]?.[item?.selectedAttributes?.frame?.id]
                                          ?.price
                                      }{" "}
                                      €
                                    </h5>
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(handleDeleteItem(item))
                                  }
                                  className="absolute top-0 right-0"
                                >
                                  <Delete
                                    width={24}
                                    stroke="#000"
                                    fill="#000"
                                  />
                                </button>
                              </div>

                              {item?.selectedAttributes?.frame?.id ? (
                                <div className="flex items-center mt-[1rem]">
                                  <div className="relative w-[150px] aspect-square">
                                    {
                                      frames[
                                        item?.selectedAttributes?.size?.id
                                      ]?.[item?.selectedAttributes?.frame?.id]
                                        .icon
                                    }
                                  </div>

                                  <div className="ml-[2rem]">
                                    <h3 className="text-captionSmall capitalize mb-[.5rem]">
                                      Frame:{" "}
                                      {
                                        frames[
                                          item?.selectedAttributes?.size?.id
                                        ]?.[item?.selectedAttributes?.frame?.id]
                                          ?.material
                                      }
                                    </h3>
                                    <h3 className="text-captionSmall font-semibold">
                                      1 x{" "}
                                      {
                                        frames[
                                          item?.selectedAttributes?.size?.id
                                        ]?.[item?.selectedAttributes?.frame?.id]
                                          ?.price
                                      }{" "}
                                      €
                                    </h3>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="mt-auto text-bodySmall">
                    Total: {Number(RESULT_PRICE).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>

      <LiqPayModal key={JSON.stringify(liqpayModal)}>
        <div id="liqpay_checkout"></div>
      </LiqPayModal>
    </>
  );
};

export default Cart;
