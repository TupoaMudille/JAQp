import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import LongMenu from "../components/LongMenu";
import BurgerMenu from "../components/BurgerMenu";
import Media from "react-media";

import "react-datepicker/dist/react-datepicker.css";
import "../css/sett.css";
import "../css/font.css";

function UserSettings() {
  const [startDate, setStartDate] = useState(new Date());
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {};

  return (
    <div
      className="window"
      style={{ backgroundImage: "url(img/background.svg)" }}
    >
      <div>
        <Media query="(max-width: 979px)">
          {(matches) => (matches ? <BurgerMenu /> : <LongMenu />)}
        </Media>
      </div>
      <div style={{ background: "none", height: "30px" }}></div>
      <div className="workspace">
        <div>
          <div className="whitecardwithspace" style={{ marginBottom: "36px" }}>
            <p className="h1">Настройки</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="whitecardwithspace">
              <p className="h2">Личные данные</p>
            </div>
            <div className="whitecardwithspace">
              <div>
                <p className="bold_text" style={{ float: "left" }}>
                  Имя
                </p>
              </div>
              <div className="evenly_distributed_field">
                <input className="custominput" />
              </div>
            </div>
            <div className="whitecardwithspace">
              <div>
                <p className="bold_text" style={{ float: "left" }}>
                  Фамилия
                </p>
              </div>
              <div className="evenly_distributed_field">
                <input className="custominput" />
              </div>
            </div>
            <div className="whitecardwithspace">
              <div>
                <p className="bold_text" style={{ float: "left" }}>
                  Отчество
                </p>
              </div>
              <div className="evenly_distributed_field">
                <input className="custominput" />
              </div>
            </div>
            <div className="whitecardwithspace">
              <div>
                <p className="bold_text" style={{ float: "left" }}>
                  День рождения
                </p>
              </div>
              <div className="evenly_distributed_field">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="customDateInput"
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  locale="ru"
                  shouldCloseOnSelect
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={101}
                  showMonthDropdown
                  maxDate={new Date()}
                  fixedHeight
                />
              </div>
            </div>
            <button className="button" type="submit">
              Сохранить
            </button>
          </form>
          <div className="whitecardwithspace" style={{ marginTop: "36px" }}>
            <p className="h2">Сообщить об ошибке</p>
            <div className="evenly_distributed_field">
              <button className="buttongit">GitHub</button>
              <button className="buttontg">Telegram</button>
              <button className="buttonvk">VK</button>
            </div>
          </div>
          <div
            className="whitecardwithspace"
            style={{ marginTop: "36px", marginBottom: "14px" }}
          >
            <p className="h2">Удалить аккаунт</p>
            <div className="evenly_distributed_field">
              <button className="buttondel">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
