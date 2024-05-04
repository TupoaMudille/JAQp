import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { EditQuestionWOImage } from "../http/questionApi";

import FileInput from "./FileInput";
import "../css/tabcontent.css";
import trashIcon from "../icons/trashCan.svg";

function TabContent({
  initialAnswers,
  label,
  description,
  image,
  id,
  onDeleteQuestion,
  onChangedQuestion,
}) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [inittitle, setTitle] = useState(label);
  const [initdescription, setDescription] = useState(description);
  const [initimage, setImage] = useState(image);
  const [initId, setInitId] = useState(id);

  useEffect(() => {
    setAnswers(initialAnswers);
    setDescription(description);
    setTitle(label);
    setImage(image);
    setInitId(id);
  }, [initialAnswers, description, label, image, id]);

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    true
      ? EditQuestionWOImage(
          localStorage.getItem("token"),
          initId,
          initdescription != null ? initdescription : ""
        )
          .then((res) => {
            onChangedQuestion(res.data);
          })
          .catch((error) => {
            console.error("Error fetching quiz data:", error);
          })
      : console.log();
    //  EditQuiz(
    //     localStorage.getItem("token"),
    //     idQuiz,
    //     tags,
    //     sanitizedDescription,
    //     sanitizedTitle,
    //     file,
    //     file.name
    //   )
    //     .then((res) => {
    //       onChangeTest(res.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching quiz data:", error);
    //     });
  };

  const callback = (initimage) => {
    setImage(initimage);
  };

  const handleDeleteQuestion = () => {
    onDeleteQuestion(id);
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
    setDescription(event);
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
          onClick={handleDeleteQuestion}
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="content_tab_whitecardwithspace">
          <div style={{ paddingTop: "14px", height: "100%" }}>
            <FileInput callback={callback} />
          </div>
          <div
            className="main_tab_evenly_distributed_field"
            style={{ marginTop: "44px", width: "100%" }}
          >
            <div class="omrs-input-group" style={{ marginTop: "-28px" }}>
              <label class="omrs-input-filled">
                <textarea
                  required
                  value={initdescription ? initdescription : ""}
                  defaultValue={initdescription != null ? initdescription : ""}
                  onChange={(e) => handleDescriptionQChange(e.target.value)}
                  style={{ maxHeight: "260px" }}
                />
                <span class="omrs-input-label">Содержимое вопроса</span>
              </label>
            </div>
          </div>
          <button className="content_tab_button" type="submit">
            Сохранить вопрос
          </button>
        </div>
        <div className="content_tab_whitecardwithspace">
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
      </form>
    </div>
  );
}

export default TabContent;
