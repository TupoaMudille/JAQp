import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser from "../http/userApi";

import Menu from "../components/Menu";

import "../css/auth.css";
import "../css/font.css";

function Auth() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const pass = useRef();

  const showPassword = () => {
    setShow(!show);
    pass.current.type = show ? "password" : "text";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ login, password });
    LoginUser(login, password);
    gotoMainPage();
  };

  const gotoRegPage = () => navigate("/registration");
  const gotoMainPage = () => navigate("/main");
  return (
    <div
      className="window"
      style={{ backgroundImage: "url(img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="workspace">
        <div className="whitecard">
          <div>
            <p className="h1">JAQp</p>
            <p className="h2">Авторизация</p>
          </div>
          <div>
            <div className="evenly_distributed_field">
              <img className="icon" src="img/Male_User.svg"></img>
              <input
                className="custominput"
                placeholder="Логин"
                name="login"
                id="login"
                value={login}
                required
                onChange={(e) => setLogin(e.target.value)}
              ></input>
            </div>
            <div className="evenly_distributed_field">
              <img className="icon" src="img/Password_Key.svg"></img>
              <div className="blockpasswordinput">
                <input
                  className="passwordinput"
                  ref={pass}
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                {show ? (
                  <img
                    className="inputicon"
                    onClick={showPassword}
                    style={{ position: "absolute", right: "0", top: "0" }}
                    src="img/see.svg"
                  ></img>
                ) : (
                  <img
                    className="inputicon"
                    onClick={showPassword}
                    style={{ position: "absolute", right: "0", top: "0" }}
                    src="img/show.svg"
                  ></img>
                )}
              </div>
            </div>
            <div className="evenly_distributed_field">
              <button className="textbutton" onClick={gotoRegPage}>
                Регистрация
              </button>
              <button className="button" onClick={handleSubmit}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
