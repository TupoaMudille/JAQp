import React, { useState } from "react";
function ToolsMenu({ callback}) {
  const [state, setState2] = useState();
  const changeState = () => {
    setState2(!state);
    handleCallback();
  };
  const [nav, setNav] = useState(false);
  const showNav = () => {
    setNav(!nav);
    handleCallback();
  };

  const handleCallback = () => callback(nav,state);
  return (
    <div className="toolsmenu">
      <div>
        <button
          className="menubutton"
          style={{ width: "400px" }}
          onClick={showNav}
        >
          Панель навигации
        </button>
      </div>
      <div className="logo_block">
        <img src="img/konstructor.svg" className="icon"></img>
        <p className="const_text">Конструктор</p>
      </div>
      <button className="menubutton">Новый тест</button>
      <button className="menubutton" onClick={changeState}>
        {state ? "Опубликовать" : "Скрыть"}
      </button>
      <button className="menubutton">Готово</button>
    </div>
  );
}

export default ToolsMenu;
