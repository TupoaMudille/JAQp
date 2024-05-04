import React, { useRef, useState, useEffect } from "react";
import "../css/fileinput.css";
import { isNull } from "joi-browser";

const FileInput = ({ callback, imageUrl }) => {
  const inputRef = useRef();
  const handleCallback = () => callback(image, selectedFile, fileVariant);
  const [image, setImage] = useState(imageUrl);
  const [selectedFile, setSelectedFile] = useState(
    image
      ? image.split("/").pop() === "null"
        ? null
        : image.split("/").pop()
      : null
  );

  const [showImage, setShowImage] = useState(false);
  const [fileVariant, setFileVariant] = useState(false);
  useEffect(() => {
    handleCallback();
  }, [image, selectedFile, fileVariant]);

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/gif"];

      if (!allowedTypes.includes(file.type)) {
        alert("Разрешены только файлы PNG, JPEG и GIF");
        return;
      }

      if (file.size > 25000000) {
        alert("Файл слишком большой");
        return;
      }
      setFileVariant(true);
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setShowImage(true);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setImage(null);
    setSelectedFile(null);
    setShowImage(false);
  };

  return (
    <div style={{ height: "80%" }}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        accept=".jpg, .gif, .png"
        style={{ display: "none" }}
      />
      <button
        className="file-btn"
        type="button"
        style={{
          backgroundImage: selectedFile != null ? `url(${image})` : selectedFile,
          backgroundSize: "cover",
          backgroundOrigin: "revert",
        }}
        onClick={onChooseFile}
      >
        {!showImage ? (
          <div>
            <span
              className="material-symbols-rounded"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Загрузить изображение
            </span>
            JPG, PNG или GIF (MAX. 25Мб)
          </div>
        ) : null}
      </button>
      {selectedFile && (
        <div className="selected-file">
          <p>{selectedFile.name || selectedFile}</p>
          <button onClick={removeFile}>
            <span className="material-symbols-rounded">х</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileInput;
