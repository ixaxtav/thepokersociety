import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import validator from "validator";

export class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}

	handleChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	handleSubmit(e) {
		event.preventDefault();
	}

	render() {
		return (
			<div className="container blackbg p-0 m-0">
				<img src={pokerLogo} className="logo" />
				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="username"
						id="username"
						value={this.state.username}
						onChange={e => this.handleChange(e)}
						name="username"
					/>
				</div>

				<div className="text-center pt-2">
					<input
						className="inputStyle"
						type="password"
						id="password"
						placeholder="password"
						value={this.state.password}
						onChange={e => this.handleChange(e)}
						name="password"
					/>
				</div>
				<div className="text-center pt-2 pb-2">
					<a href="#" className="linkStyle">
						{" "}
						Forgot password?
					</a>
				</div>

				<RedButton to="/profile" label="Login" />

				<div className="pt-5 text-center">
					<span className="text-white">Dont have an account?</span>
					<br />
					<Link
						className="navbar-brand"
						to="/register"
						style={{ color: "#990000", fontSize: "14px" }}>
						Click here to create one
					</Link>
				</div>
			</div>
		);
	}
}
