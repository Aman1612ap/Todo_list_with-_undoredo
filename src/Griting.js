
import React, { useState, useEffect, useCallback } from "react";
import "./Griting.css";

function Griting() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("black");
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(history.slice(0, currentIndex + 1));
  }, [currentIndex, history]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleFontSizeChange = useCallback((e) => {
    setFontSize(e.target.value);
  }, []);

  const handleFontFamilyChange = useCallback((e) => {
    setFontFamily(e.target.value);
  }, []);

  const handleColorChange = useCallback((e) => {
    const colorValue = e.target.value;
    setColor(colorValue);
  }, []);

  const handleSubmit = useCallback(() => {
    const newText = {
      text,
      fontSize,
      fontFamily,
      color,
    };
    setHistory([...history, newText]);
    setCurrentIndex(currentIndex + 1);
    setText("");
  }, [text, fontSize, fontFamily, color, history, currentIndex]);

  const handleUndo = useCallback(() => {
    if (currentIndex > -1) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleRedo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  return (
    <div className="Mainfun">
      <div id="Button_section">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div className="Apps">
        <div className="Note">
          <ul>
            <h1>Your List</h1>
            {list.map((item, index) => (
              <li key={index}>
                <span
                  style={{
                    fontSize: `${item.fontSize}px`,
                    fontFamily: item.fontFamily,
                    color: item.color,
                  }}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flote">
          <h1>Text Editor</h1>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text"
          />
          <br />
          <label>Font Size:</label>
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            min="10"
            max="50"
          />
          <br />
          <label>Font Family:</label>
          <select value={fontFamily} onChange={handleFontFamilyChange}>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier">Courier</option>
            <option value="cursive">Cursive</option>
            <option value="fantasy">Fantasy</option>
          </select>
          <br />
          <label>Font color:</label>
          <input
            type="text"
            value={color}
            onChange={handleColorChange}
            placeholder="Enter color (default Black)"
          />
          <br />
          <button onClick={handleSubmit}>Add to List</button>
        </div>
      </div>
    </div>
  );
}

export default Griting;
