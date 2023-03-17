import { Fragment } from 'react';
import ColorSwatchList from '../components/ColorSwatchList';
import { getAllColors, getGroupedColors } from '../helpers/api-util';
import { IColor, GroupedColors } from '../public/common';
import { useAppContext } from '../context/state';

function HomePage(props: { colors: IColor[]; groupedColors: GroupedColors[] }) {
  const { cacheColors } = useAppContext();

  //cache our colors for use in the menu and header components
  cacheColors(props.colors);

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