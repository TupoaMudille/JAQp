import LongMenu from "./LongMenu";
import BurgerMenu from "./BurgerMenu";
import Media from "react-media";

function Menu() {
  return (
    <div>
      <Media query="(max-width: 979px)">
        {(matches) => (matches ? <BurgerMenu /> : <LongMenu />)}
      </Media>
      <div style={{ background: "none", height: "30px" }}></div>
    </div>
  );
}

export default Menu;
