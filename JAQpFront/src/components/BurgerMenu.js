import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../css/burgermenu.css";
function BurgerMenu() {
  const navigate = useNavigate();
  const gotoUserSettingsPage = () => navigate("/settingsId=?");

  const [show, setShow] = useState(false);
  const showMenu = () => {
    setShow(!show);
  };

  return (
    <div className="menucontainer" style={{ background: "white" }}>
      <div className="bblock">
        <div className="bevenly_distributed_block">
          <img className="bbutton_icon_small" src="img/Search.svg"></img>
        </div>
        <div className="bevenly_distributed_block">
          <p className="logo_name">JAQp</p>
        </div>
        <div className="bevenly_distributed_block" onClick={showMenu}>
          {show ? (
            <img className="bbutton_icon_small" src="img/cross.svg"></img>
          ) : (
            <img className="bbutton_icon_small" src="img/Menu.svg"></img>
          )}
        </div>
      </div>
      {show ? (<div>
        <div className="bitemblock">
          <div className="belement_block">
            <p className="bsimple_text">Случайный тест</p>
          </div>
        </div>
        <div className="bitemblock">
          <div className="belement_block">
            <p className="bsimple_text">Тесты</p>
          </div>
        </div>
        <div className="bitemblock">
          <div className="belement_block">
            <p className="bsimple_text">Лучшее</p>
          </div>
        </div>
        <div className="bitemblock">
          <div className="belement_block">
            <p className="bsimple_text">Профиль</p>
          </div>
        </div>
      </div>):null}
    </div>
  );
}

export default BurgerMenu;
