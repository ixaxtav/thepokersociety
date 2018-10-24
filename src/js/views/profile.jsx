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
			<div className="container pt-2">
				<h3>Hello Lou Stadlet</h3>
				<div className="row text-center pt-2">
					<div className="col">
						<i className="far fa-calendar-alt" />
					</div>
					<div className="col">
						<i className="fas fa-book-open" />
					</div>
					<div className="col">
						<i className="fas fa-cog" />
					</div>
				</div>
				<div className="row text-center">
					<div className="col">Calendar</div>
					<div className="col">My Schedules</div>
					<div className="col">My Account</div>
				</div>
			</div>
		);
	}
}
