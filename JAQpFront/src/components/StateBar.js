function StateBar({ state }) {
  return (
    <div className="statebar">
      <div className="stateblock">
        <div className="statestring">
          <div className="bold_text">Название:</div>
          <input className="custominputstate"></input>
        </div>
        <div className="statestring">
          <div className="bold_text">Тема:</div>
          <input className="custominputstate"></input>
        </div>
        <div className="statestring">
          <div className="bold_text">Описание:</div>
          <textarea
            className="custominputstate"
            style={{ height: "68px" }}
          ></textarea>
        </div>
      </div>
      <div className="stateblock">
        <div className="statestring">
          <div className="bold_text">Количество вопросов:</div>
          <div className="bold_text">Название:</div>
        </div>
        <div className="statestring">
          <div className="bold_text">Статус:</div>
          <div className="bold_text">{state ? "Опубликован" : "Скрыт"}</div>
        </div>
        <div className="buttondelstate">Удалить тест</div>
      </div>
    </div>
  );
}

export default StateBar;
