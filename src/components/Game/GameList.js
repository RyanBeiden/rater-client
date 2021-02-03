/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { GameContext } from "./GameProvider";

import "./Game.css";
import { FormControl, FormGroup } from "react-bootstrap";

export const GameList = (props) => {
  const { games, getGames, queryGames, sortGames } = useContext(GameContext);

  useEffect(() => {
    getGames();
  }, []);

  const [ query, setQuery ] = useState()

  const gameLink = (gameId) => {
    return `games/${gameId}`
  };

  const onKeyUpValue = (event) => {
    if (event.charCode === 13) {
      queryGames(query)
    }
  }

  return (
    <div>
      <div className="new-container">
        <Link className="register-game" to="games/new">Register New Game</Link>
        <div className="search-container">
          <FormGroup>
            <FormControl
              className="search-game"
              onChange={changeEvent => setQuery(changeEvent.target.value)}
              onKeyPress={onKeyUpValue}
            />
            <button type="submit" className="search-button" onClick={() => queryGames(query)}>Search</button>
          </FormGroup>
          <div className="sort-container">
            <select className="sort-select" onChange={changeEvent => sortGames(changeEvent.target.value)}>
              <option value="">Sort Games</option>
              <option value="year_released">Year Released</option>
              <option value="est_time_to_play">Estimated time to play</option>
              <option value="designer">Designer</option>
            </select>
          </div>
        </div>
      </div>
      <div className="all-games">
        {
          games.map(game => {
            return <div className="game-container" key={`game--${game.id}`}>
                <Link to={gameLink(game.id)} className="game-title">{game.title}</Link>
                <h5 className="game-designer">{game.designer}</h5>
                <p className="game-description">{game.description}</p>
              </div>
          })
        }
      </div>
    </div>
  );
}
