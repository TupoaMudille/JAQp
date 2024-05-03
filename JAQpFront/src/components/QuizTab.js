import React, { useState, useEffect } from "react";

import "../css/font.css";
import "../css/quiztab.css";

import emptyQuizIcon from "../icons/emptyQuiz.svg";

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
    // {89272744019 филатов дмитирий георгиевич наркушка}
    <div className="quiz_space">
      <div className="card" style={{ background:"#E3E7F2" }}>
        <span  alt="" className="card__img" style={{objectFit:"contain", padding:"14px", width:"90%", height:"90%"}}/>
        <span className="card__footer" style={{background:"none", backdropFilter:"none"}}>
          
          <div class="control" style={{marginLeft:"-100%", alignItems:"center"}}>
            <button class="addButton"onClick={() => addQuiz()}>
              + Новый квиз
            </button>
          </div>
        </span>
      </div>
      {listItems}
    </div>
  );
}

export default QuizTab;
