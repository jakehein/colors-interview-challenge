import Link from "next/link";
import classes from './menu-list-item.module.css'

function MenuListItem(props: { href: string; label: string; }) {
  const href = props.href;
  const label = props.label;
  
  return (
    <li className={classes.colorPresets}>
      <Link href={href}>{label}</Link>
    </li>
  );
}

export default MenuListItem;