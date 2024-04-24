import React, { useState } from "react";
import Menu from "../components/Menu";
import Tabs from "../components/Tabs";
import MainTab from "../components/MainTab";
import QuizTab from "../components/QuizTab";

import constructorIcon from "../icons/constructor.svg";
import infoIcon from "../icons/info.svg";
import questionsIcon from "../icons/questions.svg";
import analiticsIcon from "../icons/analitics.svg";
import integrationIcon from "../icons/integration.svg";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
  //from server
  const quizList = [
    {
      id: 0,
      name: "Creola Katherine Johnson",
      description: "123",
      image: null,
    },
    {
      id: 1,
      name: "Mario José Molina-Pasquel Henríquez",
      description: "123",
      image: null,
    },
    {
      id: 2,
      name: "Mohammad Abdus Salam",
      description: "123",
      image: null,
    },
    {
      id: 3,
      name: "Percy Lavon Julian",
      description: "123",
      image: null,
    },
    {
      id: 4,
      name: "Subrahmanyan Chandrasekhar",
      description: "123",
      image: null,
    },
  ];

  //from server
  const questionList = [
    {
      id: "1",
      title: "London",
      description: "London is the capital city of England.",
      image: null,
      initialAnswers: [
        {
          id: "1",
          title: "djghjc 1",
          description: "aaaaa",
          image: null,
          isCorr: true,
        },
        {
          id: "2",
          title: "djghjc 2",
          description: "aaaaa",
          image: null,
          isCorr: false,
        },
      ],
    },
    {
      id: "2",
      title: "Paris",
      description: "Paris is the capital of France.",
      image: null,
      initialAnswers: [
        {
          id: "3",
          title: "ффффффф",
          description: "aafffaaa",
          image: null,
          isCorr: true,
        },
        {
          id: "4",
          title: "ффффффф",
          description: "aaaaa",
          image: null,
          isCorr: false,
        },
      ],
    },
    {
      id: "3",
      title: "Tokyo",
      description: "Tokyo is the capital of Japan.",
      image: null,
      initialAnswers: [],
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
    image: null,
  };

  const [tabs, setTabs] = useState(false);
  const [mainTab, setMainTab] = useState(false);
  const [quizTab, setQuizTab] = useState(false);
  const [arrtest, setQuizList] = useState(quizList);
  const [initialAnswers, setQuestionList] = useState(questionList);

  const showTabs = (e) => {
    if (!tabs) {
      setMainTab(false);
      setQuizTab(false);
      setTabs(!tabs);
      const buttons = document.querySelectorAll([".navbutton", ".menubutton"]);

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });
      e.currentTarget.classList.add("selected");
    }
  };

  const showMainTab = (e) => {
    if (!mainTab) {
      setTabs(false);
      setQuizTab(false);
      setMainTab(!mainTab);
      const buttons = document.querySelectorAll([".navbutton", ".menubutton"]);

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });

      e.currentTarget.classList.add("selected");
    }
  };

  const showQuizTab = (e) => {
    if (!quizTab) {
      setTabs(false);
      setMainTab(false);
      setQuizTab(!quizTab);
      const buttons = document.querySelectorAll([".navbutton", ".menubutton"]);

      buttons.forEach((button) => {
        button.classList.remove("selected");
      });

      e.currentTarget.classList.add("selected");
    }
  };

  const handleDeleteItem = (id) => {
    const newArrTest = arrtest.filter((item) => item.id !== id);
    setQuizList(newArrTest);
  };

  const handleAddTest = () => {
    const newTestId = Math.floor(Math.random() * 1000);

    const newTest = {
      id: newTestId,
      name: "Новый тест",
    };
    setQuizList([...arrtest, newTest]);
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
        <div>
          <div className="toolsmenu">
            <div className="logo_block">
              <img
                src="img/konstructortoolsmenu.svg"
                style={{
                  width: "48px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></img>
            </div>
            <div>
              <button className="menubutton" onClick={showQuizTab}>
                Мои квизы
              </button>
            </div>
          </div>
          <div className="space">
            <div className="nav">
              <div className="navbutton" onClick={showMainTab}>
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px" }}
                  className="constructorIcon"
                >
                  <use xlinkHref={infoIcon + "#infoIcon"} />
                </svg>
                <p>О квизе</p>
              </div>
              <div className="navbutton" onClick={showTabs}>
              <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px"}}
                  className="constructorIcon"
                >
                  <use xlinkHref={questionsIcon + "#questionsIcon"} />
                </svg>
                <p>Вопросы</p>
              </div>
              <div className="navbutton">
              <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px" }}
                  className="constructorIcon"
                >
                  <use xlinkHref={analiticsIcon + "#analiticsIcon"} />
                </svg>
                <p>Аналитика</p>
              </div>
              <div className="navbutton">
              <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px"}}
                  className="constructorIcon"
                >
                  <use xlinkHref={integrationIcon + "#integrationIcon"} />
                </svg>
                <p>Интеграция</p>
              </div>
            </div>
            <div className="quizspace">
              {quizTab ? (
                <QuizTab
                  arrtest={arrtest}
                  onDeleteItem={handleDeleteItem}
                  onAddTest={handleAddTest}
                />
              ) : null}
              {tabs ? (
                <Tabs
                  quizTitle={quizData.title}
                  questionList={initialAnswers}
                />
              ) : null}

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
      </div>
    </div>
  );
}

export default Constructor;
