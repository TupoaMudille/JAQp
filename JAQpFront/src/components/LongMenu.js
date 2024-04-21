import { useNavigate } from "react-router-dom";
import { isNull } from "joi-browser";

import "../css/longmenu.css";
function LongMenu() {
  const navigate = useNavigate();
  const gotoUserSettingsPage = () => navigate("/settingsId=?");
  const gotoConstructorPage = () => navigate("/constructor");
  const gotoLoginPage = () => navigate("/");

  return (
    <div className="header_container">
      <div className="block">
        <div className="evenly_distributed_block">
          <img className="button_icon_small" src="img/Search.svg"></img>
        </div>
        <div className="evenly_distributed_block">
          <p className="logo_name">JAQp</p>
          <p className="logo_text">Just Another Quiez platform</p>
        </div>
        <div className="evenly_distributed_block">
          <img
            className="button_icon"
            src="img/Dice.svg"
            style={{ cursor: "pointer" }}
          ></img>
          <p className="text" style={{ cursor: "pointer" }}>
            Тесты
          </p>
          <p className="text" style={{ cursor: "pointer" }}>
            Лучшее
          </p>
          <img
            className="button_icon"
            src="img/Search.svg"
            style={{ cursor: "pointer" }}
          ></img>
          <div
            style={{ cursor: "pointer" }}
            className="user_block"
            onClick={
              localStorage.token == isNull ? gotoLoginPage : gotoConstructorPage
            }
          >
            <img src="img/konstructor.svg" className="icon"></img>
            <p className="simple_text">Конструктор</p>
          </div>
        </div>
        <div className="evenly_distributed_block">
          <img
            className="button_icon"
            src="img/Telegram.svg"
            style={{ cursor: "pointer" }}
          ></img>
          <img
            className="button_icon"
            src="img/vk.svg"
            style={{ cursor: "pointer" }}
          ></img>
        </div>
        <div
          style={{ cursor: "pointer" }}
          className="user_block"
          onClick={
            localStorage.token == isNull ? gotoLoginPage : gotoUserSettingsPage
          }
        >
          <img src="img/User_Empty_icon.svg" className="icon"></img>
          <p className="simple_text">UserName</p>
        </div>
        <img className="button_icon_small" src="img/Menu.svg"></img>
      </div>
    </div>
  );
}

export default LongMenu;
