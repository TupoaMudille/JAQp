import React, { useState, useEffect } from "react";

import { GetOwnedByMe } from "../http/quizApi";
import { DeleteQuiz } from "../http/quizApi";
import { GetQuestions } from "../http/quizApi";
import { GetAllTags } from "../http/tagApi";

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


  /* setterts */
  const [prefQuizList, setprefQuizList] = useState([]);
  const [prefoptions, setPrefOptions] = useState([]);
  const [prefoquestions, setPrefQuestions] = useState([]);

  const [idQuiz, setIdQuiz] = useState();

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
  useEffect(() => {
    GetAllTags()
      .then((res) => {
        setPrefOptions(res.data.tagList);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, []);

  useEffect(() => {
    if (true) {
      GetQuestions(idQuiz)
        .then((res) => {
          setQuestionList(res.data.questions);
        })
        .catch((error) => {
          console.error("Error fetching quiz data:", error);
        });
    }
  }, [idQuiz]);

  const [tabs, setTabs] = useState(false);
  const [mainTab, setMainTab] = useState(false);
  const [quizTab, setQuizTab] = useState(true);
  const [initialAnswers, setQuestionList] = useState(prefoquestions);
  const [quizData, setQuizData] = useState();

  const handleAddTest = (newQuiz) => {
    GetOwnedByMe(localStorage.getItem("token"))
      .then((res) => {
        setprefQuizList(res.data.quizDataList);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
    setMainTab(true);
    setQuizTab(false);
    setTabs(false);
    setQuizData(newQuiz);
    setIdQuiz(newQuiz.id);
  };

  const handleChangeTest = (newQuiz) => {
    GetOwnedByMe(localStorage.getItem("token"))
      .then((res) => {
        setprefQuizList(res.data.quizDataList);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  const handleChangeStatus = (updatedStatusQuiz) => {
    setQuizData(updatedStatusQuiz);
  };

  const handleDeleteQuiz = (idQuiz) => {
    DeleteQuiz(localStorage.getItem("token"), idQuiz)
      .then((res) => {
        if (res.status == 200) {
          GetOwnedByMe(localStorage.getItem("token"))
            .then((res) => {
              setprefQuizList(res.data.quizDataList);
            })
            .catch((error) => {
              console.error("Error fetching quiz data:", error);
            });
          setIdQuiz(null);
          setQuizData(null);
          setprefQuizList([]);
          setMainTab(false);
          setQuizTab(true);
          setTabs(false);
        } else console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  /* visual */
  const showTabs = (e) => {
    if (quizData != null) {
      if (!tabs) {
        setMainTab(false);
        setQuizTab(false);
        setTabs(!tabs);
        const buttons = document.querySelectorAll([
          ".navbutton",
          ".menubutton",
        ]);
        buttons.forEach((button) => {
          button.classList.remove("selected");
        });
      }
    }
  };

  const showMainTab = (e) => {
    if (quizData != null) {
      if (!mainTab) {
        setTabs(false);
        setQuizTab(false);
        setMainTab(!mainTab);
        const buttons = document.querySelectorAll([
          ".navbutton",
          ".menubutton",
        ]);

        buttons.forEach((button) => {
          button.classList.remove("selected");
        });
      }
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
  const handleSelectId = (openedQuiz) => {
    if (openedQuiz) {
      setMainTab(true);
      setQuizTab(false);
      setTabs(false);
      setQuizData(openedQuiz);
      setIdQuiz(openedQuiz.id);
    }
  };

  return (
    <div className="window" style={{ background: "#EDEDED" }}>
      <div>
        <Menu />
      </div>
      <div className="constructor_workspace">
        <div>
          <div className="space">
            <nav id="navbar">
              <ul class="navbar-items flexbox-col">
                <li
                  class="navbar-logo flexbox-left"
                  className={`navbutton ${quizTab ? "selected" : ""}`}
                  onClick={showQuizTab}
                >
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
                    <span class="link-text">Мои квизы</span>
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
                <QuizTab
                  arrtest={prefQuizList}
                  onSelectId={handleSelectId}
                  onAddTest={handleAddTest}
                />
              ) : null}
              {tabs ? (
                <Tabs
                  quizTitle={quizData.title}
                  questionList={initialAnswers}
                  quizId={idQuiz}
                />
              ) : null}
              {mainTab ? (
                <MainTab
                  quizData={quizData}
                  options={prefoptions}
                  onChangeTest={handleChangeTest}
                  countQuestions={quizData.questions ? quizData.length : 0}
                  onChangeStatus={handleChangeStatus}
                  onDeleteQuiz={handleDeleteQuiz}
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
