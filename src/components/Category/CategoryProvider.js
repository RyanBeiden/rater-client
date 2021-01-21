import React, { useState } from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
  const [ categories, setCategories ] = useState([])

  const getCategories = async () => {
    const response = await fetch("http://localhost:8000/categories", {
      method: 'GET',
      headers: {
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
    })
    const value = await response.json()
    return setCategories(value)
  }

  return (
    <CategoryContext.Provider value={{ categories, getCategories }} >
      { props.children }
    </CategoryContext.Provider>
  )
}
