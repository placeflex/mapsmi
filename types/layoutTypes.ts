import { ArtworkStyleInterface } from "@/modules/LineartSettings/artworkStylesList";
import {
  SizeInterface,
  OrientationsInterface,
} from "@/layouts/LayoutAttributes";

export interface PosterStyles {
  artwork?: number;
  palette?: number;
  theme?: ArtworkStyleInterface;
}

export interface PosterLables {
  heading?: string;
  divider?: string;
  subline?: string;
  tagline?: string;
}

interface Poster {
  labels?: PosterLables;
  styles?: PosterStyles;
}

interface SelectedAttributes {
  orientation?: OrientationsInterface;
  size?: SizeInterface;
}

export interface LayoutSettings {
  productId: number;
  poster?: Poster;
  selectedAttributes?: SelectedAttributes;
  date: string;
  locations?: Object;
  currentLocation?: Object;
}
