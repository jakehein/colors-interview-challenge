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
  console.log(allColors)

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
    let randomOffset = Math.floor(Math.random() * 21) - 10;
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

    if (rShade === r && gShade === g && bShade === b) {
      //the color hasn't changed, run it again 
      //(ex: white can't get any more white)
      i--;
      continue;
    }

    shades.push({
      name: `Shade of ${color.name}`, 
      hex: `#${rShade.toString(16)}${gShade.toString(16)}${bShade.toString(16)}`,
    });
  }

  return shades;
}
