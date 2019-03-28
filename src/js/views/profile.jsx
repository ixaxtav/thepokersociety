import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";
import PropTypes from "prop-types";
import "../../styles/myschedules.css";
import { Session } from "bc-react-session";

export class Profile extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			username: ""
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					const tour = store.currentTournament;
					if (tour === null) {
						actions.setPlaceholderTournament();
					} else {
						Object.keys(tour).forEach(function(key) {
							if (typeof tour[key] == "number") {
								tour[key] = 0;
							} else if (typeof tour[key] == "string") {
								tour[key] = "";
							}

							return Object.assign(tour, { tour: tour[key] });
						});

						tour => actions.setPlaceholderTournament2(tour);
					}

					return (
						<div className="container pt-2">
							<h3>Hello {store.user.email} !</h3>
							{console.log(store.user)}
							<div className="row text-center pt-2">
								<div className="col">
									<Link
										to="/"
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
										<i className="far fa-list-alt" />
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
								<div className="col">My Schedule</div>
								<div className="col">My Account</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
