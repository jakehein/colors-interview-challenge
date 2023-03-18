function ColorSwatchPage(props: {page: number, pageUpdateHandler: Function}) {
  const page = props.page;
  const pageUpdateHandler = props.pageUpdateHandler;

  function onClickHandler() {
    pageUpdateHandler(page);
  }

  return (
    <button onClick={onClickHandler}>{page}</button>
  );
}

export default ColorSwatchPage;