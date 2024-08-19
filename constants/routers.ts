export const root = "/";

export const publicRoutes = {
  about: `/about`,
  contact: `/contact`,
  whyus: `/why-us`,
  privacy: `/privacy`,
  reviews: `/reviews`,
  terms: `/terms`,
};

export const routes = [
  { route: "/lineart-editor", productId: 0 },
  { route: "/skymap-editor", productId: 1 },
  { route: "/map-editor", productId: 2 },
];

export const popularWallartsRoot = "/popular-wallarts";

const profileRoot = "/profile";

export const productRoutes = {
  LINEART: "/product/lineart",
  STARMAP: "/product/starmap",
  STREETMAP: "/product/streetmap",
  ZODIAC: "/product/zodiac",
};

export const profileRoutes = {
  profile: profileRoot,
  projects: `${profileRoot}/projects`,
};
