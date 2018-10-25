import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";

export class Login extends React.Component {
	render() {
		return (
			<div className="container blackbg p-0 m-0">
				<img src={pokerLogo} className="logo" />
				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="username"
						value=""
						name="username"
					/>
				</div>

				<div className="text-center pt-2">
					<input
						className="inputStyle"
						type="password"
						placeholder="password"
						value=""
						name="password"
					/>
				</div>
				<div className="text-center pt-2 pb-2">
					<a href="#" className="linkStyle">
						{" "}
						Forgot password?
					</a>
				</div>

				<RedButton />

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
