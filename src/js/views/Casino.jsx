import React from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext.jsx";

export const Casino = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			if (
				store.currentCasino === null ||
				store.currentCasino.ID != property.match.params.casino_id
			) {
				actions.fetchSingleCasino(property.match.params.casino_id);
				return <div>Loading casino... </div>;
			}
			return (
				<div>
					<h4
						className="text-center p-3 mt-4"
						onClick={() =>
							actions.addToSchedule(store.currentCasino)
						}>
						{store.currentCasino
							? store.currentCasino.post_title
							: "Casino not found"}
					</h4>
					<div
						className="row"
						style={{
							textAlign: "center",
							backgroundColor: "#C0C0C0"
						}}>
						<div className="col-11 mx-auto p-3">
							{store.currentCasino.location.address}
						</div>
					</div>
					<div className="text-center p-4">
						<p>{store.currentCasino.post_content}</p>
					</div>

					<div
						className="btn-group w-100 text-center p-4"
						role="group"
						aria-label="Basic example">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={store.currentCasino.website}
							className="btn btn-light form-control border">
							Go to Website
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://www.google.com/maps?daddr=${
								store.currentCasino.location.lat
							},${store.currentCasino.location.lng}`}
							className="btn btn-light form-control border">
							Location
						</a>
						<a
							rel="noopener noreferrer"
							href="javascript:history.back()"
							className="btn btn-light form-control border">
							Back to calendar
						</a>
					</div>
					<ul>
						{store.tournaments
							.filter(
								t => t.casino == property.match.params.casino_id
							)
							.map(tournament => (
								<li key={tournament.id}>{tournament.id}</li>
							))}
					</ul>
				</div>
			);
		}}
	</Context.Consumer>
);
