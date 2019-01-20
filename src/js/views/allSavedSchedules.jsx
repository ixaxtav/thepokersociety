import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export const AllSavedSchedules = property => (
	<Context.Consumer>
		{({ store, actions }) => {
			return (
				<div className="container pt-2">
					<h3 className="text-center pt-2">All Saved Schedules</h3>
					<table
						className="table textCenter justify-content-center"
						style={{
							tableLayout: "fixed",
							width: "340px",
							margin: "auto"
						}}>
						<thead className="pt-2 text-center">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Game</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody className="textCenter">
							<tr className="text-center">
								<td>schedule name</td>

								<td>games </td>
								<td>total</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}}
	</Context.Consumer>
);
