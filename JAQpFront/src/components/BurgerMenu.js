import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import menuIcon from "../icons/menu.svg";
import searchIcon from "../icons/search.svg";
import crossIcon from "../icons/cross.svg";

import "../css/burgermenu.css";

function BurgerMenu() {
  /* navigate */
  const navigate = useNavigate();
  const gotoUserSettingsPage = () => navigate("/settingsId=?");
  const gotoConstructorPage = () => navigate("/constructor");
  const gotoLoginPage = () => navigate("/login");

  /* setterts */
  const [show, setShow] = useState(false);

  /* visual */
  const showMenu = () => {
    setShow(!show);
  };

  return (
    <div className="burger_menu_container" style={{ background: "white" }}>
      <div className="burger_menu_block">
        <div className="burger_menu_evenly_distributed_block">
          <img className="burger_menu_button_icon_small" src={searchIcon} alt=""></img>
        </div>
        <div className="burger_menu_evenly_distributed_block">
          <p className="burger_menu_logo_name">JAQp</p>
        </div>
        <div className="burger_menu_evenly_distributed_block" onClick={showMenu}>
          {show ? (
            <img className="burger_menu_button_icon_small" src={crossIcon} alt=""></img>
          ) : (
            <img className="burger_menu_button_icon_small" src={menuIcon} alt=""></img>
          )}
        </div>
      </div>

      <div className={`burger_menu_items ${show ? "is_open" : ""}`}>
        <ul>
          <li>
            <div>
              <li>Случайный</li>
            </div>
          </li>
          <li>
            <div>
              <li>Квизы</li>
            </div>
          </li>
          <li>
            <div>
              <li>Лучшее</li>
            </div>
          </li>
          <li>
            <div
              onClick={
                localStorage.getItem("token") === null ||
                localStorage.getItem("token") === undefined
                  ? gotoLoginPage
                  : gotoConstructorPage
              }
            >
              <li>Конструктор</li>
            </div>
          </li>
          <li>
            <div
              onClick={
                localStorage.getItem("token") === null ||
                localStorage.getItem("token") === undefined
                  ? gotoLoginPage
                  : gotoUserSettingsPage
              }
            >
              <li>Профиль</li>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
