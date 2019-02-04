import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";
import PropTypes from "prop-types";
import "../../styles/myschedules.css";

export default class MySchedule extends React.Component {
	constructor() {
		super();
		this.state = {
			temporalScheduleName: "",
			checkedSchedules: []
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
					{
						console.log(this.state.checkedSchedules);
					}
					return (
						<div className="container">
							<h3 className="mt-4">
								To what schedule you want to add this tournament
								to?
							</h3>
							<hr />
							{store.schedules.map((s, i) => (
								<ul
									key={i}
									style={{
										listStyleType: "none",
										paddingLeft: "0"
									}}>
									<li style={{ fontSize: "16px" }}>
										<label className="checkboxes">
											<input
												type="checkbox"
												checked={this.state.checkedSchedules.find(
													item => item === s.id
												)}
												onChange={e => {
													if (e.target.checked) {
														this.setState({
															checkedSchedules: this.state.checkedSchedules.concat(
																[s.id]
															)
														});
													} else {
														this.setState({
															checkedSchedules: this.state.checkedSchedules.filter(
																item =>
																	item != s.id
															)
														});
													}
												}}
											/>{" "}
											<span>
												{" "}
												<Link to={"/schedule/" + s.id}>
													{s.name}{" "}
												</Link>{" "}
												| Total = {""}
												{s.total}$
											</span>
										</label>
										<i
											className="far fa-trash-alt float-right"
											style={{
												fontSize: "26px",
												verticalAlign: "middle"
											}}
											onClick={e =>
												actions.deleteOneSchedule(s.id)
											}
										/>

										<Link to={"/schedule/" + s.id}>
											<i
												className="fas fa-plus-circle float-right"
												style={{
													fontSize: "26px",
													verticalAlign: "middle",
													marginRight: "25px"
												}}
												onClick={e =>
													actions.addToSchedule(
														s.id,
														tour
													)
												}
											/>
										</Link>
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
								<div className="row justify">
									<div className="col">
										<div className="input-group mb-3">
											<input
												type="text"
												key="temporalScheduleName"
												className="form-control"
												placeholder="Type the name of the schedule..."
												aria-label="Recipient's username"
												aria-describedby="button-addon2"
												value={
													this.state
														.temporalScheduleName
												}
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
									</div>
								</div>
							)}
							<div className="row text-center">
								<div className="col">
									<button
										className="btn btn-light border"
										onClick={e => {
											actions.addToAllSchedules(
												tour,
												this.state.checkedSchedules
											);
										}}>
										{" "}
										Add to All
									</button>
									<button
										className="btn btn-light border"
										onClick={e => {
											e.preventDefault();
											actions.saveAllUserSchedules();
										}}>
										{" "}
										Save in All Schedules
									</button>
								</div>
								{console.log()}
							</div>
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
