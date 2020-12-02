import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList"


export const ApplicationViews = () => {
  return <>
    <main style={{
        margin: "5rem 2rem",
        lineHeight: "1.75rem"
      }}> 
        
      <Route exact path="/games" render={props => <GameList />} />

    </main>
  </>
}
