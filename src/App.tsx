import React, { useState, useEffect } from "react";
import "./App.css";

interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function App() {
  const [imgData, setImageData] = useState<Image[]>([]);
  const [currImgList, setcurrImgList] = useState<JSX.Element[]>([]);
  const [inputValue, setInputValue] = useState<number>(-1);
  const [btnClicked, setBtnClicked] = useState<boolean>(false);

  // const imageContainer = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setImageData(data as Image[]);
      });
  }, []);

  const onBtnClick = (): void => {
    const imgList: JSX.Element[] = [];
    setBtnClicked(true);
    for (let i: number = 0; i < imgData.length; i++) {
      const imgObj: Image = imgData[i];
      if (inputValue === imgObj.albumId) {
        imgList.push(<img src={imgObj.url} alt={imgObj.title} />);
      }
    }
    setcurrImgList(imgList);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(parseInt(e.target.value));

  return (
    <div className="App">
      <h1>Show Images from Album</h1>
      <input
        onChange={onInputChange}
        className="input-number"
        placeholder="here goes the id"
      ></input>
      <button onClick={onBtnClick} id="button">
        Show image from chosen album
      </button>
      <div id="image-container">
        {currImgList.length === 0 && btnClicked
          ? "album inexistent"
          : currImgList}
      </div>
    </div>
  );
}

export default App;
