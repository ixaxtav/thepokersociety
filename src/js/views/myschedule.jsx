import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export class MySchedule extends React.Component {
	render() {
		return (
			<div className="container pt-2">
				<h3>All Schedules</h3>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Schedule name</th>
							<th scope="col">Games</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Vegas 2012</td>
							<td>12</td>
							<td>$2,600</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
