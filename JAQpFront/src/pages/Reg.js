import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterUser from "../http/userApi";

import LongMenu from "../components/LongMenu";
import BurgerMenu from "../components/BurgerMenu";
import Media from "react-media";

import "../css/reg.css";
import "../css/font.css";

function Reg() {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => {
    RegisterUser(values.email, values.password).then((res) => {
      if (res) gotoLoginPage();
      else alert("Что-то пошло не так. Попробуйте позднее");
    });
  };
  const navigate = useNavigate();

  const gotoLoginPage = () => navigate("/");

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="whitecardwithspace">
            <p className="h1">Регистрация</p>
          </div>
          <div className="whitecardwithspace">
            <div>
              <p className="bold_text" style={{ float: "left" }}>
                1.Логин
              </p>
            </div>
            <div className="evenly_distributed_field">
              <img className="icon" src="img/Mail.svg"></img>
              <input
                className="custominput"
                {...register("email", {
                  required: "* Обязательное поле",
                })}
              />
            </div>
            <div className="error_text">
              {errors.email && errors.email.message}
            </div>
          </div>
          <div className="whitecardwithspace">
            <div>
              <p className="bold_text" style={{ float: "left" }}>
                2.Пароль
              </p>
            </div>
            <div className="evenly_distributed_field">
              <img className="icon" src="img/Password_Key.svg"></img>
              <input
                className="custominput"
                type="password"
                {...register("password", {
                  required: "* Обязательное поле",
                  pattern: {
                    value: /^([a-zA-Z0-9!@#$%^&*]){8,20}$/,
                    message: "* Некорректный пароль: 8-20 символов.",
                  },
                })}
              />
            </div>
            <div className="error_text">
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className="whitecardwithspace">
            <div>
              <p className="bold_text" style={{ float: "left" }}>
                3.Подтверждение пароля
              </p>
            </div>
            <div className="evenly_distributed_field">
              <img className="icon" src="img/Password_Key.svg"></img>
              <input
                className="custominput"
                type="password"
                {...register("repeat_password", {
                  required: "* Обязательное поле",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "* Пароли не совпадают";
                  },
                })}
                style={{ marginLeft: "auto" }}
              />
            </div>
            <div className="error_text">
              {errors.repeat_password && errors.repeat_password.message}
            </div>
          </div>
          <button className="button" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reg;
