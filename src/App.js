import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./components/flashcardList";
import "./App.css";
import axios from "axios";

const App = () => {
  const [flashcard, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const categoryEl = useRef()
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const cAnswer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            cAnswer,
          ];
          return {
            id: `${index}-${Date.now}`,
            question: decodeString(questionItem.question),
            answer: cAnswer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id='category' ref={categoryEl}></select>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcard={flashcard} />
      </div>
    </>
  );
};

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2 + 3",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
];

export default App;

// useEffect(() => {
//     axios.get('https://opentdb.com/api.php?amount=10').then(res => res.data.results.map((questionItem, index) => {

//     }))
// },[])
