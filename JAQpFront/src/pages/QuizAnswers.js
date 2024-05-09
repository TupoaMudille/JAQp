import Menu from "../components/Menu";
import { GetAnswer } from "../http/answerApi";
import { GetQuestion } from "../http/questionApi";
import { address } from "../http/apiIndex";

import emptyQuizIcon from "../icons/emptyQuiz.svg";

import "../css/font.css";
import "../css/quizanswers.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuizAnswers = () => {
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    accessibility:true
  };
  const { id } = useParams();
  const { idquestion } = useParams();
  const [questionTitle, setQuestionTitle] = useState("");
  const [initAnswers, setAnswers] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [initimage, setImage] = useState(null);

  const questionsLength =
    JSON.parse(sessionStorage.getItem(`questions_${id}`)).questions.length ||
    [];
  document.documentElement.style.setProperty("--length", questionsLength);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await GetQuestion(idquestion);
        setQuestionTitle(res.data.description);
        setAnswers(res.data.answers != undefined ? res.data.answers : []);
        setImage(res.data.image);

        if (res.data.answers) {
          const answerPromises = res.data.answers.map((answerId) =>
            GetAnswer(answerId)
          );
          const answerResults = await Promise.all(answerPromises);
          setAnswerData(answerResults.map((answer) => answer.data));
        }
      } catch (error) {
        console.error("Ошибка при получении данных вопроса:", error);
      }
    };

    fetchQuestionData();
  }, [idquestion]);

  return (
    <div
      className="quizanswers_window"
      style={{ backgroundImage: "url(/../img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="quizanswers_workspace">
        <li className="cardlist" style={{ "--i": 4 }}>
          <div className="titlequestion">
            <img
              src={initimage == null ? emptyQuizIcon : address + initimage}
              alt=""
            />
            {questionTitle && <h1>{questionTitle}</h1>}
          </div>
          <Slider {...settings}>
            {answerData.map((answer, index) => (
              <div key={index} className="answer">
                <img
                  src={answer.image == null ? null : address + answer.image}
                  alt=""
                />

                <label>
                  <input
                    type="checkbox"
                    name="answer"
                    value={answer.id}
                    style={{ cursor: "pointer" }}
                  />
                  {answer.content}
                </label>
              </div>
            ))}
          </Slider>
          <button className="quiz_button" onClick={console.log(answerData)}>
            Далее
          </button>
        </li>
      </div>
    </div>
  );
};

export default QuizAnswers;
