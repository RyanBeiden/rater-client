import React from "react"
import { Link } from "react-router-dom"
import GameProvider from "./GameProvider.js"

import "./Game.css"

class GameList extends React.Component {
  state = {
    games: []
  }

  componentDidMount() {
    GameProvider.getGames()
      .then((res) => this.setState({ games: res }))
  }

  render() {
    const { games } = this.state;

    const gameLink = (gameId) => {
      return `games/${gameId}`
    }

    return (
      <div>
        <div className="new-container">
          <Link className="register-game" to="/">Register New Game</Link>
        </div>
        <div className="all-games">
          {
            games.map(game => {
              return <section key={`game--${game.id}`}>
                <Link to={gameLink(game.id)} className="game-title">{game.title}</Link>
              </section>
            })
          }
        </div>
      </div>
    )
  }
}

export default GameList;