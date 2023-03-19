import classes from './color-swatch-page.module.css';

function ColorSwatchPage(props: {page: number, pageUpdateHandler: Function, activePage: number}) {
  const page = props.page;
  const pageUpdateHandler = props.pageUpdateHandler;
  const activePage = props.activePage;

  function onClickHandler() {
    pageUpdateHandler(page);
  }

  return (
    <div className={classes.page}
    style={activePage === page ? {borderBottom: '2px solid black'} : {}}
     onClick={onClickHandler}>{page + 1}</div>
  );
}

export default ColorSwatchPage;