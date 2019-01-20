import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import BackButton from "../component/BackButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			repeat_password: ""
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div className="container blackbg">
						<img src={pokerLogo} className="logo" />
						<h3 className="text-white text-center">Sign up to</h3>
						<h3 className="text-white text-center pb-4">
							ThePokerSociety.com
						</h3>
						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="username"
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
								label="Sign up"
								onClick={e => {
									e.preventDefault();
									if (
										this.state.password ==
										this.state.repeat_password
									) {
										actions.signUp(
											this.state.username,
											this.state.email,
											this.state.password
										);
									} else {
										alert("Password don't match !");
									}
								}}>
								Sign Up{" "}
							</button>
						</div>

						<div className="text-center">
							<Link
								className="navbar-brand text-center"
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
