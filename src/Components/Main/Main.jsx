import React, { useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../Assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setRecentPrompt,
  } = useContext(Context);
  const result_ref = useRef(null)

  let cardList = [
    [
      "Suggest beautiful places to see on an upcoming road trip",
      assets.compass_icon,
    ],
    ["Briefly summarize this concept: Urban planning", assets.bulb_icon],
    [
      "Brainstorm team bonding activities for our work retreat",
      assets.message_icon,
    ],
    ["Improve the readability of the following code", assets.code_icon],
  ];

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {cardList.map((card, index) => {
                return (
                  <div
                    onClick={() => loadPrompt(card[0])}
                    className="card"
                    key={index}
                  >
                    <p>{card[0]}</p>
                    <img src={card[1]} alt="" />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div ref={result_ref} className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
            />
            <div>
              {input && (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
