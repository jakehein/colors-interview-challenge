import { IColorBase } from "../../public/common";
import classes from './color-swatch.module.css';

function ColorSwatch(props: {color: IColorBase, isTile: boolean }) {
  const backgroundColor = props.color.hex;
  const colorName = props.color.name;
  const isTile = props.isTile;
  // do i need another event for handling if a user selects a shade??
  return (
    <div className={isTile ? classes.colorSwatchTileContainer : classes.colorSwatchContainer}>
      <div className={isTile ? classes.colorSwatchTile : classes.colorSwatch} 
        style={{
          backgroundColor: backgroundColor
        }}/ >
      <div className={isTile ? classes.colorInfoTile : classes.colorInfo}>
        <span>{backgroundColor}</span>
        { isTile ? '' : <span>{colorName}</span> }
      </div>
    </div>
  );
}

export default ColorSwatch;