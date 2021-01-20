/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom"

import { GameContext } from "./GameProvider";

import "./Game.css";

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);

  useEffect(() => {
    getGames();
  }, []);

  const gameLink = (gameId) => {
    return `games/${gameId}`
  };

  return (
    <div>
      <div className="new-container">
        <Link className="register-game" to="games/new">Register New Game</Link>
      </div>
      <div className="all-games">
        {
          games.map(game => {
            return <section key={`game--${game.id}`}>
              <Link to={gameLink(game.id)} className="game-title">{game.title}</Link>
            </section>
          })
        }
      </div>
    </div>
  );
}
