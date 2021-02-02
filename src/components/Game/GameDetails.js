/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { GameContext } from "./GameProvider";
import { Link } from "react-router-dom";
import moment from 'moment';

import "./Game.css";

export const GameDetails = (props) => {
  const { game, getSingleGame, gameReviews, getGameReviews, createRating, getRating, updateRating } = useContext(GameContext);
  const { gameId } = props.match.params;
  const reviewLink = `${gameId}/review`;

  useEffect(() => {
    getSingleGame(gameId);
    getGameReviews(gameId);
  }, []);

  const [ newRating, setNewRating ] = useState(1);

  const saveRating = (e) => {
    e.preventDefault();
    const value = parseInt(newRating);
    const game = parseInt(gameId);

    const incomingRating = {
      value,
      game
    };

    getRating(game)
      .then((res) => {
        if (res.length > 0) {
          updateRating(res[0].id, incomingRating)
            .then(() => getSingleGame(gameId));
        } else if (res.length <= 0) {
          createRating(incomingRating)
            .then(() => getSingleGame(gameId));
        }
      });
  }

  return (
    <div className="single-game">
      <div className="image-container">
        <img className="game-image" src={game.image_url} alt={game.title} />
      </div>
        <h1 style={{ marginTop: "10px" }}>{game.title}</h1>
        <h3>Designed by {game.designer} in {moment(game.year_released).format('YYYY')}</h3>
        <p style={{ margin: "10px 0px 20px 0px", fontSize: "1.1em" }}>{game.num_of_players} Players | {game.est_time_to_play} minutes to play | Ages {game.age_rec} and up</p>
      <div className="category-grid">
        {
          game.categories && game.categories.map(category => {
            return <p className="single-category" key={`category--${category.category_name}`}>{category.category_name}</p>
          })
        }
      </div>
      <div className="rating-container">
        <div className="average-rating">
          <h4>Average Rating</h4>
          <RangeSlider
            value={game.average_rating || 0}
            step={.1}
            min={0}
            max={10}
            variant="dark"
            disable={true}
            tooltip="on"
          />
        </div>
        <div className="rating-selector">
          <h4>Pick your rating</h4>
          <RangeSlider
            value={newRating}
            onChange={changeEvent => setNewRating(changeEvent.target.value)}
            min={1}
            max={10}
            variant="primary"
          />
          <button className="rating-save" onClick={saveRating}>Save</button>
        </div>
      </div>
      <hr />
      <div className="review-container">
        <Link className="review-button" to={reviewLink}>Review Game</Link>
      </div>
      <div className="game-reviews">
        {
          gameReviews.map(review => {
            return <p className="single-review" key={`review--${review.id}`}><em>{review.content}</em></p>
          })
        }
      </div>
    </div>
  );
}
