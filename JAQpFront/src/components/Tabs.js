import React from "react";
import MainTab from "../components/MainTab";
import "../css/listnav.css";
const TabContent = ({ title, content }) => (
  <div  style={{overflow:"scroll"}}>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
);

function Tabs({ items }) {
  const [active, setActive] = React.useState(null);
  const [tabs, setTabs] = React.useState(items);

  const openTab = (e) => {
    const dataIndex = +e.target.dataset.index;
    setActive(dataIndex === -1 ? -1 : dataIndex + 1);
  };

  const addTab = () => {
    const newItem = {
      title: `Вопрос ${tabs.length + 1}`,
      content: `Содержимое вопроса`,
    };
    const newTabs = [...tabs, newItem].map((tab, index) => ({
      ...tab,
      title: `Вопрос ${index + 1}`,
    }));
    setTabs(newTabs);
    setActive(newTabs.length);
  };

  const deleteTab = (index) => {
    const updatedTabs = tabs.filter((tab, i) => i !== index);
    const newTabs = updatedTabs.map((tab, i) => ({
      ...tab,
      title: `Вопрос ${i + 1}`,
    }));
    setTabs(newTabs);
    if (active === index + 1) {
      setActive(null);
    } else if (active > index + 1) {
      setActive(active - 1);
    }
  };

  return (
    <div>
      <div className="nav" style={{background:"gray"}}>
        <h3>QuizName</h3>
        <button onClick={openTab} data-index={-1}>
          О квизе
        </button>
        {tabs.map((n, i) => (
          <div key={i}>
            <button
              className={`tablinks ${i + 1 === active ? "active" : ""}`}
              onClick={openTab}
              data-index={i}
            >
              {`Вопрос ${i + 1}`}
            </button>
            <button onClick={() => deleteTab(i)}>X</button>
          </div>
        ))}
        <button onClick={addTab}>+</button>
      </div>
      {active !== null &&
        (active === -1 ? <MainTab countQuestions={tabs.length}/> : <TabContent {...tabs[active - 1]} />)}
    </div>
  );
}

export default Tabs;
