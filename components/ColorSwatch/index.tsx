import { IColorBase } from "../../public/common";
import classes from './color-swatch.module.css';

function ColorSwatch(props: {color: IColorBase, isTile: boolean, currentDetailsHandler: Function }) {
  // const backgroundColor = props.color.hex;
  // const colorName = props.color.name;
  const color = props.color;
  const isTile = props.isTile;
  const currentDetailsHandler = props.currentDetailsHandler;

  function toDetailsHandler() {
    currentDetailsHandler(color);
  }
  // do i need another event for handling if a user selects a shade??
  return (
    <div className={isTile ? classes.colorSwatchTileContainer : classes.colorSwatchContainer}
    onClick={isTile ? toDetailsHandler : ()=>{}}>
      <div className={isTile ? classes.colorSwatchTile : classes.colorSwatch} 
        style={{
          backgroundColor: color.hex,
        }}/ >
      <div onClick={toDetailsHandler} className={isTile ? classes.colorInfoTile : classes.colorInfo}>
        <span>{color.hex}</span>
        { isTile ? '' : <span>{color.name}</span> }
      </div>
    </div>
  );
}

export default ColorSwatch;