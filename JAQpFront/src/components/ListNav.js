import "../css/font.css";
import "../css/listnav.css";

function ListNav({ arrtest }) {
  const listItems = arrtest.map((testname) => (
    <li key={testname.id} className="listitem">
      {testname.name}
    </li>
  ));
  return listItems.length != 0 ? (
    <ul>{listItems}</ul>
  ) : (
    <p style={{ justifyContent: "center", alignSelf: "center", marginTop:"calc(50vh - 154px)", fontSize:"30px", color:"#849db1" }}>Пусто</p>
  );
}

export default ListNav;
