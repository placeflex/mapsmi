import { ArtworkStyleInterface } from "@/layouts/wallartSettings/wallartStyles";

import {
  SizeInterface,
  OrientationsInterface,
} from "@/layouts/wallartAttributes";

export interface PosterStyles {
  artwork?: number;
  color?: number;
  layoutStyle?: ArtworkStyleInterface;
  font?: any;
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
  locationsDropdown?: Object;
  locations?: {};
  editingProfileProject?: boolean;
}
