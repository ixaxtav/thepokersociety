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
					<table className="table textCenter">
						<thead>
							<tr>
								<th scope="col">Tournament</th>
								<th scope="col">Price</th>
								<th scope="col">Bullets</th>
								<th scope="col">Total</th>
								<th scope="col" />
							</tr>
						</thead>
						<tbody className="textCenter">
							{schedule.attempts.map((s, i) => (
								<tr key={i}>
									<td>{s.tournamentName}</td>
									<td>{s.price}</td>
									<td>
										{s.bullets}{" "}
										<i
											className="fas fa-plus-circle"
											onClick={e =>
												actions.addBullet(
													schedule.id,
													s.tournamentId
												)
											}
										/>{" "}
										<i
											className="fas fa-minus-circle"
											onClick={e =>
												actions.substractBullet(
													schedule.id,
													s.tournamentId
												)
											}
										/>
									</td>
									<td>{s.price * s.bullets}</td>
									<td>
										<i
											className="far fa-trash-alt"
											onClick={e =>
												actions.deleteAttempt(
													schedule.id,
													s.tournamentId
												)
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);
		}}
	</Context.Consumer>
);
