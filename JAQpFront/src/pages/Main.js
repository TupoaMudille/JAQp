import Menu from "../components/Menu";

import "../css/font.css";

function Main() {
  return (
    <div
      className="auth_window"
      style={{ backgroundImage: "url(img/background.svg)" }}
    >
      <div>
        <Menu />
      </div>
      <div className="auth_workspace">m,m,m</div>
    </div>
  );
}

export default Main;
