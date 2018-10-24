import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import BackButton from "../component/BackButton.jsx";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";

export class Profile extends React.Component {
	render() {
		const itemStyle = {
			verticalAlign: "top",
			display: "inline-block",
			textAlign: "center",
			width: "50px"
		};

		return (
			<div className="container">
				<h1>Hello Lou Stadlet</h1>
				<div className="row justify-content-center itemStyle">
					<div className="col-xs">
						<i className="far fa-calendar-alt" /> Tournament
						Calendar
					</div>
					<div className="col-xs">
						<i className="fas fa-book-open" /> My Schedules
					</div>
					<div className="col-xs">
						<i className="fas fa-cog" /> My Account
					</div>
				</div>
			</div>
		);
	}
}
