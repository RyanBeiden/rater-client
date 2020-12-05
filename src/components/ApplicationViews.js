import React from "react"
import { Route } from "react-router-dom"
import GameList from "./Game/GameList"
import GameDetails from "./Game/GameDetails"
import { GameForm } from "./Game/GameForm"


class ApplicationViews extends React.Component {
  render() {
    return <>
    <main style={{
        margin: "0",
        lineHeight: "1.75rem"
      }}> 
        <Route exact path="/games" render={(props) => {
          return <GameList {...props} />
        }} />

        <Route exact path="/games/:gameId" render={(props) => {
          return <GameDetails {...props} />
        }} />

        <Route exact path="/game/new" render={(props) => {
          return <GameForm {...props} />
        }} />
    </main>
  </>
  }
}

export default ApplicationViews;
