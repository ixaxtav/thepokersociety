import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";

export default class Schedule extends Component {
	constructor() {
		super();
		this.state = {
			showButtons: false
		};
	}

	render() {
		const { showButtons } = this.state;

		return (
			<Context.Consumer>
				{({ store, actions }) => {
					const schedule = store.schedules.find(
						s => s.id == this.props.match.params.schedule_id
					);
					if (typeof schedule == "undefined") {
						return <h2>Loading...</h2>;
					}

					return (
						<div className="container pt-2">
							<h1 className="pt-1"> {schedule.name}</h1>
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
														"/tournament/" +
														s.tournamentId
													}>
													{s.tournamentName.split(
														" - ",
														1
													)}
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
												{parseFloat(
													s.price.replace("$", "")
												) * s.bullets}
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
							<div className="row border-top w-100 fixed-bottom text-center p-2 m-0">
								<div className="col-6">
									<h3>Spending: ${schedule.total} </h3>
									<span>
										{" "}
										in {schedule.attempts.length}{" "}
										tournaments
									</span>
								</div>
								<div className="col-6">
									<button
										className="btn btn-large btn-outline-dark pb-2"
										style={{ padding: "10px" }}
										onClick={e => {
											e.preventDefault();
											actions.saveAllUserSchedules();
										}}>
										{" "}
										<i
											className="far fa-save"
											style={{
												fontSize: "30px",
												verticalAlign: "middle"
											}}
										/>
										<span> Save Schedule </span>
									</button>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

Schedule.propTypes = {
	match: PropTypes.object
};
