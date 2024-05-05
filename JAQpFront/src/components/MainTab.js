import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { EditQuizWOImage } from "../http/quizApi";
import { EditQuiz } from "../http/quizApi";
import { ToggleVisabylity } from "../http/quizApi";
import { address } from "../http/apiIndex";

import FileInput from "./FileInput";
import Select from "react-select";
import "../css/maintab.css";
import trashIcon from "../icons/trashCan.svg";

function MainTab({
  countQuestions,
  quizData,
  options,
  onChangeTest,
  onChangeStatus,
  onDeleteQuiz,
}) {
  const [state, setState] = useState(quizData.isPublic);
  const [idQuiz, setIdQuiz] = useState(quizData.id);
  const [title, setTitle] = useState(quizData.name);
  const [description, setDescription] = useState(quizData.description);
  const [image, setImage] = useState(quizData.image_name);
  const [file, setFile] = useState();

  const [isChangedImage, setIsChangedImage] = useState(false);

  const selectedTagsFromOptions = quizData.tags
    ? quizData.tags.map((tag) => {
        const option = options.find((option) => option.value === tag);
        return option ? option : { value: tag, label: tag };
      })
    : null;

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    option: (base, { isDisabled }) => ({
      ...base,
      cursor: isDisabled ? "not-allowed" : "pointer",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),

    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  const filterOption = (option, inputValue) => {
    return option.label.toLowerCase().startsWith(inputValue.toLowerCase());
  };

  const [selectedTags, setSelectedTags] = useState(selectedTagsFromOptions);

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    const tags = selectedTags
      ? `${selectedTags.map((item) => item.value).join(", ")}`
      : "";
    const sanitizedDescription = description ?? "";
    const sanitizedTitle = title ?? "";
    !isChangedImage
      ? EditQuizWOImage(
          localStorage.getItem("token"),
          idQuiz,
          tags,
          sanitizedDescription,
          sanitizedTitle
        )
          .then((res) => {
            onChangeTest(res.data);
          })
          .catch((error) => {
            console.error("Error fetching quiz data:", error);
          })
      : EditQuiz(
          localStorage.getItem("token"),
          idQuiz,
          tags,
          sanitizedDescription,
          sanitizedTitle,
          file,
          file? file.name: null
        )
          .then((res) => {
            onChangeTest(res.data);
          })
          .catch((error) => {
            console.error("Error fetching quiz data:", error);
          });
  };

  const handleStateChange = () => {
    ToggleVisabylity(localStorage.getItem("token"), idQuiz)
      .then((res) => {
        onChangeStatus(res.data);
        setState(res.data.isPublic);
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

  const handleDelete = () => {
    onDeleteQuiz(idQuiz);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  return (
    <div className="main_tab_statebar">
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
          О квизе
        </p>
        <button
          onClick={handleDelete}
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
          Удалить квиз
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="main_tab_whitecardwithspace">
          <div>
            <div className="settings_evenly_distributed_field">
              <div class="omrs-input-group">
                <label class="omrs-input-filled">
                  <input
                    required
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <span class="omrs-input-label">Название</span>
                </label>
              </div>
            </div>

            <div
              className="main_tab_evenly_distributed_field"
              style={{ marginTop: "44px" }}
            >
              <div class="omrs-input-group">
                <label class="omrs-input-filled">
                  <textarea
                    required
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <span class="omrs-input-label">Описание</span>
                </label>
              </div>
            </div>
            <div>
              <p
                className="bold_text"
                style={{ float: "left", paddingLeft: "14px" }}
              >
                Теги
              </p>
            </div>
            <div className="main_tab_evenly_distributed_field ">
              <Select
                className="main_tab_custominput_select"
                isMulti
                closeMenuOnSelect={false}
                options={options}
                value={selectedTags}
                placeholder="Пусто"
                onChange={handleTagChange}
                filterOption={filterOption}
                maxMenuHeight={186}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
                styles={customStyles}
                noOptionsMessage={() => "Пусто"}
              />
            </div>
          </div>
          
          <div style={{ paddingTop: "14px", height: "100%" }}>
            <FileInput callback={callback} imageUrl={image} />
          </div>
          <div
            className="main_tab_column_distributed_field"
            style={{ width: "192px" }}
          >
            <div style={{ float: "right" }}>
              <div className="main_tab_flex_width_distributed_field">
                <div className="bold_text">Вопросов: </div>
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
                  type="button"
                >
                  {state ? "Скрыть" : "Опубликовать"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="main_tab_button" type="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default MainTab;
