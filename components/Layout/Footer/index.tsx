import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { PRODUCTS, DESIGNS } from "@/constants/wallart-categories";

export const Footer = () => {
  return (
    <footer className="bg-secondary">
      <Container>
        <div className="py-[4rem] text-center">
          <h3 className="text-h3 font-semibold mb-[0.4rem]">Contact Us</h3>
          <p className="text-bodySmallBold">
            Our agents are waiting for your call.
          </p>

          <div className="mt-[4rem]">
            <div className="flex justify-center gap-[2rem]">
              {DESIGNS.map(({ title, links }, idx) => {
                return (
                  <div key={idx} className="w-[15%]">
                    <h5 className="text-bodySmall font-semibold mb-[1rem]">
                      {title}
                    </h5>

                    {links.length > 0 && (
                      <div>
                        {links.map(({ title, link }, idx) => {
                          return (
                            <Link href={link} key={idx}>
                              <span className="block text-captionSmall text-text mb-[1rem] hover:text-link">
                                {title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
