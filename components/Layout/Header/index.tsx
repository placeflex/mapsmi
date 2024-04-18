import { useState, Fragment, useRef, useEffect } from "react";
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
import { handleShowLoginModal, handleOpenCartPanel } from "@/redux/modals";
import { handleLogout } from "@/redux/user";
import { handleGetCart } from "@/redux/cart";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/redux/store";

// routes
import { popularWallartsRoot } from "@/constants/routers";

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

const designs = [
  {
    title: "Featured",
    links: [
      {
        title: "On Sale Posters",
        link: `${popularWallartsRoot}?featured=on_sale`,
      },
      {
        title: "New Arrivals",
        link: `${popularWallartsRoot}?featured=new_arrivals`,
      },
      {
        title: "Staff Picks",
        link: `${popularWallartsRoot}?featured=staff_picks`,
      },
      {
        title: "Bundles",
        link: `${popularWallartsRoot}?featured=bundles`,
      },
    ],
  },
  {
    title: "Product Type",
    links: [
      {
        title: "Star Maps",
        link: `${popularWallartsRoot}?product_type=star_maps`,
      },
      {
        title: "Street Maps",
        link: `${popularWallartsRoot}?product_type=street_maps`,
      },
      {
        title: "Custom Maps",
        link: `${popularWallartsRoot}?product_type=custom_maps`,
      },
      {
        title: "Line Art",
        link: `${popularWallartsRoot}?product_type=line_art`,
      },
      {
        title: "Cat Art",
        link: `${popularWallartsRoot}?product_type=cat_art`,
      },
      {
        title: "Flowers Art",
        link: `${popularWallartsRoot}?product_type=flowers_art`,
      },
    ],
  },
  {
    title: "Orientation",
    links: [
      {
        title: "Landscape Posters",
        link: `${popularWallartsRoot}?orientation=landscape`,
      },
      {
        title: "Portrait Posters",
        link: `${popularWallartsRoot}?orientation=portrait`,
      },
    ],
  },
  {
    title: "Categories",
    links: [
      {
        title: "Family",
        link: `${popularWallartsRoot}?design_category=family`,
      },
      {
        title: "Travel",
        link: `${popularWallartsRoot}?design_category=travel`,
      },
      {
        title: "Astrology",
        link: `${popularWallartsRoot}?design_category=astrology`,
      },
      {
        title: "Life Events",
        link: `${popularWallartsRoot}?design_category=life_events`,
      },
      {
        title: "Sports",
        link: `${popularWallartsRoot}?design_category=sports`,
      },
      {
        title: "Couples",
        link: `${popularWallartsRoot}?design_category=couples`,
      },
      {
        title: "Places",
        link: `${popularWallartsRoot}?design_category=places`,
      },
      {
        title: "History",
        link: `${popularWallartsRoot}?design_category=history`,
      },
      {
        title: "Landmarks",
        link: `${popularWallartsRoot}?design_category=landmarks`,
      },
      {
        title: "Nature",
        link: `${popularWallartsRoot}?design_category=nature`,
      },
      {
        title: "Design Ideas",
        link: `${popularWallartsRoot}?design_category=design_ideas`,
      },
    ],
  },
  {
    title: "Cities",
    links: [
      {
        title: "Ukraine Posters",
        link: `${popularWallartsRoot}?cities=ukraine_posters`,
      },
      {
        title: "Kiev Posters",
        link: `${popularWallartsRoot}?cities=kiev_posters`,
      },
      {
        title: "Lviv Posters",
        link: `${popularWallartsRoot}?cities=lviv_posters`,
      },
      {
        title: "Amsterdam Posters",
        link: `${popularWallartsRoot}?cities=amsterdam_posters`,
      },
      {
        title: "Barcelona Posters",
        link: `${popularWallartsRoot}?cities=barcelona_posters`,
      },
      {
        title: "Boston Posters",
        link: `${popularWallartsRoot}?cities=boston_posters`,
      },
      {
        title: "Chicago Posters",
        link: `${popularWallartsRoot}?cities=chicago_posters`,
      },
      {
        title: "Dubai Posters",
        link: `${popularWallartsRoot}?cities=dubai_posters`,
      },
      {
        title: "Las Vegas Posters",
        link: `${popularWallartsRoot}?cities=las_vegas_posters`,
      },
      {
        title: "London Posters",
        link: `${popularWallartsRoot}?cities=london_posters`,
      },
      {
        title: "New York City Posters",
        link: `${popularWallartsRoot}?cities=new_york_city_posters`,
      },
      {
        title: "Rome Posters",
        link: `${popularWallartsRoot}?cities=rome_posters`,
      },
      {
        title: "Tokyo Posters",
        link: `${popularWallartsRoot}?cities=tokyo_posters`,
      },
      {
        title: "Venice Posters",
        link: `${popularWallartsRoot}?cities=venice_posters`,
      },
      {
        title: "Washington DC Posters",
        link: `${popularWallartsRoot}?cities=washington_dc_posters`,
      },
    ],
  },
];

export const Header = ({ isFixed }: any) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isUserLogged = useTypedSelector(({ user }) => user.isAdmin);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useTypedSelector(({ cart }) => cart.cart);

  useEffect(() => {
    dispatch(handleGetCart());
  }, []);

  const openCartPanel = () => {
    dispatch(handleOpenCartPanel());
  };

  return (
    <header
      className={classNames(
        "flex px-[2rem] py-[1.5rem] w-full z-10 bg-primary/[.9]",
        isFixed ? "sticky top-0" : "relative"
      )}
    >
      <Container>
        <div className="flex">
          <nav className="flex flex-1 gap-[2rem]">
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
              {isMenuOpen && (
                <div className="fixed top-[6.2rem] left-0 right-0 bottom-0 z-[-2] bg-text/[.7]"></div>
              )}

              <Popover>
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
                    <div className="py-[2rem] px-[2rem]">
                      <Container>
                        <div className="flex gap-[2rem]">
                          {products.map(
                            ({ name, image, description, href }) => (
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
                            )
                          )}
                        </div>
                      </Container>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Popover.Group className="hidden lg:flex lg:items-center lg:gap-x-12">
              <Popover className="">
                <Popover.Button className="flex items-center gap-x-1 text-caption text-text">
                  Designs
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
                    <div className="py-[2rem] px-[2rem]">
                      <Container>
                        <div className="flex gap-[2rem]">
                          {designs.map(({ title, links }, idx) => {
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
                                          <span className="block text-captionSmall text-text mb-[1rem]">
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
                      </Container>
                      {/* {products.map(({ name, image, description, href }) => (
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
                      ))} */}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            {/* MOBILE VERSION */}
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
                              {[...products].map(item => (
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

            {/* {query.admin === process.env.NEXT_PUBLIC_ADMIN_SECRET &&
              !isUserLogged && (
                <button
                  type="button"
                  className="flex items-center text-text mr-2"
                  onClick={() => dispatch(handleShowLoginModal())}
                >
                  <Login width={22} stroke="#000" fill="transparent" />
                </button>
              )} */}

            {isUserLogged && (
              <button
                type="button"
                className="flex items-center text-text mr-2"
                onClick={() => dispatch(handleLogout())}
              >
                LOGOUT
              </button>
            )}

            <button
              type="button"
              className="flex items-center justify-end"
              onClick={() => openCartPanel()}
            >
              <Basket width={25} fill="#000" />

              <span className="text-text ml-2">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
