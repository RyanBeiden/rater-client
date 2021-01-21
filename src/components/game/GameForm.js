/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../Category/CategoryProvider"
import { GameContext } from "./GameProvider";

export const GameForm = (props) => {
  const { createGame, getSingleGame } = useContext(GameContext);
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  const [currentGame, setCurrentGame] = useState({
    title: "",
    description: "",
    designer: "",
    yearReleased: "",
    numOfPlayers: 0,
    estTimeToPlay: 0,
    ageRec: 0,
    imageUrl: "",
    categories: []
  });

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  }

  const handleInputChange = (e) => {
    const newGameState = Object.assign({}, currentGame);
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
          const newGameState = Object.assign({}, currentGame);
          newGameState['imageUrl'] = base64ImageString;
          setCurrentGame(newGameState);
        });
        break;
      default:
        console.error("This is not a matching input type.")
    }
    setCurrentGame(newGameState);
  }

  const saveGame = async (e) => {
    e.preventDefault();

    const newGame = {
      title: currentGame.title,
      description: currentGame.description,
      designer: currentGame.designer,
      year_released: currentGame.yearReleased,
      est_time_to_play: parseInt(currentGame.estTimeToPlay),
      num_of_players: parseInt(currentGame.numOfPlayers),
      age_rec: parseInt(currentGame.ageRec),
      image_url: currentGame.imageUrl,
      categories: currentGame.categories,
    };

    await createGame(newGame)
      .then((response) => props.history.push(`/games/${response.id}`));
  }

  return(
    <div className="new-game">
      <h1 style={{ textAlign: "center" }}>New Game</h1>
      <div className="form-style-5">
        <form>
          <fieldset>
            <input type="text" name="title" placeholder="Title" onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Description" onChange={handleInputChange} required />
            <input type="text" name="designer" placeholder="Designer" onChange={handleInputChange} required />
            <input type="date" name="yearReleased" placeholder="Year Released" onChange={handleInputChange} required />
            <input type="number" name="numOfPlayers" placeholder="Number of Players" onChange={handleInputChange} required />
            <input type="number" name="estTimeToPlay" placeholder="Estimated Time to Play" onChange={handleInputChange} required />
            <input type="number" name="ageRec" placeholder="Age Recommendation" onChange={handleInputChange} required />
            <label htmlFor="imageUrl">Image</label>
            <input type="file" name="imageUrl" onChange={handleInputChange} />
            <label htmlFor="categoryId">Categories:</label>
            <select id="categories" name="categoryId" onChange={handleInputChange}>
              {
                categories && categories.map(category => {
                  return <option key={`new-category--${category.category_name}`} value={category.id}>{category.category_name}</option>
                })
              }
            </select>      
          </fieldset>
          <input type="submit" value="Create" onClick={saveGame} />
        </form>
      </div>
    </div>
  )
}