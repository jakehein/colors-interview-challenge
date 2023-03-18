import { useState } from 'react';
import { GroupedColors } from '../../public/common';

function ColorSwatchList(props: {groupedColors: GroupedColors, activePage: number}) {
  const [groupedColors, setGroupedColors] = useState(props.groupedColors);
  const colorGroup = props.groupedColors;
  const activePage = props.activePage;

  return (
    <div>
      <ul style={activePage !== colorGroup.page ? { display: 'none'} : {}}>
        { 
          groupedColors.colors.map(
            (color) => 
              <li key={color.id}>
                {color.name} : {color.hex}
              </li>
          )
        }
      </ul>
    </div>
  )
}

export default ColorSwatchList;
