import { IColor, IColorBase, GroupedColors } from "../public/common";

export async function getAllColors(): Promise<IColor[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/colors.json`
    );
  const data = await response.json();

  const colors: IColor[] = [];
  
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

export async function getRandomColor(): Promise<IColor> {
  const allColors = await getAllColors();
  const max = 100;
  const random = Math.floor(Math.random() * max);
  return allColors[random];
}

export async function getColorByName(name: string): Promise<IColor> {
  const allColors = await getAllColors();

  const color = allColors.find((color) => color.name.toLocaleLowerCase() === name.toLocaleLowerCase());

  if (!color) {
    return null;
  }

  return color;
}

export async function getColorByHexCode(hex: string): Promise<IColor> {
  const allColors = await getAllColors();

  const color = allColors.find((color) => color.hex.toLocaleLowerCase() === hex.toLocaleLowerCase());

  if (!color) {
    return null;
  }

  return color;
}

export async function getColorById(id: string): Promise<IColor> {
  const allColors = await getAllColors();

  const color = allColors.find((color) => color.id === id);

  if (!color) {
    return null;
  }

  return color;
}

export async function getShadesOfColor(color: IColor): Promise<IColorBase[]> {
  const r = parseInt(color.hex.slice(1, 3), 16);
  const g = parseInt(color.hex.slice(3, 5), 16);
  const b = parseInt(color.hex.slice(5, 7), 16);
  const rgbMax = 255;
  const rgbMin = 0;
  let rShade = 0;
  let gShade = 0;
  let bShade = 0;
  const shades: IColorBase[] = [];

  for (let i = 0; i < 5; i++) {
    // generate a random number between -10 and 10
    let randomOffset = Math.floor(Math.random() * 151) - 75;
    // add offset to each rgb val, keeping in range of 0-255
    if (randomOffset === 0) {
      randomOffset = 1;
    }
    if (randomOffset > 0) {
      rShade = Math.min(r + randomOffset, rgbMax);
      gShade = Math.min(g + randomOffset, rgbMax);
      bShade = Math.min(b + randomOffset, rgbMax);
    } else {
      rShade = Math.max(r + randomOffset, rgbMin);
      gShade = Math.max(g + randomOffset, rgbMin);
      bShade = Math.max(b + randomOffset, rgbMin);
    }

    //get the last 2 chars of the shade: adds leading 0 if needed
    const rShadeHex = ('0' + rShade.toString(16)).slice(-2);
    const gShadeHex = ('0' + gShade.toString(16)).slice(-2);
    const bShadeHex = ('0' + bShade.toString(16)).slice(-2);

    if (
      rShade === r && gShade === g && bShade === b ||
      shades.find((color) => color.hex === `#${rShadeHex}${gShadeHex}${bShadeHex}`.toLocaleUpperCase())
      ) {
      // No repeating colors
      i--;
      continue;
    }

    shades.push({
      name: `Shade of ${color.name}`, 
      hex: `#${rShadeHex}${gShadeHex}${bShadeHex}`.toLocaleUpperCase(),
    });
  }

  return shades;
}
