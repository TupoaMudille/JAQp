function AddQuestion({ arrquiz }) {
 
  const listItems = arrquiz.map((testname) => (
    <li className="listitem" style={{ color: "black" }}>
      {testname.name}
    </li>
  ));
  return <ul>{listItems}</ul>;
}

export default AddQuestion;
