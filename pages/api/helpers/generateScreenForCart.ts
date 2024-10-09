import puppeteer from "puppeteer";
import Jimp from "jimp";
import { handleGetPosterGap } from "@/components/LayoutPreviewWrapper";

import { productsVariations } from "@/constants/constants";

function vminToPixels(vminValue, screenWidth, screenHeight) {
  const vminInPixels = Math.min(screenWidth, screenHeight) * (vminValue / 100);
  return vminInPixels;
}

export const generateScreenForCart = async (project: any) => {
  let sizes = {
    width: 1100,
    height: 1100,
  };

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      ...sizes,
    },
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("SCREEN START", 2);

    console.log("SCREEN START", 3, project);

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/editor?product_id=${project.productId}&renderScreenForCart=true`,
      { waitUntil: "networkidle2" }
    );

    const storage = productsVariations[project.productId];

    await page.evaluate(
      (project, storage) => {
        localStorage.setItem(storage, JSON.stringify(project));
      },
      project,
      storage
    );

    console.log("FILL MAP STORAGE");

    await page.waitForFunction(
      storage => localStorage.getItem(storage) !== null,
      {},
      storage
    );

    console.log("SCREEN START", 4);

    await page.reload({ waitUntil: "networkidle2", timeout: 0 });

    // await page.evaluate(project => {
    //   localStorage.setItem("render-storage", JSON.stringify(project));
    // }, project);

    console.log("SCREEN START", 5);

    // await page.waitForFunction(
    //   () => localStorage.getItem("render-storage") !== null
    // );

    // await page.reload({ waitUntil: "networkidle2", timeout: 0 });

    console.log("SCREEN START", 6);

    console.log("SCREEN START", 7);

    console.log("SCREEN START", 8);

    console.log("SCREEN START", 9);

    if (project.productId == 1 || project.productId == 3) {
      await page.waitForTimeout(8000);
    }

    if (project.productId == 2) {
      console.log("START WAIT TILES");

      await page.waitForFunction(() => window.CustomMapIsReady);

      console.log("END WAIT TILES");

      await page.waitForTimeout(4000);
    }

    await page.waitForSelector(".artwork");

    console.log("SCREEN START", 11);

    const elementHandle: any = await page.$(".artwork");
    const boundingBox = await elementHandle.boundingBox();

    console.log("SCREEN START", 12);

    if (elementHandle) {
      console.log("GOT");

      const extendedBoundingBox = {
        x:
          project.selectedAttributes.frame.id != 0
            ? boundingBox.x - 20
            : boundingBox.x,
        y:
          project.selectedAttributes.frame.id != 0
            ? boundingBox.y - 20
            : boundingBox.y,
        width:
          project.selectedAttributes.frame.id != 0
            ? boundingBox.width + 40
            : boundingBox.width,
        height:
          project.selectedAttributes.frame.id != 0
            ? boundingBox.height + 40
            : boundingBox.height,
      };

      await elementHandle.screenshot({
        path: "screenshotFORCARTFULLDSLDALDLSALD.png",
        clip: extendedBoundingBox,
      });

      //   console.log("SCREEN START END");

      const screenshotBuffer = await page.screenshot({
        encoding: "binary",
        clip: extendedBoundingBox,
      });

      browser.close();

      const readBuffer = Jimp.read(screenshotBuffer)
        .then(image => {
          return image.resize(600, Jimp.AUTO).getBufferAsync(Jimp.MIME_PNG);
        })
        .then(buffer => {
          return buffer;
        })
        .catch(err => {
          console.log("readBuffer Error:", err);
        });

      return await readBuffer;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // await browser.close();
  }
};
