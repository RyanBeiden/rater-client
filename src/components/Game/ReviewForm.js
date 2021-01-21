/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameProvider";

export const ReviewForm = (props) => {
  const { game, getSingleGame, createReview } = useContext(GameContext);
  const { gameId } = props.match.params;

  useEffect(() => {
    getSingleGame(gameId);
  }, []);

  const [currentReview, setCurrentReview] = useState({
    content: ""
  });

  const handleInputChange = (e) => {
    const newReviewState = Object.assign({}, currentReview);
    newReviewState[e.target.name] = e.target.value;
    setCurrentReview(newReviewState);
  }

  const saveReview = async (e) => {
    e.preventDefault();

    const newReview = {
      content: currentReview.content,
      game_id: gameId,
    };

    await createReview(newReview)
      .then(props.history.push(`/games/${gameId}`));
  }

  return (
    <div className="new-game">
      <h1 style={{ textAlign: "center" }}>Review {game.title}</h1>
      <div className="form-style-5">
        <form style={{ minWidth: "500px" }}>
          <textarea name="content" placeholder="Write your review" onChange={handleInputChange} required />
          <input type="submit" value="Save" onClick={saveReview} />
        </form>
      </div>
    </div>
  )
}