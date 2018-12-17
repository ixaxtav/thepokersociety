import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";
import { Link } from "react-router-dom";

export const TournamentView = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			//if there is no tournaments, i go and fetch for them
			if (
				store.currentTournament === null ||
				store.currentTournament.ID !=
					property.match.params.tournament_id
			) {
				actions.fetchSingleTournaments(
					property.match.params.tournament_id
				);
				return <div>Loading tournaments... </div>;
			}

			const tour = store.currentTournament;

			return (
				<div>
					<h4
						className="mt-4"
						style={{ textAlign: "center" }}
						onClick={() => actions.addToSchedule(tour)}>
						{tour ? tour.post_title : "Tournament not found"}
					</h4>
					<ul>
						{store.schedule.map(tournament => (
							<li key={tournament.ID}>{tournament.ID}</li>
						))}
					</ul>
					<div
						className="row"
						style={{
							textAlign: "center",
							backgroundColor: "#C0C0C0"
						}}>
						<div className="col">Buy In</div>
						<div className="col">Start Stack</div>
						<div className="col">Blinds</div>
					</div>
					<div
						className="row"
						style={{
							textAlign: "center"
						}}>
						<div
							className="col"
							onClick={() => actions.addToSchedule(tour)}>
							{" "}
							{tour ? tour["buy-in"] : "Buy in not found"}
						</div>
						<div
							className="col"
							onClick={() => actions.addToSchedule(tour)}>
							{" "}
							{tour
								? tour["starting-stack"]
								: "Starting Stack not found"}
						</div>
						<div
							className="col"
							onClick={() => actions.addToSchedule(tour)}>
							{" "}
							{tour ? tour.blinds : "Blinds not found"}
						</div>
					</div>
					<div className="col-11 mx-auto p-3 text-left">
						<div
							className="btn-group w-100"
							role="group"
							arial-label="Basic Example">
							<Link to="/calendar/109584">
								<button className="btn btn-light form-control">
									<i className="fas fa-arrow-circle-left" />{" "}
									Back{" "}
								</button>
							</Link>
						</div>
					</div>
				</div>
			);
		}}
	</Context.Consumer>
);
