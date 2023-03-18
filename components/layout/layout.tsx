import { Fragment } from "react";
import PageHeader from "./page-header";
import Menu from "./menu/menu";
import classes from './layout.module.css';

function Layout(props) {
  return (
    <div className={classes.layout}>
      <PageHeader />
      <div className={classes.pageLayout}>
        <Menu />
        <main>{props.children}</main>
      </div>
      
    </div>
  );
}

export default Layout;