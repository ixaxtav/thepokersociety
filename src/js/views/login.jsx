import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";
import { BrowserRouter } from "react-router-dom";

export class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div className="container blackbg p-0 m-0">
						<img src={pokerLogo} className="logo" />
						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="text"
								id="username"
								placeholder="username"
								value={this.state.username}
								onChange={e =>
									this.setState({ username: e.target.value })
								}
								onKeyDown={e => {
									if (e.keyCode === 13) {
										e.preventDefault();
										{
											actions.login(
												this.state.username,
												this.state.password,
												error => {
													if (!error)
														this.props.history.push(
															"/profile"
														);
													else alert(error.message);
												}
											);
										}
									}
								}}
							/>
						</div>

						<div className="text-center pt-2">
							<input
								className="inputStyle"
								type="password"
								id="password"
								placeholder="password"
								value={this.state.password}
								onChange={e =>
									this.setState({ password: e.target.value })
								}
								onKeyDown={e => {
									if (e.keyCode === 13) {
										e.preventDefault();
										{
											actions.login(
												this.state.username,
												this.state.password,
												error => {
													if (!error)
														this.props.history.push(
															"/profile"
														);
													else alert(error.message);
												}
											);
										}
									}
								}}
							/>
						</div>
						<div className="text-center pt-2 pb-2">
							<a href="#" className="linkStyle">
								{" "}
								Forgot password?
							</a>
						</div>

						<div
							className="pt-4"
							style={{
								margin: "auto",
								width: "250px"
							}}>
							<button
								style={{
									backgroundColor: "#62010C",
									border: "none",
									color: "white",
									textAlign: "center",
									textDecoration: "none",
									display: "inline-block",
									fontSize: "26px",
									width: "250px"
								}}
								label="Login"
								onClick={e => {
									e.preventDefault();
									{
										actions.login(
											this.state.username,
											this.state.password,
											error => {
												if (!error)
													this.props.history.push(
														"/profile"
													);
												else alert(error.message);
											}
										);
									}
								}}
								onKeyPress={e => {
									if (e.keyCode === 13) {
										e.preventDefault();
										{
											actions.login(
												this.state.username,
												this.state.password,
												error => {
													if (!error)
														this.props.history.push(
															"/profile"
														);
													else alert(error.message);
												}
											);
										}
									}
								}}>
								Log In{" "}
							</button>
						</div>

						<div className="pt-5 text-center">
							<span className="text-white">
								Dont have an account?
							</span>
							<br />
							<Link
								className="navbar-brand"
								to="/register"
								style={{ color: "#990000", fontSize: "14px" }}>
								Click here to create one
							</Link>
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}

Login.propTypes = {
	history: PropTypes.object
};
