import React from "react";
import { Link } from "react-router-dom";
import pokerLogo from "../../img/thepokersocietylogo.jpg";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export class Profile extends React.Component {
	render() {
		const itemStyle = {
			verticalAlign: "top",
			display: "inline-block",
			textAlign: "center",
			width: "50px"
		};

		return (
			<Context.Consumer>
				{({ store, actions }) => (
					console.log(store.user),
					(
						<div className="container pt-2">
							<h3>Hello {store.user.email}</h3>
							<div className="row text-center pt-2">
								<div className="col">
									<Link
										to="/calendar/109584"
										style={{
											color: "black",
											fontSize: "32px"
										}}>
										<i className="far fa-calendar-alt" />
									</Link>
								</div>
								<div className="col">
									<Link
										to="/myschedule"
										style={{
											color: "black",
											fontSize: "32px"
										}}>
										<i className="fas fa-book-open" />
									</Link>
								</div>
								<div className="col">
									<Link
										to="/myaccount"
										style={{
											color: "black",
											fontSize: "32px"
										}}>
										<i className="fas fa-cog" />
									</Link>
								</div>
							</div>
							<div className="row text-center">
								<div className="col">Calendar</div>
								<div className="col">My Schedules</div>
								<div className="col">My Account</div>
							</div>
						</div>
					)
				)}
			</Context.Consumer>
		);
	}
}
