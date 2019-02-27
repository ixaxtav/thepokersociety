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
			if (typeof schedule == "undefined") {
				return <h2>Loading...</h2>;
			}
			return (
				<div className="container pt-2">
					<h3> {schedule.name}</h3>
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
									<td>
										<Link
											to={
												"/tournament/" + s.tournamentId
											}>
											{s.tournamentName.split(" - ", 1)}
										</Link>
									</td>

									<td>{s.price}</td>
									<td>
										{s.bullets}{" "}
										<i
											className="fas fa-plus-circle"
											onClick={e =>
												actions.updateBullet(
													schedule.id,
													s.tournamentId,
													s.bullets + 1
												)
											}
										/>{" "}
										<i
											className="fas fa-minus-circle"
											onClick={e =>
												actions.updateBullet(
													schedule.id,
													s.tournamentId,
													s.bullets - 1
												)
											}
										/>
									</td>
									<td>
										{parseFloat(s.price.replace("$", "")) *
											s.bullets}
									</td>
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
					<button
						className="btn btn-outline-dark btn-block pb-2"
						onClick={e => {
							e.preventDefault();
							actions.saveAllUserSchedules();
						}}>
						{" "}
						Save Tournament
					</button>
					<div className="row text-center pt-2">
						<div className="col">
							<button
								className="btn btn-outline-dark btn-block"
								type="button"
								id="button-addon2"
								onClick={() => history.back()}>
								Back To Tournament
							</button>
						</div>
					</div>
				</div>
			);
		}}
	</Context.Consumer>
);
