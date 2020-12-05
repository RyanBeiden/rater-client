import React from "react"
import GameProvider from "./GameProvider"

import "./Game.css"

class GameDetails extends React.Component {
  state = {
    game: {},
    categories: []
  }

  componentDidMount() {
    const { gameId } = this.props.match.params;

    GameProvider.getSingleGame(gameId)
      .then((res) => this.setState({ game: res, categories: res.categories }))
  }

  render() {
    const { game, categories } = this.state;

    const allCategories = categories.map((cat) =>
      <p key={`category--${cat.category_name}`}>{cat.category_name}</p>
    );

    return (
      <div className="single-game">
        <div className="image-container">
          <img className="game-image" src={game.image_url} alt={game.title} />
        </div>
        <h1>{game.title}</h1>
        <h3>Designer: {game.designer}</h3>
        <p>Year Released: {game.year_released}</p>
        <p>Estimated Time To Play: {game.est_time_to_play}</p>
        <p>Age Recommendation: {game.age_rec}</p>
        <div>Categories:
          {allCategories}
        </div>
      </div>
    )
  }
}

export default GameDetails;