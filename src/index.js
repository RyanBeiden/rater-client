import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { GamerRater } from "./components/GamerRater"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GamerRater />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)