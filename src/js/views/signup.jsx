import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import BackButton from "../component/BackButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";

export class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: ""
		};
	}

	handleOnChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}

	handleSubmit(e) {
		event.preventDefault();
	}
	render() {
		return (
			<div className="container blackbg">
				<img src={pokerLogo} className="logo" />
				<h3 className="text-white text-center">Sign up to</h3>
				<h3 className="text-white text-center pb-4">
					ThePokerSociety.com
				</h3>
				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						id="firstName"
						placeholder="First Name"
						onChange={e => this.handleOnChange(e)}
						value={this.state.firstName}
						name="firstName"
					/>
				</div>
				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						id="lastName"
						placeholder="Last Name"
						onChange={e => this.handleOnChange(e)}
						value={this.state.lastName}
						name="lastName"
					/>
				</div>
				<div className="text-center pt-2 pb-4">
					<input
						className="inputStyle"
						type="email"
						id="email"
						placeholder="email"
						onChange={e => this.handleOnChange(e)}
						value={this.state.email}
						name="email"
					/>
				</div>
				<RedButton
					to="/login"
					label="Sign up"
					onClick={() => this.onSubmit()}
				/>

				<div className="text-center">
					<Link
						className="navbar-brand text-center"
						to="/login"
						style={{ color: "#990000", fontSize: "14px" }}>
						Back to login
					</Link>
				</div>
			</div>
		);
	}
}
