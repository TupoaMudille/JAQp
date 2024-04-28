import React, { useState, useEffect } from "react";
import QuestionContent from "./QuestionContent";

import "../css/navquestions.css";

function Tabs({ questionList }) {
  const [active, setActive] = React.useState(1);
  const [tabs, setTabs] = React.useState(
    questionList.map((question, index) => ({
      ...question,
      label: `Вопрос ${index + 1}`,
    }))
  );

  const [visibleTabs, setVisibleTabs] = React.useState([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const navWidth = document.querySelector("body").clientWidth-300;
  const tabWidth = 130;
  const maxVisibleTabs = Math.floor(navWidth / tabWidth);

  const calculateVisibleTabs = () => {
    const navWidth = document.querySelector(".card.tabs").clientWidth-300;
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
    const newItem = {
      label: `Вопрос ${tabs.length + 1}`,
      description: `Содержимое вопроса`,
      initialAnswers: [],
    };
    const newTabs = [...tabs, newItem].map((tab, index) => ({
      ...tab,
      label: `Вопрос ${index + 1}`,
    }));
    setTabs(newTabs);
    setActive(newTabs.length);
  };

  const deleteTab = (index) => {
    const updatedTabs = tabs.filter((tab, i) => i !== index);
    const newTabs = updatedTabs.map((tab, i) => ({
      ...tab,
      label: `Вопрос ${i + 1}`,
    }));
    setTabs(newTabs);
    if (active === index + 1) {
      setActive(null);
    } else if (active > index + 1) {
      setActive(active - 1);
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
              <input
                type="radio"
                class="tab tab-selector"
                
              />
              <label
                class="tab tab-primary"
                className={`tablinks ${
                  startIndex + i + 1 === active ? "active" : ""
                }`}
                onClick={openTab}
                data-index={startIndex + i}
                key={`label`+startIndex + i}
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
      {/* {<div className="navquestions">
        {startIndex > 0 && (
          <button onClick={handlePrev} className="prev-btn">
            {"<"}
          </button>
        )}
        {visibleTabs.map((tab, i) => (
          <div className="tab" key={startIndex + i}>
            <button
              className={`tablinks ${
                startIndex + i + 1 === active ? "active" : ""
              }`}
              onClick={openTab}
              data-index={startIndex + i}
            >
              {tab.label}
            </button>
            {<button
              onClick={() => deleteTab(startIndex + i)}
              className={`close-btn ${
                startIndex + i + 1 === active ? "active" : ""
              }`}
            >
              x
            </button> }
          </div>
        ))}

        <button onClick={addTab} className="add-btn">
          + Добавить вопрос
        </button>
        {startIndex + maxVisibleTabs < tabs.length && (
          <button onClick={handleNext} className="next-btn">
            {">"}
          </button>
        )}
      </div>} */}
      {active !== null && active !== -1 && (
        <QuestionContent {...tabs[active - 1]} />
      )}
    </div>
  );
}

export default Tabs;
