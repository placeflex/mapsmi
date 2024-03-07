import puppeteer from "puppeteer";

export const handleScreen = async (project: any) => {
  console.log("SCREEN START", 1);

  console.log("project", project);

  const orientation = project.selectedAttributes.orientation.name.toLowerCase();

  const browser = await puppeteer.launch({
    headless: true, // Use true for headless mode
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

  try {
    console.log("SCREEN START", 2);

    const page = await browser.newPage();

    console.log("SCREEN START", 3);

    const sizes = {
      width: project.selectedAttributes.size.width,
      height: project.selectedAttributes.size.height,
    };

    await page.setViewport({ ...sizes });

    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
      { waitUntil: "networkidle0" }
    );

    console.log("SCREEN START", 4);

    await page.evaluate(project => {
      localStorage.setItem("profile-storage", JSON.stringify(project));
    }, project);

    console.log("SCREEN START", 5);

    await page.waitForFunction(
      () => localStorage.getItem("profile-storage") !== null
    );

    await page.reload({ waitUntil: "networkidle0", timeout: 0 });

    // const sizeDemenssions = project.selectedAttributes.size.name
    //   .split(/\D+/)
    //   .filter(Boolean)
    //   .map(Number);

    // const dpi300W = Math.round((sizeDemenssions[0] * 300) / 2.54);
    // const dpi300H = Math.round((sizeDemenssions[1] * 300) / 2.54);

    // const viewportDimensions = await page.evaluate(sizes => {
    //   return {
    //     ...sizes,
    //   };
    // }, sizes);

    // await page.setViewport(viewportDimensions);

    console.log("SCREEN START", 6);

    console.log("SCREEN START", 7);

    console.log("SCREEN START", 8);

    console.log("SCREEN START", 9);

    if (project.productId == 2) {
      console.log("STREET MAP");

      // await page.waitForSelector(".blob-img", { timeout: 0 });
      await page.waitForTimeout(5000);

      console.log("GOT BLOB");

      console.log("FINISH TIMEOUT");
    }

    await page.waitForTimeout(5000);

    console.log("SCREEN START", 10);

    await page.waitForSelector(".art");

    console.log("SCREEN START", 11);

    const elementHandle: any = await page.$(".art");
    const elementBlob: any = await page.$(".blob-img");

    console.log("SCREEN START", 12);

    if (elementHandle) {
      console.log("SCREEN START", 13, elementHandle);
      // const box = await elementHandle.boundingBox();
      // console.log("BOX GOT", box);

      console.log("sizes", sizes);

      await page.pdf({
        preferCSSPageSize: false,
        printBackground: true,
        ...sizes,
        path: `pdf-project-${project.uuid}-test.pdf`,
        // scale: 1,
        // pageRanges: "1",
      });

      // const viewportDimensions = await page.evaluate(sizes => {
      //   return {
      //     ...sizes,
      //   };
      // }, sizes);

      await page.setViewport({ ...sizes });

      await page.waitForTimeout(2000);

      await elementHandle.screenshot({
        path: "screenshot.png",
      });

      const screenshotBuffer = await elementHandle.screenshot({
        encoding: "binary",
      });

      console.log("SCREEN END");

      return screenshotBuffer;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser in the finally block to ensure it's closed even if an error occurs
    // await browser.close();
  }
};

// export const handleScreen = async (project: any) => {
//   console.log("SCREEN START", 1);

//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: [
//       "--use-angle=gl-egl",
//       "--no-sandbox",
//       "--disable-gpu-driver-bug-workarounds",
//       "--ignore-gpu-blocklist",
//       "--enable-gpu-rasterization",
//       "--enable-zero-copy",
//       "--enable-unsafe-webgpu",
//       "--enable-features=VaapiVideoEncoder,VaapiVideoDecoder,CanvasOopRasterization",
//       "--run-all-compositor-stages-before-draw",
//     ],
//     // args: [
//     //   "--no-sandbox",
//     //   "--disable-setuid-sandbox",
//     //   "--disable-infobars",
//     //   "--disable-dev-shm-usage",
//     //   "--disable-accelerated-2d-canvas", // Disable this flag to enable WebGL
//     //   "--hide-scrollbars",
//     //   "--disable-notifications",
//     //   "--disable-background-timer-throttling",
//     //   "--disable-backgrounding-occluded-windows",
//     //   "--disable-breakpad",
//     //   "--disable-component-extensions-with-background-pages",
//     //   "--disable-extensions",
//     //   "--disable-ipc-flooding-protection",
//     //   "--disable-renderer-backgrounding",
//     //   "--force-color-profile=srgb",
//     //   "--metrics-recording-only",
//     //   "--mute-audio",
//     // ],
//   });

//   console.log("SCREEN START", 2);

//   // Создаем новую вкладку
//   const page = await browser.newPage();

//   console.log("SCREEN START", 3);

//   await page.goto(
//     `${process.env.NEXT_PUBLIC_BASE_URL_FRONTEND}/render?product_id=${project.productId}`,
//     { waitUntil: "networkidle2" }
//   );

//   console.log("SCREEN START", 4);

//   // page.on("console", message => console.log("CONSOLE LOG:", message.text()));

//   await page.evaluate(project => {
//     localStorage.setItem("profile-storage", JSON.stringify(project));
//   }, project);

//   console.log("SCREEN START", 5);

//   const viewportDimensions = await page.evaluate(() => {
//     return {
//       width: 2500,
//       height: Math.round(2500 / 1.44),
//       deviceScaleFactor: 8,
//     };
//   });

//   await page.setViewport(viewportDimensions);

//   console.log("SCREEN START", 6);

//   console.log("SCREEN START", 7);

//   await page.waitForFunction(
//     () => localStorage.getItem("profile-storage") !== null
//   );

//   console.log("SCREEN START", 8);
//   // await page.setViewport({ width: 2000, height: 1980 });

//   await page.reload();

//   console.log("SCREEN START", 9);

//   if (project.productId == 2) {
//     console.log("STREET MAP");

//     await page.waitForSelector(".blob-img");
//     await page.waitForTimeout(10000);

//     console.log("GOT BLOB");

//     console.log("FINISH TIMEOUT");
//   }

//   console.log("SCREEN START", 10);
//   // Ждем, пока элемент появится на странице
//   await page.waitForSelector(".art");

//   console.log("SCREEN START", 11);

//   // Получаем обработчик элемента
//   const elementHandle: any = await page.$(".art");
//   const elementBlob: any = await page.$(".blob-img");

//   console.log("SCREEN START", 12);

//   if (elementHandle) {
//     console.log("SCREEN START", 13, elementHandle);
//     const box = await elementHandle.boundingBox();
//     console.log("BOX GOT", box);

//     await page.pdf({
//       preferCSSPageSize: false,
//       printBackground: true,
//       width: box.width,
//       height: box.height,
//       path: `pdf-project-${project.uuid}-test.pdf`,
//     });

//     console.log("PDF END");

//     // await elementHandle.screenshot({ path: "screenshot.png" });
//     console.log("SCREEN START", elementBlob);

//     await elementBlob.screenshot({
//       path: "screenshot.png",
//       clip: box,
//       omitBackground: true,
//     });

//     // const screenshotBuffer = await elementHandle.screenshot({
//     //   encoding: "binary",
//     //   path: "here.png",
//     // });

//     console.log("SCREEN END");

//     await page.close();
//     await browser.close();

//     // return screenshotBuffer;

//     // const box = await elementHandle.boundingBox();

//     // return new Promise((res, rej) => {
//     //   const screenshotBuffer = elementHandle.screenshot({
//     //     encoding: "binary",
//     //   });

//     //   if (screenshotBuffer) {
//     //     res(screenshotBuffer);
//     //   } else {
//     //     rej("ERROR");
//     //     browser.close();
//     //   }
//     // })
//     //   .then(screen => {
//     //     return screen;
//     //   })
//     //   .finally(() => {
//     //     browser.close();
//     //   });
//   }
// };
