import { Container } from "@/components/Container";
import Image from "next/image";

import ceo from "@/public/ceo.jpg";

export const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col relative">
        <Container className="px-[0rem]">
          <div className="flex flex-col-reverse lg:flex lg:flex-row">
            <div className="w-full py-[2rem] lg:w-[50%] lg:py-[12rem] lg:px-[0rem]">
              <h1 className="text-h1">About us</h1>
              <p className="text-bodySmall font-semibold">
                We exist to inspire you to celebrate how far you have come in
                life, and for you to be excited for the future. We believe
                memories to be part of an overall journey that should be
                celebrated everyday.
              </p>

              <ul className="mt-[2rem] lg:mt-[4rem]">
                <li className="mb-[2rem] lg:mb-[4rem]">
                  <h5 className="text-bodySmallBold mb-[0.5rem]">
                    Our mission
                  </h5>
                  <p className="text-bodySmall">
                    We aim to provide unique meaningful products that boost
                    people’s confidence, self esteem and elevate their
                    creativity. We want to be the place people come to celebrate
                    what matters most to them and the people they love.
                  </p>
                </li>

                <li>
                  <h5 className="text-bodySmallBold mb-[0.5rem]">Our vision</h5>
                  <p className="text-bodySmall">
                    We provide our customers with personal home decor that
                    highlights how unique and strong they are. Personalising a
                    Mapiful product takes you on a journey of gratitude and
                    remembrance. We strive to inspire growth, personal story,
                    and inner-strength.
                  </p>
                </li>
              </ul>
            </div>

            <div className="w-full  h-[500px] mt-[1.5rem] top-0 relative lg:mt-0 lg:absolute lg:h-full lg:w-[48%] lg:right-0">
              <Image
                src={
                  "https://www.mapiful.com/content/uploads/2021/03/misssouphi-1-970x1024-2.jpg"
                }
                alt="alt"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="flex flex-col relative bg-secondary">
        <Container className="px-[0rem]">
          <div className="flex flex-col-reverse lg:flex lg:flex-row">
            {/* <div className="w-full py-[4rem] lg:w-[50%] lg:py-[12rem]"> */}
            <div className="w-full py-[2rem] lg:w-[43%] lg:py-[12rem] lg:ml-auto lg:px-[0rem]">
              <h1 className="text-h1">Our Story</h1>

              <ul>
                <li className="mb-[4rem]">
                  <h5 className="text-bodySmallBold mb-[0.5rem]">
                    It all started with …
                  </h5>
                  <p className="text-bodySmall">
                    Four friends talking about the possibilities of combining
                    technology, design, and maps over a cup of coffee. We
                    realized that we would want our favorite places on a poster,
                    at home – and so the idea of Mapiful was born. Today, we
                    want to be able to provide you with the magical possibility
                    of designing and putting such a piece on your wall, as a
                    constant reminder of happiness, love, marriage, or whatever
                    holds a valuable place in your heart.
                  </p>
                </li>
              </ul>

              <p className="p-[2rem] bg-white max-w-[40rem] text-captionSmallBold rounded-[10px] relative">
                “We started MapsMingle with the same purpose that still drives
                us today. To create products that bring that warm fuzzy feeling
                inside when you see them, and let you love the places where you
                spend your time in just a little bit more”
                <span className="h-0 w-0 border-x-8 border-x-transparent border-t-[10px] border-t-white absolute bottom-[-10px] left-[30px]"></span>
              </p>

              <div className="flex items-center gap-[2rem]  mt-[2rem]">
                <div className="relative w-[80px] h-[80px] rounded-[9999px] overflow-hidden">
                  <Image
                    src={ceo}
                    alt="CEO"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>

                <div>
                  <h5 className="text-bodySmallBold">Yehor Safronov</h5>
                  <span>CEO @ MAPSMINGLE</span>
                </div>
              </div>
            </div>
            {/* <div className="w-full  h-[500px] mt-[1.5rem] top-0 relative lg:absolute lg:h-full lg:w-[48%] lg:right-0"> */}
            <div className="w-full  h-[500px] top-0 relative lg:w-[52%] lg:h-full lg:left-0 lg:top-0 lg:absolute">
              <Image
                src={
                  "https://www.mapiful.com/content/uploads/2021/03/gelicca-819x1024-1.jpg"
                }
                alt="alt"
                layout="fill"
                objectFit="cover"
                objectPosition="center center"
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
