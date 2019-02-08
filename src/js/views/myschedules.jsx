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
									</li>
								</ul>
							))}

							{store.creatingNewUser != true ? (
								<div className="row justify-content-center pb-2">
									<div className="col-xs">
										<button
											type="button"
											className="btn btn-outline-dark"
											onClick={() =>
												actions.toggleNewScheduleButton()
											}>
											Add New Schedule
										</button>
									</div>

									<div className="col-xs">
										<button
											type="button"
											className="btn btn-outline-dark"
											onClick={e => {
												actions.addToAllSchedules(
													tour,
													this.state.checkedSchedules
												);
											}}>
											All To Selected Schedule
										</button>
									</div>
								</div>
							) : (
								<div className="row">
									<div className="col-sm-8 mx-auto">
										<div className="input-group mb-3">
											<input
												type="text"
												key="temporalScheduleName"
												className="form-control"
												placeholder="Type here..."
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
									<div className="col-sm-4 mx-auto text-center pb-2">
										<button
											type="button"
											className="btn btn-outline-dark"
											onClick={e => {
												actions.addToAllSchedules(
													tour,
													this.state.checkedSchedules
												);
											}}>
											Add To Selected
										</button>
									</div>
								</div>
							)}
							<div className="row text-center">
								<div className="col">
									<button
										className="btn btn-outline-dark"
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
