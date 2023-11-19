import puppeteer, { ElementHandle } from "puppeteer";

export const handleScreen = async (project: any) => {
  console.log("SCREEN START", 1);

  const browser = await puppeteer.launch({
    headless: "new",
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
      "--disable-setuid-sandbox",
    ],
  });

  console.log("SCREEN START", 2);

  // Создаем новую вкладку
  const page = await browser.newPage();

  console.log("SCREEN START", 3);

  await page.goto(
    `http://localhost:3000/render?product_id=${project.productId}`
  );

  console.log("SCREEN START", 4);

  await page.evaluate(project => {
    localStorage.setItem("profile-storage", JSON.stringify(project));
  }, project);

  console.log("SCREEN START", 5);

  const viewportDimensions = await page.evaluate(() => {
    return {
      width: 2240,
      height: 1660,
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

  await page.waitForTimeout(7000);

  console.log("SCREEN START", 10);
  // Ждем, пока элемент появится на странице
  await page.waitForSelector(".art");

  console.log("SCREEN START", 11);

  // Получаем обработчик элемента
  const elementHandle = await page.$(".art");

  console.log("SCREEN START", 12);

  if (elementHandle) {
    // const screenshotPath = "./screenshot.png";
    // await elementHandle.screenshot({ path: "screenshot.png" });

    console.log("SCREEN START", 13);

    // const box = await elementHandle.boundingBox();

    // await page.pdf({
    //   width: box.width,
    //   height: box.height,
    //   scale: 1,
    //   preferCSSPageSize: false,
    //   printBackground: true,
    //   margin: { top: 0, right: 0, bottom: 0, left: 0 },
    //   pageRanges: "1",
    //   path: "output.pdf", // Путь к файлу PDF
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
        return screen;
      })
      .finally(() => {
        browser.close();
      });
  }

  await browser.close();
};
