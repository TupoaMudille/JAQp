


function Main() {
  return (
    <div className="App" style={{ backgroundImage: 'url(img/background.svg)' }}>
      {console.log(localStorage.getItem("token"))}
      <div>text</div>
    </div>
  );
}

export default Main;