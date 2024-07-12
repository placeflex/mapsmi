// routes
import { popularWallartsRoot } from "@/constants/routers";

//
import terra from "@/public/mapColors/terra.png";
import metropolis from "@/public/mapColors/metropolis.png";
import horizon from "@/public/mapColors/horizon.png";
import example from "@/public/example.png";
import exampleTest from "@/public/example-test.png";
import LineArt from "@/public/lineart-example.png";

import streetmap from "@/public/wallart-preview/streetmap-preview-second.jpg";
import lineart from "@/public/wallart-preview/lineart-preview-second.jpg";
import starmap from "@/public/wallart-preview/starmap-preview-second.jpg";
import zodiac from "@/public/wallart-preview/zodiac-preview-second.jpg";

export const PRODUCTS = [
  {
    name: "Street Map",
    description: "Get a better understanding of your traffic",
    href: "#",
    image: streetmap,
  },
  {
    name: "Star Map",
    description: "Speak directly to your customers",
    href: "#",
    image: starmap,
  },
  {
    name: "LineArt",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    image: lineart,
  },
  {
    name: "Zodiac",
    description: "Connect with third-party tools",
    href: "#",
    image: zodiac,
  },
  // {
  //   name: "Coordinates",
  //   description: "Build strategic funnels that will convert",
  //   href: "#",
  //   image: example,
  // },
];

export const FEATUREDS = [
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
];

export const PRODUCT_TYPES = [
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
];

export const CATEGORIES = [
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
];

export const ORIENTATIONS = [
  {
    title: "Landscape Posters",
    link: `${popularWallartsRoot}?orientation=landscape`,
  },
  {
    title: "Portrait Posters",
    link: `${popularWallartsRoot}?orientation=portrait`,
  },
];

export const CITIES = [
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
];

export const DESIGNS = [
  {
    title: "Featured",
    links: FEATUREDS,
  },
  {
    title: "Product Type",
    links: PRODUCT_TYPES,
  },
  {
    title: "Orientation",
    links: ORIENTATIONS,
  },
  {
    title: "Categories",
    links: CATEGORIES,
  },
  {
    title: "Cities",
    links: CITIES,
  },
];
