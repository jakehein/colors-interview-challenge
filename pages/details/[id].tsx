import Router from "next/router";
import ColorSwatch from "../../components/ColorSwatch";
import { getAllColors, getColorById, getShadesOfColor } from "../../helpers/api-util";
import { IColor, IColorBase } from "../../public/common";
import classes from './color-detail-page.module.css'

function ColorDetailPage(props: { color: IColor, shades: IColorBase[] }) {
  function clearHandler() {
    Router.push('/');
  }

  return (
    <div>
      <div className={classes.swatchContainer}>
        <ColorSwatch isTile={false} color={props.color} />
      </div>

      {/** need to add 5 shades here */}

      <div className={classes.swatchShadeContainer}>
        {props.shades.map((shade) => <ColorSwatch isTile={true} color={shade} />)}
      </div>

      <div className={classes.clearContainer}>
        <div className={classes.clear}>
          <button onClick={clearHandler}>Clear</button>
        </div>
      </div>
      
      
      {/* <span> Color </span>
      <span>{props.color.hex}</span> */}
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