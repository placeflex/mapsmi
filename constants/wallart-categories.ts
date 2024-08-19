// routes
import { popularWallartsRoot, productRoutes } from "@/constants/routers";

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

export const design_category = [
  { label: "Family", value: "family" },
  { label: "Travel", value: "travel" },
  { label: "Astrology", value: "astrology" },
  { label: "Life Events", value: "life_events" },
  { label: "Sports", value: "sports" },
  { label: "Couples", value: "couples" },
  { label: "Places", value: "places" },
  { label: "History", value: "history" },
  { label: "Landmarks", value: "landmarks" },
  { label: "Nature", value: "nature" },
  { label: "Design Ideas", value: "design_ideas" },
];

export const cities = [
  { label: "Ukraine Posters", value: "ukraine_posters" },
  { label: "Kiev Posters", value: "kiev_posters" },
  { label: "Lviv Posters", value: "lviv_posters" },
  { label: "Amsterdam Posters", value: "amsterdam_posters" },
  { label: "Barcelona Posters", value: "barcelona_posters" },
  { label: "Boston Posters", value: "boston_posters" },
  { label: "Chicago Posters", value: "chicago_posters" },
  { label: "Dubai Posters", value: "dubai_posters" },
  { label: "Las Vegas Posters", value: "las_vegas_posters" },
  { label: "London Posters", value: "london_posters" },
  { label: "New York City Posters", value: "new_york_city_posters" },
  { label: "Rome Posters", value: "rome_posters" },
  { label: "Tokyo Posters", value: "tokyo_posters" },
  { label: "Venice Posters", value: "venice_posters" },
  { label: "Washington DC Posters", value: "washington_dc_posters" },
];

export const design_type = [
  { label: "Anniversary", value: "anniversary" },
  { label: "Baseball", value: "baseball" },
  { label: "Basketball", value: "basketball" },
  { label: "Birthday", value: "birthday" },
  { label: "Cycling", value: "cycling" },
  { label: "Falling In Love", value: "falling_in_love" },
  { label: "Football", value: "football" },
  { label: "Formula 1", value: "furmula1" },
  { label: "Graduation", value: "graduation" },
  { label: "NASCAR", value: "nascar" },
  { label: "National Park", value: "national_park" },
  { label: "Natural Wonders", value: "natural_wonders" },
  { label: "Newborn", value: "newborn" },
  { label: "Running", value: "running" },
  { label: "Soccer", value: "soccer" },
  { label: "Triathlon", value: "triathlon" },
  { label: "Wedding", value: "wedding" },
  { label: "Zodiac", value: "zodiac" },
  { label: "City", value: "city" },
  { label: "Island", value: "island" },
  { label: "River", value: "river" },
  { label: "Neighborhood", value: "neighborhood" },
  { label: "Archaeological Sities", value: "archaeological_sities" },
  { label: "IndyCar", value: "indy_car" },
  { label: "Motorcycling", value: "motorcycling" },
  { label: "Hiking", value: "hiking" },
  { label: "Mountain", value: "mountain" },
];

export const gift = [
  { label: "Gifts for Athletes", value: "athletes" },
  { label: "Gifts for Couples", value: "couples" },
  { label: "Gifts for Dad", value: "dad" },
  { label: "Gifts for Family", value: "family" },
  { label: "Gifts for Frequent Travelers", value: "frequent_travelers" },
  { label: "Gifts for Friends", value: "friends" },
  { label: "Gifts for Grads", value: "grads" },
  { label: "Gifts for Grandparents", value: "grandparents" },
  { label: "Gifts for Her", value: "her" },
  { label: "Gifts for Him", value: "him" },
  { label: "Gifts for Husband", value: "husband" },
  { label: "Gifts for Kids", value: "kids" },
  { label: "Gifts for Mom", value: "mom" },
  {
    label: "Gifts for Nature & Outdoor Lovers",
    value: "nature_outdoor_lovers",
  },
  { label: "Gifts for Newborns", value: "newborns" },
  { label: "Gifts for Newlyweds", value: "newlyweds" },
  { label: "Gifts for Sports Fans", value: "sports_fans" },
  { label: "Gifts for Students", value: "students" },
  { label: "Gifts for Wife", value: "wife" },
  { label: "Gifts for Anniversaries", value: "anniversaries" },
  { label: "Gifts for Birthdays", value: "birthdays" },
];

export const product_type = [
  { label: "Star Maps", value: "star_maps" },
  { label: "Street Maps", value: "street_maps" },
  { label: "Custom Maps", value: "custom_maps" },
  { label: "Line Art", value: "line_art" },
  { label: "Cat Art", value: "cat_art" },
  { label: "Flowers Art", value: "flowers_art" },
];

export const orientation = [
  { label: "Landscape", value: "landscape" },
  { label: "Portrait", value: "portrait" },
];

export const featured = [
  { label: "On Sale", value: "on_sale" },
  { label: "New Arrivals", value: "new_arrivals" },
  { label: "Staff Picks", value: "staff_picks" },
  { label: "Bundles", value: "bundles" },
];

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

export const ALL_OUT_PRODUCTS = [
  {
    title: "Star Map",
    link: productRoutes.STARMAP,
  },
  {
    title: "Street Map",
    link: productRoutes.STREETMAP,
  },
  {
    title: "Line Art",
    link: productRoutes.LINEART,
  },
  {
    title: "Zodiac Art",
    link: productRoutes.ZODIAC,
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

export const ALL_POSTER_TYPES = [
  {
    title: "All Our Products",
    links: ALL_OUT_PRODUCTS,
  },
];

export const GIFTS = [];
