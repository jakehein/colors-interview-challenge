import classes from './menu.module.css';
import { getRandomColor } from "../../../helpers/api-util";
import Router from "next/router";
import MenuList from "./menu-list";

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
      
      <MenuList />
    </div>
  );
}

export default Menu;