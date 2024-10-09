import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";
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

interface IFooter {
  className?: string;
}

export const Footer: FC<IFooter> = ({ className }) => {
  const FOOTER_CAT = [
    DESIGNS[0],
    DESIGNS[3],
    DESIGNS[2],
    ALL_POSTER_TYPES[0],
    OUT_MORE[0],
  ];

  const FOLLOW_ASS = ({ width = 15 }) => {
    return (
      <div className={`w-[${width}%]`}>
        <h5 className="text-bodySmall text-white font-semibold mb-[1rem] capitalize">
          Follow Us
        </h5>

        <div className="flex flex-col items-start gap-[1rem]">
          <Link
            href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK ?? ""}
            target="_blank"
            className="inline-block"
          >
            <span className="block text-captionSmall text-white hover:underline">
              Instagram
            </span>
          </Link>
          <Link href={"/"} className="inline-block">
            <span className="block text-captionSmall text-white hover:underline">
              Telegram
            </span>
          </Link>
          <Link href={"/"} className="inline-block">
            <span className="block text-captionSmall text-white hover:underline">
              Pinterest
            </span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <footer className={clsx("bg-black", className)}>
      <Container>
        <div className="py-[4rem]">
          <Logo
            className="text-white"
            fill="#fff"
            textColor="text-body font-bold"
            width={30}
          />

          <div className="hidden lg:block mt-[4rem]">
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
                                <span className="block text-captionSmall text-white hover:underline">
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
              <FOLLOW_ASS />
            </div>
          </div>

          <div className="flex mt-[4rem]  lg:hidden gap-[2rem]">
            {[FOOTER_CAT[4]].map(({ title, links }, idx) => {
              return (
                <div key={idx} className="w-[50%]">
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
                              <span className="block text-captionSmall text-white hover:underline">
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
            <FOLLOW_ASS width={50} />
          </div>
        </div>

        <div className="flex items-center py-[2rem] border-t border-t-[rgba(255,255,255,0.1)]">
          <div className="text-white w-full flex flex-col text-center gap-[0.5rem] sm:flex-row sm:text-left">
            <span className="text-[1.5rem] sm:text-[1.2rem]">
              © {new Date().getFullYear()} MapsMi. All rights reserved.
            </span>
            <div className="flex gap-[1rem] justify-center sm:ml-auto">
              <Link
                href={publicRoutes.privacy}
                className="text-white text-[1.2rem] hover:underline"
              >
                Privacy policy
              </Link>
              <Link
                href={publicRoutes.terms}
                className="text-white text-[1.2rem] hover:underline"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
