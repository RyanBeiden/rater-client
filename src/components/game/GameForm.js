import React, { useContext, useEffect } from "react"
import { CategoryContext } from "../Category/CategoryProvider"

export const GameForm = (props) => {
  const { categories, getCategories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories()
  }, [])

  return(
    <h1>New Game</h1>
  )
}