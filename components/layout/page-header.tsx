import Image from "next/image";
import classes from "./page-header.module.css";
import Hsvg from '../../public/logo-symbol.svg';
import { KeyboardEvent, useRef } from "react";
import Router from "next/router";
import { IColor } from "../../public/common";
import { getColorByHexCode, getColorById, getColorByName } from "../../helpers/api-util";

function PageHeader() {
  const searchRef = useRef<HTMLInputElement>();

  async function onKeyDownHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const searchText = searchRef.current.value;
      let color: IColor;
      
      if (searchText.includes('#')) {
        color = await getColorByHexCode(searchText);
      } else if (parseInt(searchText)) {
        color = await getColorById(searchText);
      } else {
        color = await getColorByName(searchText);
      }
      if (!color) {
        alert("That's not one of the 100 colors we have stored.\n\n" +
          "Try entering a color's id (0-99), the name of a stored color (i.e. Beige), " +
          "or a stored hexcode (i.e. #F5F5DC)!");
        return;
      }
      Router.push(`/details/${color.id}`);
    }
  }

  function onClickHelpfulHumanHandler() {
    if (Router.pathname !== '/') {
      Router.push('/');
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.imageContainer} onClick={onClickHelpfulHumanHandler}>
        <Image 
          className={classes.logo} 
          src={Hsvg} 
          alt="Helpful Human logo" 
          width={52} 
          height={52} 
        />
      </div>
      <div>
        <input type="search" placeholder="Search" ref={searchRef} onKeyDown={onKeyDownHandler} className={classes.search}/>
      </div>
    </header>
  );
}

export default PageHeader;
