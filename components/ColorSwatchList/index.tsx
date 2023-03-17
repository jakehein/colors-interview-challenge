import { useState } from 'react';
import { IColor } from '../../public/common';

function ColorSwatchList(props: {colors: IColor[]}) {
  const [colors, setColors] = useState(props.colors);
  
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/colors.json`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //             const transformedColors = [];
  //     for (const key in data) {
  //       transformedColors.push({id: key, name: data[key].name, hex: data[key].hex});
  //     }
  //     setColors(transformedColors);
  //   });
  // }, []);

  return (
    <ul>
      { 
        colors ? colors.map(
          (color) => 
            <li key={color.id}>
              {color.name} : {color.hex}
            </li>
        ) : <p>Loading...</p>
      }
    </ul>
  )
}

export default ColorSwatchList;
