import { useAppContext } from "../../context/state";
import { getAllColors, getColorById } from "../../helpers/api-util";
import { IColor } from "../../public/common";

function ColorDetailPage(props: { color: IColor }) {
  return (
    <div>
      <span> Color </span>
      <span>{props.color.hex}</span>
    </div>
  );
}

export default ColorDetailPage;

export async function getStaticProps(context) {
  const {params} = context;
  const {id} = params;

  const color = await getColorById(id);

  return {
    props: {
      color: color,
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