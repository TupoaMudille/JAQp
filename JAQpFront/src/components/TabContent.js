import React, { useState, useEffect } from "react";

function TabContent({ initialAnswers, title, description }) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [inittitle, setTitle] = useState(title);
  const [initdescription, setDescription] = useState(description);

  // Обновление состояния answers при изменении initialAnswers
  useEffect(() => {
    setAnswers(initialAnswers);
    setDescription(description);
    setTitle(title);
    // image
  }, [initialAnswers, description,title]);

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleDescriptionQChange = (event) => {
    setDescription(event.target.value)
  };

  const handleDeleteAnswer = (answerId) => {
    const updatedAnswers = answers.filter((answer) => answer.id !== answerId);
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      id: Date.now(), // Генерируем уникальный идентификатор для нового ответа
      title: "",
      image: "",
      description: "",
      isCorr: false,
    };
    setAnswers((answers.length === 0 || !answers )? [newAnswer] : [...answers, newAnswer]);
  };

  return (
    <div>
      <div style={{ overflow: "scroll" }}>
        <input type="text" value={inittitle} onChange={handleTitleChange} />
        <textarea
          value={initdescription}
          onChange={handleDescriptionQChange}
        />
      </div>
      <button onClick={handleAddAnswer}>Добавить ответ</button>
      {answers &&
        answers.map((answer) => (
          <div key={answer.id}>
            <h4>{answer.title}</h4>
            <input
              type="file"
              value={answer.image}
              onChange={(e) => handleImageChange(e, answer.id)}
              placeholder="Image URL"
            />
            <textarea
              value={answer.description}
              onChange={(e) => handleDescriptionChange(e, answer.id)}
              placeholder="Description"
            />
            <label>
              <input
                type="checkbox"
                checked={answer.isCorr}
                onChange={(e) => handleCheckboxChange(e, answer.id)}
              />
              Correct answer
            </label>
            <button onClick={() => handleDeleteAnswer(answer.id)}>
              Удалить
            </button>
          </div>
        ))}
    </div>
  );
}

export default TabContent;
