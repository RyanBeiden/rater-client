/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../Category/CategoryProvider"
import { GameContext } from "./GameProvider";

const getGameById = (gameId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/games/${gameId}`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${localStorage.getItem("gr_token")}`
    }
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err))
});

export const UpdateGameForm = (props) => {
  const { updateGame } = useContext(GameContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { gameId } = props.match.params;

  const [game, setGame] = useState({});

  useEffect(() => {
    getCategories();
    getGameById(gameId)
      .then((response) => setGame({
        title: response.title,
        description: response.description,
        designer: response.designer,
        yearReleased: response.year_released,
        numOfPlayers: response.num_of_players,
        estTimeToPlay: response.est_time_to_play,
        ageRec: response.est_time_to_play,
        imageUrl: response.image_url,
        categories: response.categories
      }));
  }, []);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  const handleInputChange = (e) => {
    const newGameState = Object.assign({}, game);
    switch (e.target.type) {
      case 'text':
      case 'date':
      case 'number':
        newGameState[e.target.name] = e.target.value;
        break;
      case 'select-one':
        newGameState['categories'] = [(parseInt(e.target.value))];
        break;
      case 'file':
        getBase64(e.target.files[0], (base64ImageString) => {
          const newGameState = Object.assign({}, game);
          newGameState['imageUrl'] = base64ImageString;
          setGame(newGameState);
        });
        break;
      default:
        console.error("This is not a matching input type.")
    }
    setGame(newGameState);
  }

  const saveGame = async (e) => {
    e.preventDefault();

    const newGame = {
      title: game.title,
      description: game.description,
      designer: game.designer,
      year_released: game.yearReleased,
      est_time_to_play: parseInt(game.estTimeToPlay),
      num_of_players: parseInt(game.numOfPlayers),
      age_rec: parseInt(game.ageRec),
      image_url: game.imageUrl,
      categories: game.categories,
    };

    await updateGame(gameId, newGame)
      .then((response) => props.history.push(`/games/${response}`));
  }

  return (
    <div className="new-game">
      <h1 style={{ textAlign: "center" }}>Edit {game.title}</h1>
      <div className="form-style-5">
        <form>
          <fieldset>
            <input type="text" defaultValue={game.title} name="title" placeholder="Title" onChange={handleInputChange} required />
            <input type="text" defaultValue={game.description} name="description" placeholder="Description" onChange={handleInputChange} required />
            <input type="text" defaultValue={game.designer} name="designer" placeholder="Designer" onChange={handleInputChange} required />
            <input type="date" defaultValue={game.yearReleased} name="yearReleased" placeholder="Year Released" onChange={handleInputChange} required />
            <input type="number" defaultValue={game.numOfPlayers} name="numOfPlayers" placeholder="Number of Players" onChange={handleInputChange} required />
            <input type="number" defaultValue={game.estTimeToPlay} name="estTimeToPlay" placeholder="Estimated Time to Play" onChange={handleInputChange} required />
            <input type="number" defaultValue={game.ageRec} name="ageRec" placeholder="Age Recommendation" onChange={handleInputChange} required />
            <label htmlFor="imageUrl">Image</label>
            <input type="file" name="imageUrl" onChange={handleInputChange} />
            <label htmlFor="categoryId">Categories:</label>
            <select id="categories" name="categoryId" onChange={handleInputChange}>
              {
                game.categories
                  ? <option value={game.categories[0].id}>{game.categories[0].category_name}</option>
                  : <option>Select a category</option>
              }
              {
                game.categories && categories
                  .filter(category => category.id !== game.categories[0].id)
                  .map(category => {
                      return <option key={`new-category--${category.category_name}`} value={category.id}>{category.category_name}</option>
                  })
              }
            </select>      
          </fieldset>
          <input type="submit" value="Update" onClick={saveGame} />
        </form>
      </div>
    </div>
  )
}
