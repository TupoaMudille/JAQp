import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileInput from "../components/FileInput";
import Select from "react-select";
import "../css/maintab.css";

function MainTab({ countQuestions }) {
  //from server
  const quizData = {
    title: `Некоторое название`,
    description: `Некоторое описание`,
    tags: ["tag2", "tag1"],
    state: true,
  };

  const [state, setState] = useState(quizData.state);
  const [title, setTitle] = useState(quizData.title);
  const [description, setDescription] = useState(quizData.description);
  const [image, setImage] = useState(quizData.image);

  //from server
  const options = [
    { value: "tag1", label: "Тег 1" },
    { value: "tag2", label: "Тег 2" },
    { value: "tag3", label: "Тег 3" },
  ];

  const selectedTagsFromOptions = quizData.tags.map((tag) => {
    const option = options.find((option) => option.value === tag);
    return option ? option : { value: tag, label: tag };
  });

  const [selectedTags, setSelectedTags] = useState(selectedTagsFromOptions);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {};

  const handleStateChange = (e) => {
    setState(!state);
  };

  const handleTitleChange = (e) => {
    setTitle(title);
  };

  const handleDescriptionChange = (e) => {
    setDescription(description);
  };

  const callback = (image) => {
    setImage(image);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  return (
    <div className="main_tab_statebar">
      <div>
        <div
          className="main_tab_whitecardwithspace"
          style={{ marginBottom: "36px" }}
        >
          <p className="h2">О квизе</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="main_tab_whitecardwithspace">
            <div>
              <div>
                <p
                  className="bold_text"
                  style={{ float: "left", paddingLeft: "14px" }}
                >
                  Название
                </p>
              </div>
              <div className="main_tab_evenly_distributed_field">
                <input
                  className="main_tab_custominput"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <p
                  className="bold_text"
                  style={{ float: "left", paddingLeft: "14px" }}
                >
                  Описание
                </p>
              </div>
              <div className="main_tab_evenly_distributed_field">
                <textarea
                  className="main_tab_custominput"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div>
                <p className="bold_text" style={{ float: "left", paddingLeft:"14px" }}>
                  Теги
                </p>
              </div>
              <div className="main_tab_evenly_distributed_field">
                <Select
                  className="main_tab_custominput_select"
                  isMulti
                  closeMenuOnSelect={false}
                  options={options}
                  value={selectedTags}
                  placeholder="Пусто"
                  onChange={handleTagChange}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "black",
                    },
                  })}
                  isSearchable
                  noOptionsMessage={() => "Пусто"}
                />
              </div>
            </div>
            <div style={{ display: "flex", paddingTop: "14px" }}>
              <FileInput callback={callback} />
            </div>
            <div className="main_tab_column_distributed_field">
              <div style={{ float: "right" }}>
                <div className="main_tab_flex_width_distributed_field">
                  <div className="bold_text">Количество вопросов: </div>
                  <div className="bold_text">{countQuestions}</div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "68px",
                    }}
                  >
                    <div className="bold_text">Статус: </div>
                    <div className="bold_text">
                      {state ? "Опубликован" : "Скрыт"}
                    </div>
                  </div>
                  <button
                    className="main_tab_button"
                    onClick={handleStateChange}
                  >
                    {state ? "Скрыть" : "Опубликовать"}
                  </button>
                </div>
              </div>
              <button
                className="buttondelstate"
                style={{ width: "100px", marginLeft: "45%" }}
              >
                Удалить тест
              </button>
            </div>
          </div>

          <button className="main_tab_button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainTab;
