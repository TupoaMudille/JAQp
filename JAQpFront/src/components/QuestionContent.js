import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { EditQuestionWOImage, GetQuestion } from "../http/questionApi";
import { EditQuestion } from "../http/questionApi";

import { AddAnswer } from "../http/answerApi";
import { GetAnswer } from "../http/answerApi";
import { DeleteAnswer } from "../http/answerApi";

import FileInput from "./FileInput";
import "../css/tabcontent.css";
import trashIcon from "../icons/trashCan.svg";
import { toBeChecked } from "@testing-library/jest-dom/matchers";

function TabContent({
  answers,
  label,
  description,
  image,
  id,
  onDeleteQuestion,
  onChangedQuestion,
}) {
  const [initAnswers, setAnswers] = useState([]);

  const [inittitle, setTitle] = useState(label);
  const [initdescription, setDescription] = useState(description);
  const [initimage, setImage] = useState(image);
  const [initId, setInitId] = useState(id);

  const [isChangedImage, setIsChangedImage] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    setTitle(label);

    if (id !== undefined)
      GetQuestion(id).then((res) => {
        setAnswers(res.data.answers != undefined ? res.data.answers : []);
        setDescription(res.data.description);
        setImage(res.data.image);
        setInitId(id);
      });
  }, [answers, description, label, image, id]);

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    !isChangedImage
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
      : EditQuestion(
          localStorage.getItem("token"),
          initId,
          initdescription != null ? initdescription : "",
          file,
          file ? file.name : null
        )
          .then((res) => {
            onChangedQuestion(res.data);
          })
          .catch((error) => {
            console.error("Error fetching quiz data:", error);
          });
  };

  const callback = (image, file, fileVariant) => {
    setImage(image);
    setFile(file);
    setIsChangedImage(fileVariant);
  };

  const handleDeleteQuestion = () => {
    onDeleteQuestion(id);
  };

  const handleDescriptionQuestionChange = (event) => {
    setDescription(event);
  };
  /*--------------------------------------------------- */

  // const handleImageChange = (event, answerId) => {
  //   const updatedAnswers = initAnswers.map((answer) =>
  //     answer.id === answerId ? { ...answer, image: event.target.value } : answer
  //   );
  //   setAnswers(updatedAnswers);
  // };

  // const handleDescriptionChange = (event, answerId) => {
  //   const updatedAnswers = initAnswers.map((answer) =>
  //     answer.id === answerId
  //       ? { ...answer, description: event.target.value }
  //       : answer
  //   );
  //   setAnswers(updatedAnswers);
  // };

  const handleCheckboxChange = (event, answerId) => {
    console.log(`${id}/answerLabel/${answerId}`);
    document.getElementById(`${id}/answerLabel/${answerId}`).textContent = event
      .target.checked
      ? "Да"
      : "Нет";
  };

  // const handleDeleteAnswer = (answerId) => {
  //   const updatedAnswers = initAnswers.filter((answer) => answer.id !== answerId);
  //   setAnswers(updatedAnswers);
  // };

  const [answersData, setAnswersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedAnswersData = [];
      for (const answer of initAnswers) {
        try {
          var res = await GetAnswer(answer);
          updatedAnswersData.push(res.data);
        } catch (error) {
          console.error("Error fetching answer data:", error);
        }
      }
      setAnswersData(updatedAnswersData);
    };

    fetchData();
  }, [initAnswers]);

  const handleAddAnswer = () => {
    AddAnswer(localStorage.getItem("token"), initId)
      .then((res) => {
        const newAnswers = [...initAnswers, res.data.id];
        setAnswers(newAnswers);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  };

  const handleDeleteAnswer = (id) => {
    DeleteAnswer(localStorage.getItem("token"), id)
      .then((res) => {
        if (res.status == 200) {
          const newAnswers = initAnswers.filter((answerId) => answerId !== id);
          setAnswers(newAnswers);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
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
          <div
            style={{ paddingTop: "14px", height: "100%", minHeight: "340px" }}
          >
            <FileInput key={initId} callback={callback} imageUrl={initimage} />
          </div>
          <div
            className="main_tab_evenly_distributed_field"
            style={{ marginTop: "54px", width: "100%" }}
          >
            <div class="omrs-input-group" style={{ marginTop: "-28px" }}>
              <label class="omrs-input-filled">
                <textarea
                  required
                  value={initdescription ? initdescription : ""}
                  defaultValue={initdescription != null ? initdescription : ""}
                  onChange={(e) =>
                    handleDescriptionQuestionChange(e.target.value)
                  }
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
        </div>
      </form>
      <div className="content_tab_whitecardwithspace">
        <div className="content_answer_block">
          {answersData.map((answerData, index) => (
            <div key={index}>
              <button
                onClick={() => handleDeleteAnswer(answerData.id)}
                type="button"
                className="content_tab_button"
                style={{ marginBottom: "24px" }}
              >
                OK
              </button>
              <div
                style={{
                  paddingTop: "14px",
                  height: "100%",
                  width: "100%",
                }}
              >
                <FileInput
                  //key={initId}
                  callback={callback}
                  //imageUrl={initimage}
                />
              </div>
              <div class="omrs-input-group" style={{ marginTop: "24px" }}>
                <label class="omrs-input-filled">
                  <textarea
                    required
                    value={initdescription ? initdescription : ""}
                    defaultValue={
                      initdescription != null ? initdescription : ""
                    }
                    onChange={(e) =>
                      handleDescriptionQuestionChange(e.target.value)
                    }
                    style={{
                      maxHeight: "128px",
                      width: "20px",
                      maxWidth: "20px",
                    }}
                  />
                  <span class="omrs-input-label">Содержимое ответа</span>
                </label>
              </div>
              {/* <label>
                  <input
                    type="checkbox"
                    checked={answerData.isCorr}
                    //onChange={(e) => handleCheckboxChange(e, answer.id)}
                  />
                  
                </label> */}
                
              <fieldset key={answerData.id}>
                <legend>
                  Ответ верный?<span>aaaa</span>
                </legend>
                <div >
                  <input
                    type="checkbox"
                    id={`${id}/answerCheck/${answerData.id}`}
                    
                    onChange={(e) => handleCheckboxChange(e, answerData.id)}
                  ></input>
                  <label
                    for={`${id}/answerCheck/${answerData.id}`}
                    id={`${id}/answerLabel/${answerData.id}`}
                  >
                    {answerData.isCorr ? "Да" : "Нет"}
                  </label>
                </div>
              </fieldset>
              {console.log(document.getElementById(`${id}/answerLabel/${answerData.id}`))}
              <button
                onClick={() => handleDeleteAnswer(answerData.id)}
                type="button"
                className="main_buttondelstate"
                style={{ height: "38px", width: "38px", marginTop: "-180px" }}
              >
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ width: "24px", height: "24px" }}
                  className="trashIcon"
                >
                  <use xlinkHref={trashIcon + "#trashCan"} />
                </svg>
              </button>
              {/* <div>
                  <div>
                    <div>
                      <p
                        className="bold_text"
                        style={{ float: "left", paddingLeft: "14px" }}
                      >
                        Содержимое ответа
                      </p>
                    </div>
                    <div class="omrs-input-group" style={{}}>
                      <label class="omrs-input-filled">
                        <textarea
                          required
                          value={initdescription ? initdescription : ""}
                          defaultValue={
                            initdescription != null ? initdescription : ""
                          }
                          onChange={(e) =>
                            handleDescriptionQuestionChange(e.target.value)
                          }
                          style={{ maxHeight: "260px" }}
                        />
                        <span class="omrs-input-label">Содержимое вопроса</span>
                      </label>
                    </div>
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={answerData.isCorr}
                      //onChange={(e) => handleCheckboxChange(e, answer.id)}
                    />
                    Correct answer
                  </label>
                  <button
                    onClick={() => handleDeleteAnswer(answerData.id)}
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
                </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabContent;
