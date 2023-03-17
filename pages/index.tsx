import { Fragment } from 'react';
import ColorSwatchList from '../components/ColorSwatchList';
import { getAllColors, getGroupedColors } from '../helpers/api-util';
import { Color, GroupedColors } from '../public/common';

function HomePage(props: { colors: Color[]; groupedColors: GroupedColors[] }) {
  return <Fragment>
    <span>Welcome to Next.js!</span>
    {/* <ColorSwatchList colors={props.colors}></ColorSwatchList> */}
    <ul>
      {
        props.groupedColors ? props.groupedColors.map((color) => 
        <li key={color.page}>
          <h1>{color.page}</h1>
          <ColorSwatchList colors={color.colors}></ColorSwatchList>
        </li>) : <p>Loading...</p>
      }
    </ul>
    </Fragment>

}

export async function getStaticProps() {
  const colors = await getAllColors();
  const groupedColors = await getGroupedColors();

  return { props: { colors, groupedColors } };
};

export default HomePage