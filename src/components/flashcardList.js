import React from "react";
import Flashcard from "./flashcard";

export default function FlashcardList({ flashcard }) {
  return (
    <div className="card-grid">
      {flashcard.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}
