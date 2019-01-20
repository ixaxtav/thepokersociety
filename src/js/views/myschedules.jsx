import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export const MySchedules = () => (
	<Context.Consumer>
		{({ store, actions }) => {
			console.log(store);
			return (
				<div className="container">
					<h3>
						To what schedule you want to add this tournament to?
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
									/>

									<i
										className="far fa-trash-alt"
										style={{ marginLeft: "15px" }}
									/>
								</Link>
							</li>
						</ul>
					))}

					{store.creatingNewUser == true ? (
						<div className="row justify-content-center pb-2">
							<div clssName="col">
								<button
									type="button"
									className="btn btn-primary "
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
								className="form-control"
								placeholder="Recipient's username"
								aria-label="Recipient's username"
								aria-describedby="button-addon2"
							/>
							<div className="input-group-append">
								<button
									className="btn btn-outline-primary"
									type="button"
									id="button-addon2">
									Accept
								</button>
							</div>
						</div>
					)}
				</div>
			);
		}}
	</Context.Consumer>
);
