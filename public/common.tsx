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