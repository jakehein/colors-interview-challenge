import Image from "next/image";
import classes from "./page-header.module.css";
import Hsvg from '../../public/logo-symbol.svg';
import { KeyboardEvent, useRef } from "react";
import Router from "next/router";
import { IColor } from "../../public/common";
import { getColorByHexCode, getColorById, getColorByName } from "../../helpers/api-util";

function PageHeader(props) {
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
        alert("That's not a color we have here! Sorry, try again");
        return;
      }
      Router.push(`/details/${color.id}`);
    }
  }


  return (
    <header className={classes.header}>
      <div>
        <Image 
          className={classes.logo} 
          src={Hsvg} 
          alt="Helpful Human logo" 
          width={52} 
          height={52} 
        />
      </div>
      <div >
        <input type="search" placeholder="Search" ref={searchRef} onKeyDown={onKeyDownHandler} className={classes.search}/>
      </div>
    </header>
  );
}

export default PageHeader;
