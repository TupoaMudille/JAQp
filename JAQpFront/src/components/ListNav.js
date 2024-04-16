import "../css/font.css";
import "../css/listnav.css";

import React, { useState, useEffect } from "react";

function ListNav({ arrtest, onDeleteItem }) {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (deleteItemId !== null) {
      setShowModal(true);
    }
  }, [deleteItemId]);

  const handleDelete = (id) => {
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    onDeleteItem(deleteItemId);
    setDeleteItemId(null);
    setShowModal(false);
    document.body.style.overflow = "";
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setShowModal(false);
    document.body.style.overflow = "";
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.parentNode.removeChild(overlay);
    }
  };

  const listItems = arrtest.map((testname) => (
    <li key={testname.id} className="listitem">
      {testname.name}
      <button onClick={() => handleDelete(testname.id)}>Удалить</button>
    </li>
  ));

  return (
    <div>
      {listItems.length !==   0 ? (
        <ul>{listItems}</ul>
      ) : (
        <p
          style={{
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "calc(50vh - 154px)",
            fontSize: "30px",
            color: "#849db1",
          }}
        >
          Пусто
        </p>
      )}
      {showModal && (
        <div className="modal-background">
          <div className="confirmation-modal">
            <p>Вы уверены, что хотите удалить этот элемент?</p>
            <button onClick={handleConfirmDelete}>Да</button>
            <button onClick={handleCancelDelete}>Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListNav;