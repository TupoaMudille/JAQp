import React, { useState, useEffect } from "react";
import QuestionContent from "./QuestionContent";

import { AddQuestion } from "../http/questionApi";
import { DeleteQuestion } from "../http/questionApi";
import { GetQuestion } from "../http/questionApi";
import "../css/navquestions.css";
import { GetQuestions } from "../http/quizApi";

function Tabs({quizId }) {
  const [active, setActive] = useState(1);
  const [qlist, setqlist] = useState(
  []);

  useEffect(() => {  GetQuestions(quizId)
    .then((res) => {
      setqlist(res.data.questions);
    })
    .catch((error) => {
      console.error("Error fetching quiz data:", error);
    })
}, [])
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const updatedTabs = await Promise.all(
          qlist.map(async (question, index) => {
            const res = await GetQuestion(question); // Передача id вопроса в функцию GetQuestion
            return {
              ...question,
              ...res.data, // Добавление данных из запроса в объект вопроса
              label: `Вопрос ${index + 1}`,
            };
          })
        );

        setTabs(updatedTabs); // Установка обновленного состояния
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuestions();
  }, [qlist]);

  const [visibleTabs, setVisibleTabs] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const navWidth = document.querySelector("body").clientWidth - 300;
  const tabWidth = 130;
  const maxVisibleTabs = Math.floor(navWidth / tabWidth);

  const calculateVisibleTabs = () => {
    const navWidth = document.querySelector(".card.tabs").clientWidth - 300;
    const tabWidth = 130;
    const maxVisibleTabs = Math.floor(navWidth / tabWidth);
    setVisibleTabs(tabs.slice(startIndex, startIndex + maxVisibleTabs));
  };

  useEffect(() => {
    calculateVisibleTabs();
    window.addEventListener("resize", calculateVisibleTabs);
    return () => window.removeEventListener("resize", calculateVisibleTabs);
  }, [tabs, startIndex]);

  const openTab = (e) => {
    const dataIndex = +e.target.dataset.index;
    setActive(dataIndex === -1 ? -1 : dataIndex + 1);
  };

  const addTab = () => {
    AddQuestion(localStorage.getItem("token"), quizId)
      .then((res) => {
        const newTabs = [...tabs, res.data].map((tab, index) => ({
          ...tab,
          label: `Вопрос ${index +1}`,
        }));
        setTabs(newTabs);
        setActive(newTabs.length);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  const handleDeleteQuestion = (idQuestion) => {
    const activeTabIndex = tabs.findIndex((tab, i) => tab[i] === active);
    DeleteQuestion(localStorage.getItem("token"), idQuestion)
      .then((res) => {
        if (res.status === 200) {
          const updatedTabs = tabs.filter((tab) => tab.id !== idQuestion);
          const newTabs = updatedTabs.map((tab, index) => ({
            ...tab,
            label: `Вопрос ${index + 1}`,
          }));
          setTabs(newTabs);

          if (active === activeTabIndex + 1) {
            setActive(null);
          } else if (active > activeTabIndex + 1) {
            setActive(active - 1);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }; 

  const handleChangedQuestion = (data) => {
    for(var i =0; i< tabs.length; i++)
    {
      if (tabs[i].id == data.id) {
        tabs[i].description = data.description;
        tabs[i].image = data.image;
        return;   
      }
    }
  };

  const handleNext = () => {
    if (startIndex + maxVisibleTabs < tabs.length) {
      setStartIndex(startIndex + maxVisibleTabs);
    } else {
      const remainingTabs = tabs.length - startIndex;
      setStartIndex(startIndex + Math.min(maxVisibleTabs, remainingTabs));
    }
  };

  const handlePrev = () => {
    const newStartIndex = Math.max(0, startIndex - maxVisibleTabs);
    setStartIndex(newStartIndex);
  };

  return (
    <div className="tabs-container">
      <div class="container" style={{ border: "none", width: "100%" }}>
        <div class="card tabs">
          {startIndex > 0 && (
            <>
              <input type="radio" class="tab tab-selector" />
              <label
                class="tab tab-primary"
                onClick={handlePrev}
                style={{ background: "#063f6a" }}
              >
                {"<"}
              </label>
            </>
          )}
          {visibleTabs.map((tab, i) => (
            <button key={startIndex + i}>
              <input type="radio" class="tab tab-selector" />
              <label
                class="tab tab-primary"
                className={`tablinks ${
                  startIndex + i + 1 === active ? "active" : ""
                }`}
                onClick={openTab}
                data-index={startIndex + i}
                key={`label` + startIndex + i}
              >
                {tab.label}
              </label>
            </button>
          ))}
          <>
            <input type="radio" class="tab tab-selector" />
            <label
              class="tab tab-primary"
              onClick={addTab}
              style={{ background: "#063f6a" }}
            >
              + Добавить вопрос
            </label>
          </>
          {startIndex + maxVisibleTabs < tabs.length && (
            <>
              <input type="radio" class="tab tab-selector" />
              <label
                class="tab tab-primary"
                onClick={handleNext}
                style={{ background: "#063f6a" }}
              >
                {">"}
              </label>
            </>
          )}
        </div>
      </div>
      {active !== null && active !== -1 && (
        <QuestionContent
          {...tabs[active - 1]}
          onDeleteQuestion={handleDeleteQuestion}
          onChangedQuestion={handleChangedQuestion}
        />
      )}
    </div>
  );
}

export default Tabs;
