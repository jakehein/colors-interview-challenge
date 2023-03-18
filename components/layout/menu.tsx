import Link from "next/link";
import classes from './menu.module.css';
import { getRandomColor } from "../../helpers/api-util";
import Router from "next/router";

function Menu() {
  
  async function onClickHandler() {
    const randomColor = await getRandomColor();

    Router.push(`/details/${randomColor.id}`);
  }

  return (
    <div className={classes.menu}>
      <div className={classes.randomColorContainer}>
        <button className={classes.randomColor} onClick={onClickHandler}>
          Random Color
        </button>
      </div>
      
      <ul className={classes.colorPresets}>
        <li>
          <Link href={'/details/65'}>Red</Link>
        </li>
        <li>
          <Link href={'/details/58'}>Orange</Link>
        </li>
        <li>
          <Link href={'/details/92'}>Yellow</Link>
        </li>
        <li>
          <Link href={'/details/35'}>Green</Link>
        </li>
        <li>
          <Link href={'/details/8'}>Blue</Link>
        </li>
        <li>
          <Link href={'/details/63'}>Purple</Link>
        </li>
        <li>
          <Link href={'/details/10'}>Brown</Link>
        </li>
        <li>
          <Link href={'/details/34'}>Gray</Link>
        </li>
      </ul>
    </div>


  );
}

export default Menu;