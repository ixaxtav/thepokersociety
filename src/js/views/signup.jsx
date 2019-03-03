import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import PropTypes from "prop-types";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";
import validator from "validator";

export class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			repeat_password: "",
			loading: false
		};
	}

	render() {
		let validateUsernameEmpty = validator.isEmpty(this.state.username);
		let validateEmail = validator.isEmail(this.state.email);
		let validateEmailEmpty = validator.isEmpty(this.state.email);
		let validatePassword = validator.isEmpty(this.state.password);
		let validatePassword2 = validator.isEmpty(this.state.repeat_password);

		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div style={{ backgroundColor: "black", height: "100vh" }}>
						<img src={pokerLogo} className="logo" />
						<h3 className="text-white text-center">Sign up to</h3>
						<h3 className="text-white text-center pb-4">
							ThePokerSociety.com
						</h3>
						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="username"
								autoCapitalize="off"
								autoCorrect="off"
								id="username"
								placeholder="Username"
								onChange={e =>
									this.setState({ username: e.target.value })
								}
								value={this.state.username}
								name="username"
							/>
						</div>
						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="email"
								autoCapitalize="off"
								autoCorrect="off"
								id="email"
								placeholder="Email"
								onChange={e =>
									this.setState({ email: e.target.value })
								}
								value={this.state.email}
								name="email"
							/>
						</div>
						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								autoCapitalize="off"
								autoCorrect="off"
								type="password"
								id="Password"
								placeholder="Password"
								onChange={e =>
									this.setState({ password: e.target.value })
								}
								value={this.state.password}
							/>
						</div>
						<div className="text-center pt-2 pb-4">
							<input
								className="inputStyle"
								autoCapitalize="off"
								autoCorrect="off"
								type="password"
								placeholder="Repeat Password"
								onChange={e =>
									this.setState({
										repeat_password: e.target.value
									})
								}
								value={this.state.repeat_password}
							/>
						</div>
						<div
							className="pt-4"
							style={{
								margin: "auto",
								width: "250px"
							}}>
							<button
								className="loginButton"
								disabled={this.state.loading}
								label="Sign up"
								onClick={e => {
									e.preventDefault();
									this.setState({ loading: true });

									if (
										validateUsernameEmpty == false &&
										validateEmail == true &&
										validateEmailEmpty == false &&
										validatePassword == false &&
										validatePassword2 == false
									) {
										if (
											this.state.password ==
											this.state.repeat_password
										) {
											{
												actions.signUp(
													this.state.username,
													this.state.email,
													this.state.password
												),
													this.props.history.push(
														"/login"
													);
											}
										} else {
											alert("Password don't match !");
											this.setState({
												loading: false
											});
										}
									} else {
										alert(
											"Please fill the required fields."
										);
										this.setState({
											loading: false
										});
									}
								}}>
								{this.state.loading == false
									? "Sign Up"
									: "Loading"}
							</button>
						</div>

						<div className="text-center">
							<Link
								className="navbar-brand text-center pt-4"
								to="/login"
								style={{
									color: "#990000",
									fontSize: "14px"
								}}>
								Back to login
							</Link>
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}
SignUp.propTypes = {
	history: PropTypes.object
};
