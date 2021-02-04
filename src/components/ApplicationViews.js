import React from "react";
import { Route } from "react-router-dom";

import { CategoryProvider } from './Category/CategoryProvider';
import { GameProvider } from './Game/GameProvider';
import { GameList } from "./Game/GameList";
import { GameDetails } from "./Game/GameDetails";
import { GameForm } from "./Game/GameForm";
import { ReviewForm } from "./Game/ReviewForm";
import { UpdateGameForm } from "./Game/UpdateGame";


class ApplicationViews extends React.Component {
  render() {
    return <>
    <main style={{ margin: "0", lineHeight: "1.75rem" }}> 
      
      <GameProvider>
        <Route exact path="/games" render={(props) => {return <GameList {...props} /> }} />
        <Route exact path="/games/:gameId(\d+)" render={(props) => { return <GameDetails {...props} /> }} />
        <Route exact path="/games/:gameId(\d+)/review" render={(props) => { return <ReviewForm {...props} /> }} />
        <CategoryProvider>
          <Route exact path="/games/new" render={(props) => { return <GameForm {...props} /> }} />
          <Route exact path="/games/:gameId(\d+)/edit" render={(props) => { return <UpdateGameForm {...props} /> }} />
        </CategoryProvider>
      </GameProvider>
      
    </main>
  </>
  }
}

export default ApplicationViews;
