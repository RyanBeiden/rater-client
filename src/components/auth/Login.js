import React from "react"
import { Link } from "react-router-dom"
import "./Auth.css"


export const Login = props => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "gr_token", res.token )
                    localStorage.setItem( "gr_user_id", res.user_id )
                    props.history.push("/games")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <div>
                <dialog className="dialog dialog--auth" ref={invalidDialog}>
                    <div>Email or password was not valid.</div>
                    <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
                </dialog>
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h1>Gamer Rater</h1>
                        <h4>Please sign in</h4>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" id="email" className="form-control"  placeholder="Email address" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" id="password" className="form-control"  placeholder="Password" required />
                        </fieldset>
                        <fieldset style={{
                            textAlign:"center"
                        }}>
                            <button className="login-button" type="submit">Sign In</button>
                        </fieldset>
                        <p style={{ color: "#fff" }}>Not a member yet? <Link to="/register" style={{ textDecoration: "underline", color: "#4cb68d" }}>Register</Link></p>
                    </form>
                </section>
            </div>
        </main>
    )
}
