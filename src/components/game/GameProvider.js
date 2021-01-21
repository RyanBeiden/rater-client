import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
  const [ game, setGame ] = useState([]);
  const [ games, setGames ] = useState([]);
  const [ gameReviews, setGameReviews ] = useState([]);

  const getSingleGame = async (gameId) =>  {
    const response = await fetch(`http://localhost:8000/games/${gameId}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    });
    const value = await response.json();
    return setGame(value);
  };

  const getGames = async () => {
    const response = await fetch("http://localhost:8000/games", {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    });
    const value = await response.json();
    return setGames(value);
  };

  const createGame = (game) => new Promise((resolve, reject) => {
    fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err))
  });

  const createReview = (review) => new Promise((resolve, reject) => {
    fetch("http://localhost:8000/reviews", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    })
      .then((response) => resolve(response.json()))
      .catch((err) => reject(err))
  });

  const getGameReviews = async (gameId) =>  {
    const response = await fetch(`http://localhost:8000/reviews?game_id=${gameId}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    });
    const value = await response.json();
    return setGameReviews(value);
  };

  return (
    <GameContext.Provider value={{ game, getSingleGame, games, getGames, createGame, createReview, gameReviews, getGameReviews }} >
      { props.children }
    </GameContext.Provider>
  )
}