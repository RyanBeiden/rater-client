/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { GameContext } from "./GameProvider";

import "./Game.css";

export const GameDetails = (props) => {
  const { game, getSingleGame } = useContext(GameContext);
  const { gameId } = props.match.params;

  useEffect(() => {
    getSingleGame(gameId);
  }, []);

  return (
    <div className="single-game">
      <div className="image-container">
        <img className="game-image" src={game.image_url} alt={game.title} />
      </div>
      <h1>{game.title}</h1>
      <h3>Designer: {game.designer}</h3>
      <p>Year Released: {game.year_released}</p>
      <p>Number of Players: {game.num_of_players}</p>
      <p>Estimated Time To Play: {game.est_time_to_play}</p>
      <p>Age Recommendation: {game.age_rec}</p>
      <div>Categories:
        {
          game.categories && game.categories.map(category => {
            return <p key={`category--${category.category_name}`}>{category.category_name}</p>
          })
        }
      </div>
    </div>
  );
}
