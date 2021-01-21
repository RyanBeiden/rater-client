import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
  const [ game, setGame ] = useState([]);
  const [ games, setGames ] = useState([]);

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

  return (
    <GameContext.Provider value={{ game, getSingleGame, games, getGames, createGame }} >
      { props.children }
    </GameContext.Provider>
  )
}