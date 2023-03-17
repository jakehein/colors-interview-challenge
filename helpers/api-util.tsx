import { Color, GroupedColors } from "../public/common";

export async function getAllColors(): Promise<Color[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/colors.json`
    );
  const data = await response.json();

  const colors: Color[] = [];
  
  for (const key in data) {
    colors.push(
      {
        id: key,
        ...data[key],
      });
  }

  return colors;
}

export async function getGroupedColors(): Promise<GroupedColors[]> {
  const allColors = await getAllColors();
  const groupedColors: GroupedColors[] = [];
  const maxPerPage = 12;
  let pageIndex = 0;

  allColors.forEach((color) => {
    let colorGroup = groupedColors.find((group) => group.page === pageIndex)
    if (!colorGroup) {
      groupedColors.push({colors: [color], page: pageIndex})
      colorGroup = groupedColors[pageIndex];
    } else {
      colorGroup.colors.push(color)
    }

    if (colorGroup.colors.length === maxPerPage) {
      pageIndex++;
    }
    
  });

  return groupedColors;
}

export async function getRandomColor(): Promise<Color> {
  const allColors = await getAllColors();
  const max = 100;
  const random = Math.floor(Math.random() * max);
  return allColors[random];
}

export async function getColorByName(name: string): Promise<Color> {
  const allColors = await getAllColors();

  const color = allColors.find((color) => color.name.toLocaleLowerCase() === name.toLocaleLowerCase());

  if (!color) {
    return null;
  }

  return color;
}

export async function getColorByHexCode(hex: string): Promise<Color> {
  const allColors = await getAllColors();

  const color = allColors.find((color) => color.hex.toLocaleLowerCase() === hex.toLocaleLowerCase());

  if (!color) {
    return null;
  }

  return color;
}
