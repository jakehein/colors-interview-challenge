export type Color = {
  id: number,
  name: string,
  hex: string,
}

export type GroupedColors = {
  colors: Color[];
  page: number;
}