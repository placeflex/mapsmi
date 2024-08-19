import { connectDB } from "@/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { v4 as uuidv4 } from "uuid";

import { verifyToken } from "./helpers/tokens";

// import { handleScreen } from "@/pages/api/helpers/screenshot";
import { generateScreen } from "@/pages/api/helpers/generateScreen";
import { generatePDF } from "@/pages/api/helpers/generatePDF";

import { MATERIAL_PRICES, frames } from "@/layouts/wallartAttributes";
import { productNames } from "@/constants/constants";

// schemes
import User from "./models/user";

const TelegramBot = require("node-telegram-bot-api");

import B2 from "backblaze-b2";

const CHAT_ID = -1002220985207;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    const orderId = req.body.orderId;

    const bot = new TelegramBot(
      "7439761409:AAHPuXYoPObrKqB50lZHhEPlsHFyyjRYbZo"
    );

    bot.on("error", error => {
      console.error(error);
    });

    // const links = Array.isArray(body.links)
    //   ? body.links.map(link => link.path.trim())
    //   : [body.links.path.trim()];

    // const previews = links
    //   .map((link, idx) => {
    //     const productData = body.links[idx].data;
    //     const fieldsParam = encodeURIComponent(JSON.stringify(productData));
    //     const productUrl = `http://localhost:3000?product_id=${productData.productId}&fields=${fieldsParam}`;

    //     return `
    //       <b>${
    //         idx + 1
    //       }</b>: <a href="${link}">${link}</a>\n<a href="${productUrl}">PRVIEW</a>\n<a href="${productUrl}">PDF</a>\n\n`;
    //   })
    //   .join("\n");

    // console.log("previews", previews);

    const ITEMS_COUNT = body.links?.reduce((acc, { data }) => {
      const itemQuantity = data.quantity || 1;

      return acc + itemQuantity;
    }, 0);

    console.log("ITEMS_COUNT", ITEMS_COUNT);

    const messageText = `
<b>order ID</b>: <b>${orderId}</b>\n
<b>Количество постеров</b>: <b>${ITEMS_COUNT}</b>\n
<b>Цена</b>: <b>${body.price}</b>\n
<b>Наименование</b>: <b>${body.name}</b>\n
<i>Имя:</i> ${body.userName}
<i>Фамилия:</i> ${body.userLastName}
<i>Почта:</i> ${body.email}
<i>Страна:</i> ${body.country}
<i>Город:</i> ${body.city}
<i>Адресс:</i> ${body.address}
<i>Квартира:</i> ${body.apartment}
<i>Телефон:</i> ${body.phone}
`;

    await bot.sendMessage(CHAT_ID, messageText, {
      parse_mode: "HTML",
    });

    body.links.forEach(async ({ data, path }, idx) => {
      const options = {
        caption: `${productNames[data.productId]}-${orderId}.pdf`,
      };

      const productData = data;
      const fieldsParam = encodeURIComponent(JSON.stringify(productData));
      const productUrl = `http://localhost:3000?product_id=${productData.productId}&fields=${fieldsParam}`;

      const previewLink = `<a href="${path}">${path}</a>`;
      const previewSRC = `<a href="${productUrl}">LINK</a>\n`;

      const RESULT_PRICE = data?.selectedAttributes?.frame?.type
        ? MATERIAL_PRICES[data?.selectedAttributes?.material?.id]?.prices[
            data.selectedAttributes.size.id
          ].price +
          frames[data?.selectedAttributes?.size?.id]?.[
            data?.selectedAttributes?.frame?.id
          ]?.price
        : MATERIAL_PRICES[data?.selectedAttributes?.material?.id]?.prices[
            data.selectedAttributes.size.id
          ].price;

      const framePrice =
        frames[data?.selectedAttributes?.size?.id]?.[
          data?.selectedAttributes?.frame?.id
        ]?.price ?? 0;

      const frameColor =
        frames[data?.selectedAttributes?.size?.id]?.[
          data?.selectedAttributes?.frame?.id
        ]?.color ?? "";

      const frameMaterial =
        frames[data?.selectedAttributes?.size?.id]?.[
          data?.selectedAttributes?.frame?.id
        ]?.material ?? "";

      const frameOldPrice =
        frames[data?.selectedAttributes?.size?.id]?.[
          data?.selectedAttributes?.frame?.id
        ]?.oldPrice ?? "";

      const wallartSize = data?.selectedAttributes?.size?.name;

      const messageProduct = `
      <b>order ID</b>: <b>${orderId}</b>\n
      <b>Цена</b>: <b>${RESULT_PRICE} €</b>\n
      <b>Размер</b>: <b>${wallartSize}</b>\n
      <b>Рамка ( Цена )</b>: <b>${framePrice} €</b>\n
      <i>Рамка ( Цвет ):</i> <b>${frameColor}</b>\n
      <i>Рамка ( Материал ):</i> <b>${frameMaterial}</b>\n
      <i>Рамка ( Старая Цена ):</i> <b>${frameOldPrice} €</b>\n
      \n\n
      <b>Preview</b>: <b>${previewLink}</b>\n
      <b>PREVIEW LINK TO SITE</b>: <b>${previewSRC}</b>\n
      `;

      await generatePDF(data).then(async buffer => {
        await bot
          .sendDocument(CHAT_ID, buffer, options, {
            filename: `PDF-${orderId}.pdf`,
          })
          .then(async message => {
            bot.sendMessage(CHAT_ID, messageProduct, {
              parse_mode: "HTML",
            });
            console.log("PDF-файл успешно отправлен:", message.document);
          })
          .catch(error => {
            console.error("Ошибка при отправке PDF-файла:", error);
          });
      });
    });

    return res.status(200).json({ message: "Thanks." });
  }
}
