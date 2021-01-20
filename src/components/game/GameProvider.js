import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
  const [ game, setGame ] = useState([]);
  const [ games, setGames ] = useState([]);

  const getSingleGame = async (gameId) =>  {
    const response = await fetch(`http://localhost:8000/games/${gameId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    });
    const value = await response.json();
    return setGame(value);
  };

  const getGames = async () => {
    const response = await fetch("http://localhost:8000/games", {
      method: 'GET',
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    });
    const value = await response.json();
    return setGames(value);
  };

  return (
    <GameContext.Provider value={{ game, getSingleGame, games, getGames }} >
      { props.children }
    </GameContext.Provider>
  )
}