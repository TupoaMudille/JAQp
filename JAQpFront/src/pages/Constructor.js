import React, { useEffect, useState } from "react";
import Media from "react-media";
import Menu from "../components/Menu";
import ListNav from "../components/ListNav";
import CatError from "../components/Constructor";
import Tabs from "../components/Tabs";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
  //from server
  const testitems = [
    {
      id: 0,
      name: "Creola Katherine Johnson",
    },
    {
      id: 1,
      name: "Mario José Molina-Pasquel Henríquez",
    },
    {
      id: 2,
      name: "Mohammad Abdus Salam",
    },
    {
      id: 3,
      name: "Percy Lavon Julian",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
  ];

  //from server
  const items = [
    { title: "London", content: "London is the capital city of England." },
    { title: "Paris", content: "Paris is the capital of France." },
    { title: "Tokyo", content: "Tokyo is the capital of Japan." },
  ];

  const [nav, setNav] = useState(false);
  const [arrtest, setArrTest] = useState(testitems)
  const showNav = () => {
    setNav(!nav);
  };

  const handleDeleteItem = (id) => {
    const newArrTest = arrtest.filter((item) => item.id !== id);
    setArrTest(newArrTest);
  };

  return (
    <div
      className="window"
      style={{ backgroundImage: "url(img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="constructor_workspace">
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
                      Мои тесты
                    </button>
                  </div>
                  <div className="logo_block">
                    <img
                      src="img/konstructortoolsmenu.svg"
                      className="icon"
                    ></img>
                    <p className="const_text">Конструктор</p>
                  </div>
                  <button className="menubutton">Новый тест</button>
                  <button className="menubutton">Готово</button>
                </div>
                <div className="space">
                  {nav ? (
                    <div className="nav">
                      <ListNav arrtest={arrtest} onDeleteItem={handleDeleteItem} />
                    </div>
                  ) : null}
                  <div className="quizspace">
                    <div>
                      <Tabs items={items} />
                    </div>
                  </div>
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
