import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export const ScheduleView = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			const schedule = store.schedules.find(
				s => s.id == property.match.params.schedule_id
			);

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
							{schedule.tournament.map((s, i) => (
								<tr key={i}>
									<td>{s.post_title}</td>
									<td />
									<td>$2,600</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		}}
	</Context.Consumer>
);
