export const routes = [
  { route: "/lineart-editor", productId: 0 },
  { route: "/skymap-editor", productId: 1 },
  { route: "/map-editor", productId: 2 },
];

const profileRoot = "/profile";

export const profileRoutes = {
  profile: profileRoot,
  projects: `${profileRoot}/projects`,
};
