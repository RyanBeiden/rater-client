import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="nav-link" to="/games">Games</Link>
      </li>
      {
        (localStorage.getItem("gr_token") !== null) ?
          <li className="navbar__item log-link"
            onClick={() => {
              localStorage.removeItem("gr_token")
              props.history.push({ pathname: "/" })
            }}
            >Logout
          </li> :
          <>
            <li className="navbar__item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="navbar__item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
      }
    </ul>
  )
}
