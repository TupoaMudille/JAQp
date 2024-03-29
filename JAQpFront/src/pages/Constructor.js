import React, { useState } from "react";
import Media from "react-media";
import Menu from "../components/Menu";
import CatError from "../components/Constructor";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
  const [state, setState] = useState(false);
  const changeState = () => {
    setState(!state);
  };

  const [nav, setNav] = useState(false);
  const showNav = () => {
    setNav(!nav);
  };
  return (
    <div
      className="window"
      style={{ backgroundImage: "url(img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="kworkspace">
        <Media query="(max-width: 979px)">
          {(matches) =>
            matches ? (
              <CatError />
            ) : (
              <div>
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
                <div className="quizwind">
                  {nav ? <div className="nav">*5<li>Динамический список</li></div> : null}
                  <div className="quizspace"><div style={{margin:"68px"}}>asdsad</div></div>
                </div>
              </div>
            )
          }
        </Media>
      </div>
    </div>
  );
}

export default Constructor;
