import puppeteer from "puppeteer";
import Jimp from "jimp";
import { handleGetPosterGap } from "@/components/LayoutPreviewWrapper";

function vminToPixels(vminValue, screenWidth, screenHeight) {
  const vminInPixels = Math.min(screenWidth, screenHeight) * (vminValue / 100);
  return vminInPixels;
}

export const generateScreen = async (project: any) => {
  console.log("SCREEN START", 1);

  const gap = handleGetPosterGap(project.selectedAttributes.size.id);

  const orientationPortraint =
    project.selectedAttributes.orientation.name.toLowerCase() === "portrait";

  const frameIsEnabled = project.selectedAttributes.frame.id !== 0;

  const w = Math.round(project.selectedAttributes.size.width - gap);
  const h = Math.round(project.selectedAttributes.size.height - gap);

  const pxw = vminToPixels(5, w, h) * 2;

  const wToUse = frameIsEnabled ? w + pxw : w;
  const hToUse = frameIsEnabled ? h + pxw : h;

  let sizes = {
    width: orientationPortraint ? Math.round(wToUse) : Math.round(hToUse),
    height: orientationPortraint ? Math.round(hToUse) : Math.round(wToUse),
  };

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      ...sizes,
    },
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  try {
    console.log("SCREEN START", 2);

    console.log("SCREEN START", 3);

    // TODO removed full size ( do screen for elementHandle, but not for page )
    // puppeter issue with big size page and svg file ( trottling )
    // width: Math.round(project.selectedAttributes.size.width)
    // height: Math.round(project.selectedAttributes.size.height)

    // await page.setViewport({ ...sizes });

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}&preview=true`,
      { waitUntil: "networkidle2" }
    );

    console.log("SCREEN START", 4);

    await page.evaluate(project => {
      localStorage.setItem("render-storage", JSON.stringify(project));
    }, project);

    await page.reload({ waitUntil: "networkidle2", timeout: 0 });

    console.log("SCREEN START", 5);

    await page.waitForFunction(
      () => localStorage.getItem("render-storage") !== null
    );

    console.log("SCREEN START", 6);

    console.log("SCREEN START", 7);

    console.log("SCREEN START", 8);

    console.log("SCREEN START", 9);

    if (project.productId == 1) {
      await page.waitForTimeout(16000);
    }

    if (project.productId == 0) {
      await page.waitForTimeout(16000);
    }

    if (project.productId == 2) {
      console.log("START WAIT TILES");

      await page.waitForFunction(() => window.CustomMapIsReady);

      console.log("END WAIT TILES");

      // await page.waitForTimeout(8000);
    }

    await page.waitForSelector(".art");

    console.log("SCREEN START", 11);

    const elementHandle: any = await page.$(".screen-wrapper");

    console.log("SCREEN START", 12);

    if (elementHandle) {
      console.log("GOT");

      await page.screenshot({
        path: "screenshot.png",
      });

      console.log("SCREEN START END");

      const screenshotBuffer = await page.screenshot({
        encoding: "binary",
      });

      console.log("SCREEN END", screenshotBuffer);
      await browser.close();

      const readBuffer = Jimp.read(screenshotBuffer)
        .then(image => {
          return image
            .resize(520, Jimp.AUTO)
            .quality(100)
            .getBufferAsync(Jimp.MIME_PNG);
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
    await browser.close();
  }
};
