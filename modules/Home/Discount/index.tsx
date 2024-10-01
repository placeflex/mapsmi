import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

import Image from "next/image";

export const Discount = () => {
  return (
    <div className="relative">
      <Container className="z-10 relative flex">
        <div className="py-[20rem] ml-auto w-[50%]">
          <h4 className="text-h3 font-second text-white">On sale right now!</h4>
          <h4 className="text-h2 font-semibold text-white">
            25% off on all posters
          </h4>
          <p className="text-[2rem] text-white font-semibold">
            And to go with that you also get 10% off all frames and hangers!
          </p>

          <Button
            type="button"
            color="secondary"
            className="text-caption mt-[2rem]"
            rounded={true}
          >
            Get Started
          </Button>
        </div>
      </Container>

      <Image
        src="https://www.mapiful.com/cdn-cgi/image/format=auto,width=1536/content/themes/mapiful_v2/classes/campaigns/assets/2024-february/banner.webp"
        alt="disc"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={100}
      />
    </div>
  );
};
