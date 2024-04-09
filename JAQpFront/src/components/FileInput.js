import React, { useRef, useState, useEffect } from "react";
import "../css/fileinput.css";

const FileInput = ({ callback }) => {
  const inputRef = useRef();
  const handleCallback = () => callback(image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    handleCallback();
  }, [image]);

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
        if(event.target.files[0].size>25000000) {alert("Файл слишком большой");return}
      setImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setImage(null);
    setSelectedFile(null);
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        accept=".jpg, .gif"
        style={{ display: "none" }}
      />
      <button className="file-btn" onClick={onChooseFile}>
        <span class="material-symbols-rounded">Загрузить изображение</span>JPG или GIF (MAX. 25Мб)
      </button>
      {selectedFile && (
        <div className="selected-file">
          <p>{selectedFile.name}</p>
          <button onClick={removeFile}>
            <span class="material-symbols-rounded">х</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
