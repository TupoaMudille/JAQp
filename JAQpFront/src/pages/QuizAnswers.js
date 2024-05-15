import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetAnswer } from "../http/answerApi";
import { GetQuestion } from "../http/questionApi";
import { address } from "../http/apiIndex";

import Menu from "../components/Menu";

import emptyQuizIcon from "../icons/emptyQuiz.svg";

import "../css/font.css";
import "../css/quizanswers.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const QuizAnswers = () => {
  /* setters */
  const { id } = useParams();
  const { idquestion } = useParams();
  const [questionTitle, setQuestionTitle] = useState("");
  const [initAnswers, setAnswers] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [initimage, setImage] = useState(null);
  const [isAnswerSelected, setisAnswerSelected] = useState(false);
  const [questionSequence, setQuestionSequence] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(-1);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  let score = 0;

  const questionsLength = sessionStorage.getItem(`questions_${id}`)
    ? JSON.parse(sessionStorage.getItem(`questions_${id}`)).questions.length ||
      []
    : 1;
  document.documentElement.style.setProperty("--length", questionsLength);

  const [nextQuestionId, setnextQuestionId] = useState(0);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await GetQuestion(idquestion);
        setQuestionTitle(res.data.description);
        setAnswers(res.data.answers !== undefined ? res.data.answers : []);
        setisAnswerSelected(res.data.answers.length === 0 ? true : false);
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

  useEffect(() => {
    const storedQuestions = sessionStorage.getItem(`questions_${id}`);
    if (storedQuestions) {
      const questions = JSON.parse(storedQuestions).questions;
      const sequence = {};
      for (let i = 0; i < questions.length - 1; i++) {
        sequence[questions[i]] = questions[i + 1];
      }
      setQuestionSequence(sequence);
      setCurrentQuestionId(questions[0]);
    }
  }, [id]);

  useEffect(() => {
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
      navigate(`/quiz/${id}/question/${nextQuestionId}`);
    }
  }, [nextQuestionId]);

  /* func */

  const handleNextQuestion = () => {
    const nextId = questionSequence[currentQuestionId];

    if (nextId) {
      setnextQuestionId(nextId);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setisAnswerSelected(false);
      setSelectedValue(-1);
    } else {
      setSelectedValue(null);
      setnextQuestionId(null);
      setisAnswerSelected(true);
      calculateResults();
      sessionStorage.removeItem(`questions_${id}`);
    }
  };

  const handleAnswerChange = (event, answerId, isCorrect) => {
    setisAnswerSelected(event.target.checked);
    setSelectedValue(answerId);
    setSelectedAnswers((prev) => ({
      ...prev,
      [idquestion]: { answerId, isCorrect },
    }));
  };

  const calculateResults = () => {
    const correctAnswers = Object.values(selectedAnswers).filter(
      (answer) => answer.isCorrect
    );
    score = correctAnswers.length;
    const totalQuestions = questionsLength;
    navigate(`/quiz/${id}/result`, { state: { score, totalQuestions } });
  };


  return (
    <div
      className="quizanswers_window"
      style={{ backgroundImage: "url(/../img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="quizanswers_workspace">
        <div className="cardlist" style={{ "--i": currentQuestionIndex }}>
          <div className="titlequestion">
            <img
              src={initimage == null ? emptyQuizIcon : address + initimage}
              alt=""
            />
            {questionTitle && <h1>{questionTitle}</h1>}
          </div>
          <div className="answerscard">
            {answerData.map((answer, index) => (
              <div key={index} className="answer">
                <img
                  src={answer.image == null ? null : address + answer.image}
                  alt=""
                />
                <img
                  src={answer.image == null ? null : address + answer.image}
                  alt=""
                  className="hiddenimg"
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.id}
                    style={{ cursor: "pointer" }}
                    checked={selectedValue === answer.id}
                    onChange={(e) =>
                      handleAnswerChange(e, answer.id, answer.right)
                    }
                  />
                  <label>{answer.content}</label>
                </div>
              </div>
            ))}
          </div>
          <button
            className="quiz_button"
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
          >
            {nextQuestionId === undefined || nextQuestionId === null
              ? "К результатам"
              : "Далее"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizAnswers;
