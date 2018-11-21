import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import PropTypes from "prop-types";

export class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			errors: {}
		};
	}

	handleOnChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	handleOnSubmit(e) {
		event.preventDefault();
		const { username, password } = this.state;

		// VALIDATION
		if (username === "") {
			this.setState({ errors: { username: "Username is required" } });
			return;
		}
		if (password === "") {
			this.setState({ errors: { password: "Password is required" } });
			return;
		}

		this.props.history.push("/");
	}

	render() {
		const { username, password, errors } = this.state;

		return (
			<div className="container blackbg p-0 m-0">
				<img src={pokerLogo} className="logo" />
				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="username"
						id="username"
						value={username}
						onChange={e => this.handleOnChange(e)}
						name="username"
						error={errors.username}
					/>
				</div>

				<div className="text-center pt-2">
					<input
						className="inputStyle"
						type="password"
						id="password"
						placeholder="password"
						value={password}
						onChange={e => this.handleOnChange(e)}
						name="password"
						error={errors.password}
					/>
				</div>
				<div className="text-center pt-2 pb-2">
					<a href="#" className="linkStyle">
						{" "}
						Forgot password?
					</a>
				</div>

				<RedButton
					to="/profile"
					label="Login"
					onSubmit={e => this.handleOnSubmit(e)}
				/>

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

Login.propTypes = {
	history: PropTypes.function
};
