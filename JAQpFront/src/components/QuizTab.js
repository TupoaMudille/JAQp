import React, { useState, useEffect } from "react";

import "../css/font.css";
import "../css/quiztab.css";

const emptyImage =
  "https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0OTY1ODM&ixlib=rb-1.2.1&q=80";

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
    onAddTest(); // Call the function to add a new test
  };

  const listItems = arrtest.map((testname) => (
    <div key={testname.id} onClick={() => handleSelectId(testname.id)}>
      <div className="card">
        <img
          src={testname.img ? testname.img : emptyImage}
          alt=""
          className="card__img"
        />
        <span className="card__footer">
          <span>{testname.name}</span>
          <span>За 2 минуты!</span>
        </span>
      </div>
    </div>
  ));

  return (
    <div className="quiz_space">
      <>
        <div className="card">
          <img src={emptyImage} alt="" className="card__img" />
          <span className="card__footer">
            <span>Создай квиз</span>
            <span>За 2 минуты!</span>
          </span>
        </div>
        <>{listItems}</>
      </>

      {/* {showModal && (
        <div className="modal-background">
          <div className="confirmation-modal">
            <p>Вы уверены, что хотите удалить этот элемент?</p>
            <button>Да</button>
            <button onClick={handleCancelDelete}>Отмена</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default QuizTab;
