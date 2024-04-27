import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FileInput from "./FileInput";
import "../css/tabcontent.css";
import trashIcon from "../icons/trashCan.svg";

function TabContent({ initialAnswers, label, description, image }) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [inittitle, setTitle] = useState(label);
  const [initdescription, setDescription] = useState(description);
  const [initimage, setImage] = useState(image);

  useEffect(() => {
    setAnswers(initialAnswers);
    setDescription(description);
    setTitle(label);
    setImage(image);
  }, [initialAnswers, description, label, image]);

  const { handleSubmit } = useForm();
  const onSubmit = () => {};

  const callback = (initimage) => {
    setImage(initimage);
  };

  const handleImageChange = (event, answerId) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === answerId ? { ...answer, image: event.target.value } : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleDescriptionChange = (event, answerId) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === answerId
        ? { ...answer, description: event.target.value }
        : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleCheckboxChange = (event, answerId) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === answerId
        ? { ...answer, isCorr: event.target.checked }
        : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleDescriptionQChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeleteAnswer = (answerId) => {
    const updatedAnswers = answers.filter((answer) => answer.id !== answerId);
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      id: Date.now(),
      label: "",
      image: null,
      description: "",
      isCorr: false,
    };
    setAnswers(
      answers.length === 0 || !answers ? [newAnswer] : [...answers, newAnswer]
    );
  };

  return (
    <div className="content_tab_statebar">
      <div>
        <div
          style={{
            marginBottom: "36px",
            background: "white",
            padding: "14px",
            marginTop: "14px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          <p className="h2" style={{ float: "right" }}>
            {inittitle}
          </p>
          <button
            type="button"
            className="main_buttondelstate"
            style={{ marginLeft: "60%" }}
          >
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ width: "24px", height: "24px" }}
              className="trashIcon"
            >
              <use xlinkHref={trashIcon + "#trashCan"} />
            </svg>
            Удалить вопрос
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="content_tab_whitecardwithspace">
            <div style={{ display: "flex", paddingTop: "14px" }}>
              <div style={{ display: "flex", paddingLeft: "14px" }}>
                <FileInput callback={callback} />
              </div>
              <div>
                <div>
                  <p
                    className="bold_text"
                    style={{ float: "left", paddingLeft: "14px" }}
                  >
                    Содержимое вопроса
                  </p>
                </div>
                <div className="content_tab_evenly_distributed_field">
                  <textarea
                    className="content_tab_custominput"
                    value={initdescription}
                    onChange={handleDescriptionQChange}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleAddAnswer}
              type="button"
              className="content_tab_button_add"
            >
              <span className="plus">+</span>
              Добавить ответ
            </button>
            <div className="content_answer_block">
              {answers &&
                answers.map((answer) => (
                  <div key={answer.id}>
                    <input
                      type="file"
                      value={answer.image}
                      onChange={(e) => handleImageChange(e, answer.id)}
                    />
                    <div>
                      <div>
                        <div>
                          <p
                            className="bold_text"
                            style={{ float: "left", paddingLeft: "14px" }}
                          >
                            Содержимое ответа
                          </p>
                        </div>
                        <div className="content_tab_evenly_distributed_field">
                          <textarea
                            className="content_tab_custominput"
                            value={initdescription}
                            onChange={handleDescriptionQChange}
                          />
                        </div>
                      </div>
                      <label>
                        <input
                          type="checkbox"
                          checked={answer.isCorr}
                          onChange={(e) => handleCheckboxChange(e, answer.id)}
                        />
                        Correct answer
                      </label>
                      <button
                        onClick={() => handleDeleteAnswer(answer.id)}
                        type="button"
                      >
                        <svg
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          style={{ width: "24px", height: "24px" }}
                          className="trashIcon"
                        >
                          <use xlinkHref={trashIcon + "#trashCan"} />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button className="content_tab_button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default TabContent;
