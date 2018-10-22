import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";

export class Login extends React.Component {
	render() {
		return (
			<div className="container bgblack">
				<img src={pokerLogo} className="logo" />
				<div className="mxAuto">
					<input
						type="text"
						placeholder="username"
						value=""
						name="username"
					/>
				</div>

				<div className="mx-auto">
					<input
						type="password"
						placeholder="password"
						value=""
						name="password"
					/>
				</div>
				<div className="text-right pr-5">
					<a href="#"> Forgot password?</a>
				</div>

				<RedButton />

				<div>
					<a href="#">Click here to create one</a>
				</div>
			</div>
		);
	}
}
