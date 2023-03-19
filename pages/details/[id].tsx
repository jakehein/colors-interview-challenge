import Router from "next/router";
import ColorSwatch from "../../components/ColorSwatch";
import { getAllColors, getColorById, getShadesOfColor } from "../../helpers/api-util";
import { IColor, IColorBase, Tile } from "../../public/common";
import classes from './color-detail-page.module.css'
import { useEffect, useState } from "react";

function ColorDetailPage(props: { color: IColor, shades: IColorBase[] }) {
  const color = props.color;
  const [currentColorDetails, setCurrentColorDetails] = useState(color as IColorBase)

  useEffect(() => {
    setCurrentColorDetails(color)
  }, [color])

  function currentDetailsHandler(color: IColorBase) {
    setCurrentColorDetails(color)
  }

  function clearHandler() {
    Router.push('/');
  }

  return (
    <div>
      <div className={classes.swatchContainer}>
        <ColorSwatch tile={Tile.Details} color={currentColorDetails} />
      </div>

      <div className={classes.swatchShadeContainer}>
        {props.shades.map((shade) => <ColorSwatch tile={Tile.Shade_tile} key={shade.hex} currentDetailsHandler={currentDetailsHandler} color={shade} />)}
      </div>

      <div className={classes.clearContainer}>
        <div className={classes.clear}>
          <button onClick={clearHandler}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default ColorDetailPage;

export async function getStaticProps(context: {params: {id: string}}) {
  const {params} = context;
  const {id} = params;

  const color = await getColorById(id);

  const shades: IColorBase[] = await getShadesOfColor(color);

  return {
    props: {
      color: color,
      shades: shades,
    }
  }
}

export async function getStaticPaths() {
  const colors = await getAllColors();

  return {
    paths: colors.map((color: IColor) => ({params: {id: color.id}})),
    fallback: false,
  }
}