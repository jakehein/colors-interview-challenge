export interface IColorBase {
  name: string;
  hex: string;
}

export interface IColor extends IColorBase {
  id: string;
}

export type GroupedColors = {
  colors: IColor[];
  page: number;
}

export enum Tile {
  Details = 'DETAILS',
  Shade_tile = 'SHADE_TILE',
  Details_list_tile = 'DETAILS_LIST_TILE',
}