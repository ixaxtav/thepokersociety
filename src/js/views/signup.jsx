import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";

export class SignUp extends React.Component {
	render() {
		return (
			<div className="container bgblack">
				<img src={pokerLogo} className="logo" />

				<h3 className="text-white text-center">Sign up to</h3>
				<h3 className="text-white text-center pb-2">
					ThePokerSociety.com
				</h3>

				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="First Name"
						value=""
						name="firstName"
					/>
				</div>

				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="Last Name"
						value=""
						name="lastName"
					/>
				</div>

				<div className="text-center pt-2 pb-4">
					<input
						className="inputStyle"
						type="email"
						placeholder="email"
						value=""
						name="email"
					/>
				</div>

				<RedButton />
			</div>
		);
	}
}
