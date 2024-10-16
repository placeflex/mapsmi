import puppeteer from "puppeteer";

import { handleGetPosterGap } from "@/components/LayoutPreviewWrapper";

export const generatePDF = async (project: any) => {
  console.log("PDF START", 1);
  const orientationPortraint =
    project.selectedAttributes.orientation.name.toLowerCase() === "portrait";

  const gap = handleGetPosterGap(project.selectedAttributes.size.id);

  const frameIsEnabled = project.selectedAttributes.frame.id !== 0;

  const w = Math.round(project.selectedAttributes.size.width - gap);
  const h = Math.round(project.selectedAttributes.size.height - gap);

  let sizes = {
    width: orientationPortraint ? Math.round(w) : Math.round(h),
    height: orientationPortraint ? Math.round(h) : Math.round(w),
  };

  // let sizes = {
  //   width: orientationPortraint
  //     ? Math.round(project.selectedAttributes.size.width - gap)
  //     : Math.round(project.selectedAttributes.size.height - gap),
  //   height: orientationPortraint
  //     ? Math.round(project.selectedAttributes.size.height - gap)
  //     : Math.round(project.selectedAttributes.size.width - gap),
  // };

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      ...sizes,
    },
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  const username = process.env.NEXT_BASIC_AUTH_LOGIN;
  const password = process.env.NEXT_BASIC_AUTH_PASS;
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  // Устанавливаем заголовок Authorization для всех запросов
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${auth}`,
  });

  try {
    console.log("PDF START", 2);

    console.log("PDF START", 3);

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
      { waitUntil: "networkidle0" }
    );

    console.log("PDF START", 4);

    await page.evaluate(project => {
      localStorage.setItem("render-storage", JSON.stringify(project));
    }, project);

    console.log("PDF START", 5);

    await page.waitForFunction(
      () => localStorage.getItem("render-storage") !== null
    );

    await page.reload({ waitUntil: "networkidle0", timeout: 0 });

    console.log("PDF START", 6);

    console.log("PDF START", 7);

    console.log("PDF START", 8);

    console.log("PDF START", 9);

    // SKYMAP
    if (project.productId == 1) {
      await page.waitForTimeout(10000);
    }

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
        path: `pdf-project-${project.uuid}-test.pdf`,
        // scale: 1,
        pageRanges: "1",
        tagged: false,
        timeout: 0,
        ...sizes,
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
