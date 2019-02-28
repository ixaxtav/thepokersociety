import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";
import PropTypes from "prop-types";

export default class ScheduleView extends React.Component {
	constructor() {
		super();
		this.state = {
			showButtons: false,
			clickedTournament: false
		};
	}

	handleClick(e) {
		this.setState({ showButtons: !this.state.showButtons });
		console.log("the tournament id is " + e);
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
						<div className="container">
							<h1 className="pt-1"> {schedule.name}</h1>
							<div
								className="row text-center border-top p-2"
								style={{
									fontSize: "16px",
									fontWeight: "bold"
								}}>
								<div className="col-6">Tournament</div>
								<div className="col-2">Price</div>
								<div className="col-2">Bullets</div>
								<div className="col-2">Total</div>
							</div>

							{schedule.attempts.map((s, i) => (
								<div key={i}>
									<div
										className="row text-center border-top p-2"
										style={{
											fontSize: "12px",
											cursor: "pointer"
										}}
										onClick={e => {
											this.handleClick(s.tournamentId);
										}}>
										<div className="col-6">
											<Link
												to={
													"/tournament/" +
													s.tournamentId
												}>
												{s.tournamentName.split(
													" - ",
													2
												)}
											</Link>
										</div>
										<div className="col-2">{s.price}</div>

										<div className="col-2">{s.bullets}</div>

										<div className="col-2">
											{" "}
											$
											{parseFloat(
												s.price.replace("$", "")
											) * s.bullets}
										</div>
									</div>

									{showButtons ? (
										<div className="row text-center border-top p-2">
											<div className="col-4">
												<button
													className="btn btn-light"
													onClick={e =>
														actions.updateBullet(
															schedule.id,
															s.tournamentId,
															s.bullets + 1
														)
													}>
													<i
														className="fas fa-plus-circle"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
													<span
														style={{
															fontSize: "12px"
														}}>
														{" "}
														Add bullets
													</span>
												</button>
											</div>
											<div className="col-4">
												<button
													className="btn btn-light"
													onClick={e =>
														actions.updateBullet(
															schedule.id,
															s.tournamentId,
															s.bullets - 1
														)
													}>
													<i
														className="fas fa-minus-circle"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
													<span
														style={{
															fontSize: "12px"
														}}>
														{" "}
														Remove bullets
													</span>
												</button>
											</div>
											<div className="col-2" />
											<div className="col-2">
												<button
													className="btn btn-light"
													onClick={e =>
														actions.deleteAttempt(
															schedule.id,
															s.tournamentId
														)
													}>
													<i
														className="far fa-trash-alt"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
												</button>
											</div>
										</div>
									) : null}
								</div>
							))}

							<button onClick={e => actions.papaya()}>
								{" "}
								get total{" "}
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

ScheduleView.propTypes = {
	match: PropTypes.object
};
