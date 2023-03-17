import Link from "next/link";
import classes from './menu.module.css';

function Menu() {
  
  function onClickHandler() {

  }

  // return (
  //   <header className={classes.header}>
  //     <div>
  //       <Image 
  //         className={classes.logo} 
  //         src={Hsvg} 
  //         alt="Helpful Human logo" 
  //         width={52} 
  //         height={52} 
  //       />
  //     </div>
  //     <div >
  //       <input type="search" placeholder="Search" className={classes.search}/>
  //     </div>
  //   </header>
  // );

  return (
    <div className={classes.menu}>
      <button className={classes.randomColor} onClick={onClickHandler}>Random Color</button>
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