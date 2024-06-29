import puppeteer from "puppeteer";

import { handleGetPosterGap } from "@/components/LayoutPreviewWrapper";

export const generatePDF = async (project: any) => {
  console.log("PDF START", 1);
  const orientationPortraint =
    project.selectedAttributes.orientation.name.toLowerCase() === "portrait";

  const gap = handleGetPosterGap(project.selectedAttributes.size.id);

  let sizes = {
    width: orientationPortraint
      ? Math.round(project.selectedAttributes.size.width - gap)
      : Math.round(project.selectedAttributes.size.height - gap),
    height: orientationPortraint
      ? Math.round(project.selectedAttributes.size.height - gap)
      : Math.round(project.selectedAttributes.size.width - gap),
  };

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      ...sizes,
    },
    args: ["--no-sandbox"],
  });

  try {
    console.log("PDF START", 2);

    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
      { waitUntil: "networkidle2" }
    );

    console.log("PDF START", 4);

    await page.evaluate(project => {
      localStorage.setItem("render-storage", JSON.stringify(project));
    }, project);

    console.log("PDF START", 5);

    await page.waitForFunction(
      () => localStorage.getItem("render-storage") !== null
    );

    await page.reload({ waitUntil: "networkidle2", timeout: 0 });

    console.log("PDF START", 6);

    console.log("PDF START", 7);

    console.log("PDF START", 8);

    console.log("PDF START", 9);

    if (project.productId == 2) {
      console.log("START WAIT TILES");

      await page.waitForFunction(() => window.CustomMapIsReady);

      console.log("END WAIT TILES");

      await page.waitForTimeout(4000);
    } else {
      console.log("START WAITING");

      // await page.waitForTimeout(10000);
    }

    await page.waitForSelector(".art");

    console.log("PDF START", 11);

    const elementHandle: any = await page.$(".art");

    console.log("PDF START", 12);

    if (elementHandle) {
      console.log("GOT");

      return await page.pdf({
        preferCSSPageSize: false,
        printBackground: true,
        ...sizes,
        path: `pdf-project-${project.uuid}-test.pdf`,
        // scale: 1,
        pageRanges: "1",
      });

      // const screenshotBuffer = await elementHandle.screenshot({
      //   encoding: "binary",
      // });

      //   console.log("SCREEN END");

      // return screenshotBuffer;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
};
