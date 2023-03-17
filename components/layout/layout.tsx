import { Fragment } from "react";
import PageHeader from "./page-header";
import Menu from "./menu";
import classes from './layout.module.css';

function Layout(props) {
  return (
    <div className={classes.layout}>
      <PageHeader />
      {/**Left-hand menu w/ position: fixed to left */}
      <div className={classes.pageLayout}>
        <Menu />
        <main>{props.children}</main>
      </div>
      
    </div>
  );
}

export default Layout;