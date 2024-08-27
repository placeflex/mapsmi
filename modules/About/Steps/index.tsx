import Image from "next/image";
import { Container } from "@/components/Container";
export const AboutSteps = () => {
  return (
    <div>
      {/* <Container> */}
      <div>
        <div className="text-center">
          <h3 className="text-h3">
            Lifelong Memories Made in <br />
            Four Simple Steps
          </h3>
          <p className="text-body">
            We can show you how to create something magical in minutes.
          </p>
        </div>
        <div className="mt-[12rem]">
          <div className="s-block flex items-center">
            <div className="relative w-[50%] h-[72rem]">
              <Image
                src={
                  "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/imagetext_desktop_fallback/public/fields/media.image.field_media_image/2023-01/look-data-points.png?itok=xfH0R9Jj"
                }
                alt="sbloc"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="w-[50%] p-[4rem]">
              <span className="font-second mb-[2rem] inline-block text-h3 text-blueGrey">
                1
              </span>
              <h5 className="text-bodyBold mb-[0.5rem]">
                Look At The Data Points
              </h5>
              <p className="text-caption">
                When you look at a photograph, you may see a beautiful bride
                walking down the aisle. But what if you could stand on the altar
                where you took your vows? Your photos contain an invisible layer
                of information highlighting the smaller moments in your
                memories. We safely extract this information, called metadata so
                that you can experience the intimacy of those moments with all
                your senses.
              </p>
            </div>
          </div>

          <div className="s-block flex flex-row-reverse items-center  bg-secondary">
            <div className="relative w-[50%] h-[72rem]">
              <Image
                src={
                  "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/imagetext_desktop_fallback/public/fields/mediaimagefieldmediaimage/2023-05/enchance-your-memories.jpg?itok=lm2hGWNN"
                }
                alt="sbloc"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="w-[50%] p-[4rem]">
              <span className="font-second mb-[2rem] inline-block text-h3 text-blueGrey">
                2
              </span>
              <h5 className="text-bodyBold mb-[0.5rem]">
                Enhance Your Memories
              </h5>
              <p className="text-caption">
                Even with a photograph, its difficult to recall the
                location of that restaurant where you all met in Florence. But a
                picture never forgets. MixPlaces safely and securely processes
                your data, using it to find geospatial information, elevation,
                historical moon phases, celestial information, past weather
                patterns, and so much more. We enhance your memories so you can
                travel through time — right back to that restaurant in Florence.
              </p>
            </div>
          </div>

          <div className="s-block flex items-center">
            <div className="relative w-[50%] h-[72rem]">
              <Image
                src={
                  "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/imagetext_desktop/public/fields/mediaimagefieldmediaimage/2023-09/image-design-jaw-dropping-art.jpg.webp?itok=iQpriafm"
                }
                alt="sbloc"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="w-[50%] p-[4rem]">
              <span className="font-second mb-[2rem] inline-block text-h3 text-blueGrey">
                3
              </span>
              <h5 className="text-bodyBold mb-[0.5rem]">
                Design Jaw Dropping Art
              </h5>
              <p className="text-caption">
                The pictures of your cross-country tour are amazing, but are
                they immersive? What if you could create artwork filled with the
                joy, excitement, and even exhaustion of your travels? Upload
                your images to our editor and answer a few questions. Then watch
                our algorithm transform your data into gorgeous wall art or a
                beautiful photo book dotted with star maps, street maps, and
                coordinate posters that brings your itinerary to life.
              </p>
            </div>
          </div>

          <div className="s-block flex flex-row-reverse items-center bg-secondary">
            <div className="relative w-[50%] h-[72rem]">
              <Image
                src={
                  "https://storage.mixplaces.com/mixplace-files/s3fs-public/styles/imagetext_desktop/public/fields/mediaimagefieldmediaimage/2023-09/image-one-kind-products.jpg.webp?itok=ostekCoE"
                }
                alt="sbloc"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="w-[50%] p-[4rem]">
              <span className="font-second mb-[2rem] inline-block text-h3 text-blueGrey">
                4
              </span>
              <h5 className="text-bodyBold mb-[0.5rem]">
                One Of A Kind Products
              </h5>
              <p className="text-caption">
                Our simple-to-use editor guides you as you build incredible
                artwork that touches all of your senses. We start by safely
                extracting the invisible data hiding within your photos, and
                process that information while prioritizing your privacy. It
                finishes with color-coordinated, stylistically matching frames
                or books of your choosing, and the highest-quality paper and
                inks. And the best part? You can complete the whole process in
                minutes on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};
