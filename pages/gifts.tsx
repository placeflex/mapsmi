import Image from "next/image";
import { Layout } from "@/components/Layout";

import { Container } from "@/components/Container";
import { OurPosters } from "@/modules/Home/OurPosters";

const Holiday = () => {
  return (
    <Layout
      headerProps={{ classNames: "bg-secondary" }}
      scroll={true}
      col={true}
    >
      <div>
        <div className="bg-button">
          <Container>
            <div className="py-[4rem] text-center">
              <span className="uppercase text-white text-caption">
                JINGLE ALL THE WAY
              </span>
              <h1 className="text-white text-h4 lg:text-h2 mb-[2rem] leading-[1.1]">
                Custom Gifts,
                <br /> Unforgettable Memories
              </h1>
              <p className="text-white text-caption lg:text-bodySmall">
                Every gift has a tale to tell. This festive season, let your
                presents narrate stories of love, adventure, and shared moments.{" "}
                <br />
                Create lasting memories with gifts that echo with personal
                significance.
              </p>
            </div>
          </Container>
        </div>

        <div className="h-[350px] w-full overflow-x-auto hide-scroll">
          <div className="w-full min-w-[2000px] h-full flex">
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=768/content/uploads/2018/11/christmas.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=1280/content/uploads/2021/10/baby-first-christmas.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=1280/content/uploads/2021/09/christmas-starmap.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=1280/content/uploads/2023/11/386796987.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=1280/content/uploads/2023/11/389840826.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative w-[16.666%] aspect-square">
              <Image
                src={
                  "https://www.mapiful.com/cdn-cgi/image/format=auto,width=768/content/uploads/2018/11/christmas.jpg"
                }
                alt="fill"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <OurPosters />
      </div>
    </Layout>
  );
};

export default Holiday;
