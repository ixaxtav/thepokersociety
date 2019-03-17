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

					if (tour == null) {
						return <h2>Loading...</h2>;
					}

					return (
						<div className="container">
							{tour.ID == 0 || tour == {} ? (
								<h1
									className="pt-4 pb-4"
									style={{
										fontFamily: "Staatliches",
										color: "black"
									}}>
									My Schedules
								</h1>
							) : (
								<div>
									<h3
										className="pt-4"
										style={{
											fontFamily: "Staatliches",
											color: "black"
										}}>
										To what schedule you want to add this
										tournament to?
									</h3>
									<span
										style={{
											fontSize: "10px",
											fontStyle: "italic"
										}}>
										*Adding :
										{tour.post_title.split(" - ", 2)},{" "}
										Buy-in:
										{tour["buy-in"]}*
									</span>
									<hr />
								</div>
							)}
							{store.schedules.map((s, i) => (
								<ul
									key={i}
									style={{
										listStyleType: "none",
										paddingLeft: "0"
									}}>
									<li style={{ fontSize: "16px" }}>
										<label className="checkboxes">
											{tour.ID == 0 ? null : (
												<input
													type="checkbox"
													style={{
														width: "30px",
														height: "30px",
														marginRight: "15px"
													}}
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
																		item !=
																		s.id
																)
															});
														}
													}}
												/>
											)}

											<span className="pl-2">
												{"    "}
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
									</li>
								</ul>
							))}

							{store.creatingNewUser != true ? (
								<div className="row justify-content-center  text-center pb-2">
									<div className="col-7">
										<button
											type="button"
											className="btn btn-outline-dark btn-block"
											onClick={() =>
												actions.toggleNewScheduleButton()
											}>
											Create New Schedule
										</button>
									</div>
								</div>
							) : (
								<div className="row">
									<div className="col-sm-6 mx-auto">
										<div className="input-group mb-3">
											<input
												type="text"
												key="temporalScheduleName"
												className="form-control"
												placeholder="Create name here..."
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
												onKeyDown={e => {
													if (e.keyCode === 13) {
														e.preventDefault();
														actions.createSchedule(
															this.state
																.temporalScheduleName
														);
														actions.toggleNewScheduleButton();
													}
												}}
											/>
											<div className="input-group-append">
												<button
													className="btn btn-outline-dark"
													type="button"
													id="button-addon2"
													onClick={() => {
														actions.createSchedule(
															this.state
																.temporalScheduleName
														),
															actions.toggleNewScheduleButton();
													}}>
													Accept
												</button>
											</div>{" "}
										</div>
									</div>
								</div>
							)}
							{store.schedules.length === 0 ||
							tour.ID == 0 ? null : (
								<div className="row  text-center justify-content-center pb-2">
									<div className="col-7">
										<button
											type="button"
											className="btn btn-outline-dark btn-block"
											onClick={e => {
												actions.addToAllSchedules(
													tour,
													this.state.checkedSchedules
												);
											}}>
											Add To My Schedule
										</button>
									</div>
								</div>
							)}
							<div className="row text-center justify-content-center">
								<div className="col-7">
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
	}
}

MySchedule.propTypes = {
	match: PropTypes.object
};
