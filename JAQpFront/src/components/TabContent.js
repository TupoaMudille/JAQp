function TabContent({ title, description }) {
  return (
    <div style={{ overflow: "scroll" }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TabContent;
