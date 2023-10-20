export interface SizeInterface {
  name: string;
  id: number;
}

export const sizes = [
  { name: "30x40cm", id: 0 },
  { name: "50x70cm", id: 1 },
  { name: "70x100cm", id: 2 },
];

export interface OrientationsInterface {
  name: string;
  id: number;
}

export const orientations = [
  { name: "Portrait", id: 0 },
  { name: "Landscape", id: 1 },
];
