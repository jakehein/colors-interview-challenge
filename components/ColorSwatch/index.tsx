import { IColorBase, Tile } from "../../public/common";
import classes from './color-swatch.module.css';

function ColorSwatch(props: {color: IColorBase, tile: Tile, currentDetailsHandler?: Function }) {
  const color = props.color;
  const tile = props.tile;
  const currentDetailsHandler = props.currentDetailsHandler;
  let swatchStyle: {readonly [key: string]: string};
  switch (tile) {
    case Tile.Details:
      swatchStyle = {
        colorSwatchContainer: classes.colorSwatchContainer,
        colorSwatch: classes.colorSwatch,
        colorInfo: classes.colorInfo,
      }
    break;
    case Tile.Details_list_tile:
      swatchStyle = {
        colorSwatchContainer: classes.colorSwatchTileListContainer,
        colorSwatch: classes.colorSwatchTileList,
        colorInfo: classes.colorInfoTileList,
      }
    break;
    case Tile.Shade_tile:
      swatchStyle = {
        colorSwatchContainer: classes.colorSwatchTileShadeContainer,
        colorSwatch: classes.colorSwatchTileShade,
        colorInfo: classes.colorInfoTileShade,
      }
    break;
  }
  

  function toDetailsHandler() {
    currentDetailsHandler(color);
  }
  
  return (
    <div className={swatchStyle.colorSwatchContainer}
    onClick={tile === Tile.Shade_tile ? toDetailsHandler : ()=>{}}>
      <div className={swatchStyle.colorSwatch} 
        style={{
          backgroundColor: color.hex,
        }}/ >
      <div className={swatchStyle.colorInfo}>
        <span>{color.hex}</span>
        { tile !== Tile.Details ? '' : <span>{color.name}</span> }
      </div>
    </div>
  );
}

export default ColorSwatch;