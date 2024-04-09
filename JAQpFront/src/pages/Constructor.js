import React, { useEffect, useState } from "react";
import Media from "react-media";
import Menu from "../components/Menu";
import ListNav from "../components/ListNav";
import AddQuestion from "../components/AddQuestion";
import FileInput from "../components/FileInput";
import CatError from "../components/Constructor";
import ToolsMenu from "../components/ToolsMenu";
import StateBar from "../components/StateBar";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
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
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },

    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
  ];

  const quizitems = [
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
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },

    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
    {
      id: 4,
      name: "aSubrahmanyan Chandrasekhar",
    },
  ];

  const [nav, setNav] = useState(false);
  const [state, setState] = useState(false);
  const [image, setImage] = useState();

  const changeState = () => {
    setState(!state);
  };

  const showNav = () => {
    setNav(!nav);
  };

  const callback = (image) => {

    setImage(image);
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
                    <img src="img/konstructortoolsmenu.svg" className="icon"></img>
                    <p className="const_text">Конструктор</p>
                  </div>
                  <button className="menubutton">Новый тест</button>
                  <button className="menubutton" onClick={changeState}>
                    {!state ? "Опубликовать" : "Скрыть"}
                  </button>
                  <button className="menubutton">Готово</button>
                </div>
                <div className="space">
                  {nav ? (
                    <div className="nav">
                      <ListNav arrtest={testitems} />
                    </div>
                  ) : null}
                  <div className="quizspace">
                    <div
                      className="statebar"
                      style={{ backgroundImage: `url(${image})`}}
                    >
                      <div className="stateblock">
                        <div className="statestring">
                          <div className="light_bold_text">Название:</div>
                          <input className="custominputstate"></input>
                        </div>
                        <div className="statestring">
                          <div className="light_bold_text">Тема:</div>
                          <input className="custominputstate"></input>
                        </div>
                        <div className="statestring">
                          <div className="light_bold_text">Описание:</div>
                          <textarea
                            className="custominputstate"
                            style={{ height: "68px" }}
                          ></textarea>
                        </div>
                      </div>
                      <div className="stateblock">
                        <div className="statestring" style={{width:"fit-content"}}>
                          <FileInput callback={callback} />
                        </div>
                      </div>
                      <div className="stateblock" style={{ width: "20%" }}>
                        <div className="statestring">
                          <div className="light_bold_text">
                            Количество вопросов:
                          </div>
                          <div className="light_bold_text">
                            {quizitems.length}
                          </div>
                        </div>
                        <div className="statestring">
                          <div className="light_bold_text">Статус:</div>
                          <div className="light_bold_text">
                            {state ? "Опубликован" : "Скрыт"}
                          </div>
                        </div>
                        <div className="buttondelstate">Удалить тест</div>
                      </div>
                    </div>

                    <div className="quiz">
                      <AddQuestion arrquiz={quizitems} />
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
