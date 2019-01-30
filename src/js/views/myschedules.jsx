import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";
import PropTypes from "prop-types";

export default class MySchedule extends React.Component {
	constructor() {
		super();
		this.state = {
			temporalScheduleName: ""
		};
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					const schedule = store.schedules.find(
						s => s.id == this.props.match.params.schedule_id
					);

					const tour = store.currentTournament;

					return (
						<div className="container">
							<h3>
								To what schedule you want to add this tournament
								to?
							</h3>
							<hr />
							{store.schedules.map((s, i) => (
								<ul key={i} style={{ listStyleType: "none" }}>
									{" "}
									<li>
										{s.name} | Total = {""}
										{s.total}$
										<Link to={"/schedule/" + s.id}>
											<i
												className="fas fa-plus-circle"
												style={{ marginLeft: "15px" }}
												onClick={e =>
													actions.addToSchedule(
														s.id,
														tour
													)
												}
											/>
										</Link>
										<i
											className="far fa-trash-alt"
											style={{ marginLeft: "15px" }}
											onClick={e =>
												actions.deleteOneSchedule(s.id)
											}
										/>
									</li>
								</ul>
							))}

							{store.creatingNewUser != true ? (
								<div className="row justify-content-center pb-2">
									<div className="col">
										<button
											type="button"
											className="btn btn-light form-control border"
											onClick={() =>
												actions.toggleNewScheduleButton()
											}>
											Add New Schedule
										</button>
									</div>
								</div>
							) : (
								<div className="input-group mb-3">
									<input
										type="text"
										key="temporalScheduleName"
										className="form-control"
										placeholder="Type the name of the schedule..."
										aria-label="Recipient's username"
										aria-describedby="button-addon2"
										value={this.state.temporalScheduleName}
										onChange={e =>
											this.setState({
												temporalScheduleName:
													e.target.value
											})
										}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-outline-dark"
											type="button"
											id="button-addon2"
											onClick={() =>
												actions.createSchedule(
													this.state
														.temporalScheduleName
												)
											}>
											Accept
										</button>
									</div>{" "}
								</div>
							)}
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}

MySchedule.propTypes = {
	match: PropTypes.object
};
