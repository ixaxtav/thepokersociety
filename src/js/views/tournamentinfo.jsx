import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import BackButton from "../component/BackButton.jsx";
import { FilterDropdown } from "../component/FilterDropdown.jsx";
import { Context } from "../store/appContext.jsx";

export class TournamentInfo extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div className="container pt-2">
						<h1>Hard Rock Cafe isle Pompano</h1>
						<table className="table">
							<tbody>
								<tr
									style={{
										backgroundColor: "#696969",
										fontWeight: "bold",
										color: "white",
										textAlign: "center"
									}}>
									<th>Vegas 2012</th>
									<th>$2,600</th>
									<th>Binds</th>
								</tr>
								<tr
									style={{
										backgroundColor: "#D3D3D3",
										color: "black",
										textAlign: "center"
									}}>
									<td>$175</td>
									<td>16,000</td>
									<td>20</td>
								</tr>
							</tbody>
						</table>
						<h5 style={{ textAlign: "center" }}>
							Registration open until the beginning of Level Nine.
							1 in 10 will receive a $560 seat entry into SHRPO #1
						</h5>
						<div className="row text-center pt-2">
							<div className="col">
								<Link
									to="/calendar/99611"
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
									<i className="far fa-clipboard" />
								</Link>
							</div>
							<div className="col">
								<Link
									to="/"
									style={{
										color: "black",
										fontSize: "32px"
									}}>
									<i className="fas fa-plus-circle" />
								</Link>
							</div>
						</div>
						<div className="row text-center">
							<div className="col">Back to Calendar</div>
							<div className="col">View Structure</div>
							<div className="col">Add to my schedule</div>
						</div>
					</div>
				)}
			</Context.Consumer>
		);
	}
}
