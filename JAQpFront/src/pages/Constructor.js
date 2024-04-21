import React, { useEffect, useState } from "react";
import Media from "react-media";
import Menu from "../components/Menu";
import ListNav from "../components/ListNav";
import CatError from "../components/Constructor";
import Tabs from "../components/Tabs";
import MainTab from "../components/MainTab";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
  //from server
  const quizList = [
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
  const questionList = [
    {
      id:"1",
      title: "London",
      description: "London is the capital city of England.",
      image: null,
    },
    {
      id:"2",
      title: "Paris",
      description: "Paris is the capital of France.",
      image: null,
    },
    {
      id:"3",
      title: "Tokyo",
      description: "Tokyo is the capital of Japan.",
      image: null,
    },
  ];

  //from server
  const options = [
    { value: "tag1", label: "Тег 1" },
    { value: "tag2", label: "Тег 2" },
    { value: "tag3", label: "Тег 3" },
  ];

  //from server
  const quizData = {
    title: `Некоторое название`,
    description: `Некоторое описание`,
    tags: ["tag2", "tag1"],
    state: true,
  };

  const [tabs, setTabs] = useState(false);
  const [mainTab, setMainTab] = useState(false);
  const [arrtest, setArrTest] = useState(quizList);
  const showTabs = (e) => {
    if (!tabs) {
      setMainTab(false);
      setTabs(!tabs);
      const buttons = document.querySelectorAll([".navbutton",".menubutton"]);

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");
    }
  };

  const showMainTab = (e) => {
    if (!mainTab) {
      setTabs(false);
      setMainTab(!mainTab);
      const buttons = document.querySelectorAll([".navbutton",".menubutton"]);

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });

      e.currentTarget.classList.add("selected");
    }
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
                  <div className="logo_block">
                    <img
                      src="img/konstructortoolsmenu.svg"
                      
                      style={{ width: "36px", justifyContent:"center", alignItems:"center", marginLeft:"auto", marginRight:"auto" }}
                    ></img>
                  </div>
                  <div>
                    <button className="menubutton">Мои тесты</button>
                  </div>
                </div>
                <div className="space">
                  {/* {nav ? (
                    <div className="nav">
                      <ListNav
                        arrtest={arrtest}
                        onDeleteItem={handleDeleteItem}
                      />
                    </div>
                  ) : null} */}
                  <div className="nav">
                    <div className="navbutton" onClick={showMainTab}>
                      <img
                        src="img/konstructortoolsmenu.svg"
                        className="icon"
                      ></img>
                      <p>О квизе</p>
                    </div>
                    <div className="navbutton" onClick={showTabs}>
                      <img
                        src="img/konstructortoolsmenu.svg"
                        className="icon"
                      ></img>
                      <p>Вопросы</p>
                    </div>
                    <div className="navbutton">
                      <img
                        src="img/konstructortoolsmenu.svg"
                        className="icon"
                      ></img>
                      <p>Аналитика</p>
                    </div>
                    <div className="navbutton">
                      <img
                        src="img/konstructortoolsmenu.svg"
                        className="icon"
                      ></img>
                      <p>Интеграция</p>
                    </div>
                    <button
                      className="buttondelstate"
                      style={{ width: "100px" }}
                    >
                      Удалить тест
                    </button>
                  </div>
                  <div className="quizspace">
                    <div>
                      {tabs ? (
                        <Tabs
                          questionList={questionList}
                          quizTitle={quizData.title}
                        />
                      ) : null}
                    </div>
                    {mainTab ? (
                      <MainTab
                        quizData={quizData}
                        options={options}
                        countQuestions={questionList.length}
                      />
                    ) : null}
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
