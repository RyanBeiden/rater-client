/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { GameContext } from "./GameProvider";
import { Link } from "react-router-dom";
import moment from 'moment';

import "./Game.css";

export const GameDetails = (props) => {
  const { game, getSingleGame, gameReviews, getGameReviews } = useContext(GameContext);
  const { gameId } = props.match.params;
  const reviewLink = `${gameId}/review`;

  useEffect(() => {
    getSingleGame(gameId);
    getGameReviews(gameId);
  }, []);

  return (
    <div className="single-game">
      <div className="image-container">
        <img className="game-image" src={game.image_url} alt={game.title} />
      </div>
      <h1 style={{ marginTop: "10px" }}>{game.title}</h1>
      <h3>Designed by {game.designer} in {moment(game.year_released).format('YYYY')}</h3>
        <p>{game.num_of_players} Players & {game.est_time_to_play} minutes to play</p>
        <p style={{ marginBottom: "30px" }}>Ages {game.age_rec} and up</p>
      <hr />
      <h4 style={{ margin: "15px 0px" }}>Categories</h4>
      <div className="category-grid">
        {
          game.categories && game.categories.map(category => {
            return <p className="single-category" key={`category--${category.category_name}`}>{category.category_name}</p>
          })
        }
      </div>
      <hr />
      <div className="new-container">
        <Link className="review-button" to={reviewLink}>Review Game</Link>
      </div>
      <div className="game-reviews">

        {
          gameReviews.map(review => {
            return <em><p className="single-review" key={`review--${review.id}`}>{review.content}</p></em>
          })
        }
      </div>
    </div>
  );
}
