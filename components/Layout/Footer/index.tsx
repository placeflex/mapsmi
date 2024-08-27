import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import {
  PRODUCTS,
  DESIGNS,
  ALL_POSTER_TYPES,
} from "@/constants/wallart-categories";

// routes
import { popularWallartsRoot, publicRoutes } from "@/constants/routers";

export const OUT_MORE_LINKS = [
  {
    title: "About",
    link: publicRoutes.about,
  },
  // {
  //   title: "Why Us?",
  //   link: publicRoutes.whyus,
  // },
  {
    title: "Reviews",
    link: "https://uk.trustpilot.com/",
    target: true,
  },
  {
    title: "Contact Us",
    link: publicRoutes.contact,
  },
  {
    title: "Privacy",
    link: publicRoutes.privacy,
  },
  {
    title: "Terms",
    link: publicRoutes.terms,
  },
];

export const OUT_MORE = [
  {
    title: "find out more",
    links: OUT_MORE_LINKS,
  },
];

export const Footer = () => {
  const FOOTER_CAT = [
    DESIGNS[0],
    DESIGNS[3],
    DESIGNS[2],
    ALL_POSTER_TYPES[0],
    OUT_MORE[0],
  ];

  return (
    <footer className="bg-black">
      <Container>
        <div className="py-[4rem]">
          <Logo
            className="text-white"
            fill="#fff"
            textColor="text-body font-bold"
            width={30}
          />

          <div className="mt-[4rem]">
            <div className="flex gap-[2rem]">
              {FOOTER_CAT.map(({ title, links }, idx) => {
                return (
                  <div key={idx} className="w-[15%]">
                    <h5 className="text-bodySmall text-white font-semibold mb-[1rem] capitalize">
                      {title}
                    </h5>

                    {links.length > 0 && (
                      <div className="flex flex-col items-start gap-[1rem]">
                        {links.map(
                          (
                            {
                              title,
                              link,
                              target,
                            }: { target: any; title: string; link: string },
                            idx
                          ) => {
                            const isTargetBlank = target
                              ? { target: "_blank" }
                              : {};
                            return (
                              <Link
                                href={link}
                                key={idx}
                                className="inline-block"
                                {...isTargetBlank}
                              >
                                <span className="block text-captionSmall text-white hover:text-link">
                                  {title}
                                </span>
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="w-[15%]">
                <h5 className="text-bodySmall text-white font-semibold mb-[1rem] capitalize">
                  Follow Us
                </h5>

                <div className="flex flex-col items-start gap-[1rem]">
                  <Link
                    href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK ?? ""}
                    target="_blank"
                    className="inline-block"
                  >
                    <span className="block text-captionSmall text-white hover:text-link">
                      Instagram
                    </span>
                  </Link>
                  <Link href={"/"} className="inline-block">
                    <span className="block text-captionSmall text-white hover:text-link">
                      Telegram
                    </span>
                  </Link>
                  <Link href={"/"} className="inline-block">
                    <span className="block text-captionSmall text-white hover:text-link">
                      Pinterest
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="flex items-center py-[2rem] border-t border-t-[rgba(255,255,255,0.1)]">
        <span className="text-white block w-full text-center">
          © {new Date().getFullYear()} MapsMingle. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
