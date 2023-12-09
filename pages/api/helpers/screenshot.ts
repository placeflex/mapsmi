import puppeteer, { ElementHandle } from "puppeteer";

export const handleScreen = async (project: any) => {
  console.log("SCREEN START", 1);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--use-angle=gl-egl",
      "--no-sandbox",
      "--disable-gpu-driver-bug-workarounds",
      "--ignore-gpu-blocklist",
      "--enable-gpu-rasterization",
      "--enable-zero-copy",
      "--enable-unsafe-webgpu",
      "--enable-features=VaapiVideoEncoder,VaapiVideoDecoder,CanvasOopRasterization",
      "--run-all-compositor-stages-before-draw",
    ],
  });

  console.log("SCREEN START", 2);

  // Создаем новую вкладку
  const page = await browser.newPage();

  console.log("SCREEN START", 3);

  await page.goto(
    `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
    { waitUntil: "networkidle0" }
  );

  console.log("SCREEN START", 4);

  await page.evaluate(project => {
    localStorage.setItem("profile-storage", JSON.stringify(project));
  }, project);

  console.log("SCREEN START", 5);

  const viewportDimensions = await page.evaluate(() => {
    return {
      width: 3000,
      height: 3000,
    };
  });

  console.log("SCREEN START", 6);

  await page.setViewport(viewportDimensions);

  console.log("SCREEN START", 7);

  await page.waitForFunction(
    () => localStorage.getItem("profile-storage") !== null
  );

  console.log("SCREEN START", 8);
  // await page.setViewport({ width: 2000, height: 1980 });

  await page.reload();

  console.log("SCREEN START", 9);

  console.log("SCREEN START", 10);
  // Ждем, пока элемент появится на странице
  await page.waitForSelector(".art");

  console.log("SCREEN START", 11);

  // Получаем обработчик элемента
  const elementHandle: any = await page.$(".art");

  console.log("SCREEN START", 12);

  if (elementHandle) {
    console.log("SCREEN START", 13);

    // const box = await elementHandle.boundingBox();

    // await page.pdf({
    //   width: box.width,
    //   height: box.height,
    //   preferCSSPageSize: true,
    //   printBackground: true,
    //   timeout: 1000,
    //   path: "output.pdf",
    // });

    return new Promise((res, rej) => {
      const screenshotBuffer = elementHandle.screenshot({
        encoding: "binary",
      });

      if (screenshotBuffer) {
        res(screenshotBuffer);
      } else {
        rej("ERROR");
        browser.close();
      }
    })
      .then(screen => {
        console.log("screen", screen);

        return screen;
      })
      .finally(() => {
        browser.close();
      });
  }

  await browser.close();
};
