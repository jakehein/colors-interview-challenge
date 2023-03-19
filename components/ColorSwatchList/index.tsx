import { useState } from 'react';
import { GroupedColors, Tile } from '../../public/common';
import ColorSwatch from '../ColorSwatch';
import classes from './color-swatch-list.module.css';
import Link from 'next/link';

function ColorSwatchList(props: {groupedColors: GroupedColors, activePage: number}) {
  const [groupedColors, setGroupedColors] = useState(props.groupedColors);
  const colorGroup = props.groupedColors;
  const activePage = props.activePage;

  return (
    <div>
      <div className={classes.swatches} style={activePage !== colorGroup.page ? { display: 'none'} : {}}>
        { 
          groupedColors.colors.map(
            (color) => 
              <Link key={color.id} className={classes.swatchDetailsLink} href={`/details/${color.id}`}>
                <ColorSwatch color={color} tile={Tile.Details_list_tile}/>
              </Link>
          )
        }
      </div>
    </div>
  )
}

export default ColorSwatchList;
