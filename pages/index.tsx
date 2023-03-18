import { Fragment, useState } from 'react';
import ColorSwatchList from '../components/ColorSwatchList';
import { getAllColors, getGroupedColors } from '../helpers/api-util';
import { IColor, GroupedColors } from '../public/common';
import { useAppContext } from '../context/state';
import ColorSwatchPage from '../components/ColorSwatchList/color-swatch-page';

function HomePage(props: { colors: IColor[]; groupedColors: GroupedColors[] }) {
  const colors = props.colors;
  const groupedColors = props.groupedColors;
  const [ active, setActive ] = useState(groupedColors[0].page);
  const { cacheColors } = useAppContext();

  function pageGroupHandler(page: number) {
    setActive(page);
  }
  
  //cache our colors for use in the menu and header components
  cacheColors(colors);

  return <Fragment>
    <ul>
      {
        //List of tiles
        groupedColors.map((colorGroup) => 
        <li key={colorGroup.page}>
          <ColorSwatchList groupedColors={colorGroup} activePage={active} />
        </li>)
      }
    </ul>
    <ul>
      {
        //List of pages
        groupedColors.map((colorGroup) => 
        <li key={colorGroup.page}>
          <ColorSwatchPage page={colorGroup.page} pageUpdateHandler={pageGroupHandler} />
        </li>)
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