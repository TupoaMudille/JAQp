import React, { useState, useEffect } from "react";

import { GetOwnedByMe } from "../http/quizApi";

import Menu from "../components/Menu";
import Tabs from "../components/Tabs";
import MainTab from "../components/MainTab";
import QuizTab from "../components/QuizTab";

import infoIcon from "../icons/info.svg";
import questionsIcon from "../icons/questions.svg";
import analiticsIcon from "../icons/analitics.svg";
import integrationIcon from "../icons/integration.svg";

import "../css/font.css";
import "../css/constructor.css";

function Constructor() {
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
    { value: "medicine", label: "Медицина" },
    { value: "music", label: "Музыка" },
    { value: "history", label: "История" },
    { value: "science", label: "Наука" },
    { value: "psychology", label: "Психология" },
    { value: "travel", label: "Путешествия" },
    { value: "art", label: "Искусство" },
    { value: "technology", label: "Технологии" },
    { value: "education", label: "Образование" },
    { value: "literature", label: "Литература" },
    { value: "sports", label: "Спорт" },
    { value: "cinema", label: "Кино" },
    { value: "food", label: "Еда" },
    { value: "languages", label: "Языки" },
    { value: "animals", label: "Животные" },
    { value: "politics", label: "Политика" },
    { value: "religion", label: "Религия" },
    { value: "games", label: "Игры" },
    { value: "fashion", label: "Мода" },
    { value: "architecture", label: "Архитектура" },
    { value: "gardening", label: "Садоводство" },
    { value: "business", label: "Бизнес" },
    { value: "cars", label: "Автомобили" },
    { value: "writing", label: "Писательство" },
    { value: "creativity", label: "Творчество" },
    { value: "dance", label: "Танцы" },
    { value: "photography", label: "Фотография" },
    { value: "environment", label: "Окружающая среда" },
  ];

  //from server
  const quizData = {
    title: `Некоторое название`,
    description: `Некоторое описание`,
    tags: ["music", "dance"],
    state: true,
    image: null,
  };

  /* setterts */
  const [prefQuizList, setprefQuizList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      GetOwnedByMe(token)
        .then((res) => {
          setprefQuizList(res.data.quizDataList);
        })
        .catch((error) => {
          console.error("Error fetching quiz data:", error);
        });
    } else {
      console.log("Token does not exist. Redirecting to login page...");
    }
  }, []);

  const [tabs, setTabs] = useState(false);
  const [mainTab, setMainTab] = useState(false);
  const [quizTab, setQuizTab] = useState(true);
  const [initialAnswers, setQuestionList] = useState(questionList);

  /* visual */
  const showTabs = (e) => {
    if (!tabs) {
      setMainTab(false);
      setQuizTab(false);
      setTabs(!tabs);
      const buttons = document.querySelectorAll([".navbutton", ".menubutton"]);
      buttons.forEach((button) => {
        button.classList.remove("selected");
      });
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
    }
  };

  /* form */
  const handleSelectId = (id) => {
    console.log(id);
    if (id) {
      /* здесь загрузить нужные данные для открытия вкладок */
      setMainTab(true);
      setQuizTab(false);
      setTabs(false);
    }
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
          {/* <div className="toolsmenu">
            <div className="logo_block">
              <img
                alt=""
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
              <button
                className={`menubutton ${quizTab ? "selected" : ""}`}
                onClick={showQuizTab}
              >
                Мои квизы
              </button>
            </div>
          </div> */}
          <div className="space">
            {/* <div className="nav">
              <div
                className={`navbutton ${mainTab ? "selected" : ""}`}
                onClick={showMainTab}
              >
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px" }}
                  className="constructorIcon"
                >
                  <use xlinkHref={infoIcon + "#infoIcon"} />
                </svg>
                <p>О квизе</p>
              </div>
              <div
                className={`navbutton ${tabs ? "selected" : ""}`}
                onClick={showTabs}
              >
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "36px", height: "36px" }}
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
                  style={{ width: "36px", height: "36px" }}
                  className="constructorIcon"
                >
                  <use xlinkHref={integrationIcon + "#integrationIcon"} />
                </svg>
                <p>Интеграция</p>
              </div>
            </div> */}
            <nav id="navbar">
              <ul class="navbar-items flexbox-col">
                <li class="navbar-logo flexbox-left">
                  <a class="navbar-item-inner flexbox">
                    <img
                      alt=""
                      src="img/konstructortoolsmenu.svg"
                      style={{
                        width: "48px",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    ></img>
                  </a>
                </li>
                <li
                  class="navbar-item flexbox-left"
                  className={`navbutton ${mainTab ? "selected" : ""}`}
                  onClick={showMainTab}
                >
                  <a class="navbar-item-inner flexbox-left">
                    <div class="navbar-item-inner-icon-wrapper flexbox">
                      <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ width: "36px", height: "36px" }}
                        className="constructorIcon"
                      >
                        <use xlinkHref={infoIcon + "#infoIcon"} />
                      </svg>
                    </div>
                    <span class="link-text">О квизе</span>
                  </a>
                </li>
                <li
                  class="navbar-item flexbox-left"
                  className={`navbutton ${tabs ? "selected" : ""}`}
                  onClick={showTabs}
                >
                  <a class="navbar-item-inner flexbox-left">
                    <div class="navbar-item-inner-icon-wrapper flexbox">
                      <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ width: "28px", height: "28px" }}
                        className="constructorIcon"
                      >
                        <use xlinkHref={questionsIcon + "#questionsIcon"} />
                      </svg>
                    </div>
                    <span class="link-text">Вопросы</span>
                  </a>
                </li>
                <li
                  class="navbar-item flexbox-left"
                  className={`navbutton ${mainTab ? "selected" : ""}`}
                >
                  <a class="navbar-item-inner flexbox-left">
                    <div class="navbar-item-inner-icon-wrapper flexbox">
                      <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ width: "36px", height: "36px" }}
                        className="constructorIcon"
                      >
                        <use xlinkHref={analiticsIcon + "#analiticsIcon"} />
                      </svg>
                    </div>
                    <span class="link-text">Аналитика</span>
                  </a>
                </li>
                <li
                  class="navbar-item flexbox-left"
                  className={`navbutton ${mainTab ? "selected" : ""}`}
                >
                  <a class="navbar-item-inner flexbox-left">
                    <div class="navbar-item-inner-icon-wrapper flexbox">
                      <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ width: "36px", height: "36px" }}
                        className="constructorIcon"
                      >
                        <use xlinkHref={integrationIcon + "#integrationIcon"} />
                      </svg>
                    </div>
                    <span class="link-text">Интеграция</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div class="flexbox-col">
              {quizTab ? (
                <QuizTab arrtest={prefQuizList} onSelectId={handleSelectId} />
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
