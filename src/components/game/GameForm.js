/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect } from "react"
import { CategoryContext } from "../Category/CategoryProvider"

export const GameForm = (props) => {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  return(
    <div className="new-game">
      <h1 style={{ textAlign: "center" }}>New Game</h1>
      <div className="form-style-5">
        <form>
          <fieldset>
            <input type="text" name="game-title" placeholder="Title" />
            <input type="text" name="game-description" placeholder="Description" />
            <input type="text" name="game-designer" placeholder="Designer" />
            <input type="Date" name="game-year" placeholder="Year Released" />
            <input type="number" name="game-number" placeholder="Number of Players" />
            <input type="number" name="game-est" placeholder="Estimated Time to Play" />
            <input type="number" name="game-rec" placeholder="Age Recommendation" />
            <label htmlFor="game-image">Image</label>
            <input type="file" name="game-image" placeholder="Age Recommendation" />
            <label htmlFor="game-category">Categories:</label>
            <select id="categories" name="game-category">
              {
                categories && categories.map(category => {
                  return <option key={`new-category--${category.category_name}`}>{category.category_name}</option>
                })
              }
            </select>      
          </fieldset>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  )
}