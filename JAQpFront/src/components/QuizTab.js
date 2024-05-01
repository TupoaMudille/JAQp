import React, { useState, useEffect } from "react";

import "../css/font.css";
import "../css/quiztab.css";

import emptyQuizIcon from "../icons/emptyQuiz.svg";
import newQuizIcon from "../icons/newQuiz.svg";

function QuizTab({ arrtest, onSelectId, onAddTest }) {
  /* setterts */
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [selectId, setSelectId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, [selectId]);

  // const handleDelete = (id) => {
  //   setDeleteItemId(id);
  // };

  const handleSelectId = (id) => {
    setSelectId(id);
    onSelectId(id);
  };

  const addQuiz = () => {};
  // const handleConfirmDelete = () => {
  //   onDeleteItem(deleteItemId);
  //   setDeleteItemId(null);
  //   setShowModal(false);
  //   document.body.style.overflow = "";
  //   const overlay = document.querySelector(".overlay");
  //   if (overlay) {
  //     overlay.parentNode.removeChild(overlay);
  //   }
  // };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setShowModal(false);
    document.body.style.overflow = "";
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }
  };

  const handleAddTest = () => {
    onAddTest();
  };

  const listItems = arrtest.map((testname) => (
    <div className="card">
      <img src={emptyQuizIcon} alt="" className="card__img" />
      <span className="card__footer">
      <div class="background"></div>
        <div className="quizname">{testname.name}</div>
        <p class="information">{testname.description}</p>
        <div class="control">
          <button class="btn" onClick={() => handleSelectId(testname.id)}>
            Редактировать
          </button>
        </div>
      </span>
    </div>
  ));

  return (
    <div className="quiz_space">
      <div className="card" style={{ boxShadow: "inset 0 0 0 3px #3a7999" }}>
        <img src={newQuizIcon} alt="" className="card__img" />
        <span className="card__footer">
        <div class="background"></div>
          <div class="quizname" style={{ color: "#031757" }}>
            Новый квиз
          </div>
          <p class="information" data-limit="100">
            Хотите проверить свои знания или поделиться интересными вопросами?
            Создайте свой собственный квиз!
          </p>
          <div class="control">
            <button class="btn" onClick={() => addQuiz()}>
              Создать
            </button>
          </div>
        </span>
      </div>
      {listItems}
    </div>
  );
}

export default QuizTab;
