import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Popover, Transition, Disclosure, Dialog } from "@headlessui/react";

// components
import { Container } from "@/components/Container";

// icons
import { Logo } from "@/components/Logo";
import Basket from "@/public/icons/basket.svg";
import Login from "@/public/icons/login.svg";

//
import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";
import example from "@/public/example.png";
import exampleTest from "@/public/example-test.png";
import LineArt from "@/public/lineart-example.png";

// stores
import { handleShowLoginModal } from "@/redux/modals";
import { handleLogout } from "@/redux/user";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";

const products = [
  {
    name: "Street Map",
    description: "Get a better understanding of your traffic",
    href: "#",
    image: example,
  },
  {
    name: "Star Map",
    description: "Speak directly to your customers",
    href: "#",
    image: LineArt,
  },
  {
    name: "LineArt",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    image: example,
  },
  {
    name: "Zodiac",
    description: "Connect with third-party tools",
    href: "#",
    image: LineArt,
  },
  {
    name: "Coordinates",
    description: "Build strategic funnels that will convert",
    href: "#",
    image: example,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#" },
  { name: "Contact sales", href: "#" },
];

export const Header = ({ isFixed }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { query } = useRouter();

  const isUserLogged = useTypedSelector(({ user }) => user.isAdmin);

  const dispatch = useDispatch();

  return (
    <header
      className={classNames(
        "flex px-[2rem] py-[1.5rem] w-full z-10 bg-primary/[.9]",
        isFixed ? "sticky top-0" : "relative"
      )}
    >
      <Container>
        <div className="flex">
          <nav className="flex flex-1">
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:items-center lg:gap-x-12">
              <Popover className="">
                <Popover.Button className="flex items-center gap-x-1 text-caption text-text">
                  Wall Art
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 top-[6.2rem] z-10 w-screen overflow-hidden bg-bg">
                    <div className="py-[2rem] px-[2rem] flex gap-[2rem]">
                      {products.map(({ name, image, description, href }) => (
                        <div
                          key={name}
                          className="group w-[15%] group relative flex flex-col rounded-lg  bg-white"
                        >
                          <div className="flex transition relative aspect-square group-hover:blur-sm">
                            <Image
                              src={image}
                              alt="terra"
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                              quality={100}
                              priority={true}
                            />
                          </div>
                          <div className="flex-auto p-[2rem]">
                            <a
                              href={href}
                              className="block text-bodySmall font-bold text-text mb-[.5rem] 2xl:text-body"
                            >
                              {name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-text text-captionSmall 2xl:text-caption">
                              {description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-10" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <Disclosure as="div" className="-mx-3">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                              Product
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-2 space-y-2">
                              {[...products, ...callsToAction].map(item => (
                                <Disclosure.Button
                                  key={item.name}
                                  as="a"
                                  href={item.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-body font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  {item.name}
                                </Disclosure.Button>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                    <div className="py-6">
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </nav>

          <div className="flex flex-shrink-0 justify-center lg:flex-1">
            <Logo />
          </div>

          <div className="flex flex-1 justify-end">
            {/* {isUserLogged ? (
              <Link href="/profile" type="button" className="flex  mr-2">
                <button type="button" className="flex items-center text-text">
                  <Login width={22} stroke="#000" fill="transparent" />
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="flex items-center text-text mr-2"
                onClick={() => dispatch(handleShowLoginModal())}
              >
                <Login width={22} stroke="#000" fill="transparent" />
              </button>
            )} */}

            {query.admin === process.env.NEXT_PUBLIC_ADMIN_SECRET &&
              !isUserLogged && (
                <button
                  type="button"
                  className="flex items-center text-text mr-2"
                  onClick={() => dispatch(handleShowLoginModal())}
                >
                  <Login width={22} stroke="#000" fill="transparent" />
                </button>
              )}

            {isUserLogged && (
              <button
                type="button"
                className="flex items-center text-text mr-2"
                onClick={() => dispatch(handleLogout())}
              >
                LOGOUT
              </button>
            )}

            <button type="button" className="flex items-center justify-end ">
              <Basket width={25} fill="#000" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
