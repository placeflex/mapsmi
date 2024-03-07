import puppeteer from "puppeteer";

export const generatePDF = async (project: any) => {
  console.log("PDF START", 1);
  const orientationPortraint =
    project.selectedAttributes.orientation.name.toLowerCase() === "portrait";

  let sizes = {
    width: orientationPortraint
      ? Math.round(project.selectedAttributes.size.width)
      : Math.round(project.selectedAttributes.size.height),
    height: orientationPortraint
      ? Math.round(project.selectedAttributes.size.height)
      : Math.round(project.selectedAttributes.size.width),
  };

  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      ...sizes,
    },
    args: ["--no-sandbox"],
  });

  try {
    console.log("SCREEN START", 2);

    const page = await browser.newPage();

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
      { waitUntil: "networkidle2" }
    );

    console.log("SCREEN START", 4);

    await page.evaluate(project => {
      localStorage.setItem("profile-storage", JSON.stringify(project));
    }, project);

    console.log("SCREEN START", 5);

    await page.waitForFunction(
      () => localStorage.getItem("profile-storage") !== null
    );

    await page.reload({ waitUntil: "networkidle2", timeout: 0 });

    console.log("SCREEN START", 6);

    console.log("SCREEN START", 7);

    console.log("SCREEN START", 8);

    console.log("SCREEN START", 9);

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

    console.log("SCREEN START", 11);

    const elementHandle: any = await page.$(".art");

    console.log("SCREEN START", 12);

    if (elementHandle) {
      console.log("GOT");

      await page.pdf({
        preferCSSPageSize: false,
        printBackground: true,
        ...sizes,
        path: `pdf-project-${project.uuid}-test.pdf`,
        // scale: 1,
        // pageRanges: "1",
      });

      console.log("SCREEN START END");

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
