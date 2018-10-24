import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export class YourSchedule extends React.Component {
	render() {
		return (
			<div className="container">
				<h3 className="pt-2 pb-2">Your schedule: Vegas 2012</h3>
				<table className="table">
					<thead className="text-center">
						<tr>
							<th scope="col" />
							<th scope="col">Price</th>
							<th scope="col">Bullets</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody className="text-center">
						<tr>
							<td>Isle - day #1A - NHL $50,000 Guaranteed</td>
							<td>$1,300</td>
							<td>2</td>
							<td>$2,600</td>
						</tr>
						<tr>
							<td>Isle - day #1A - NHL $50,000 Guaranteed</td>
							<td>$1,300</td>
							<td>2</td>
							<td>$2,600</td>
						</tr>
						<tr>
							<td>Isle - day #1A - NHL $50,000 Guaranteed</td>
							<td>$1,300</td>
							<td>2</td>
							<td>$2,600</td>
						</tr>
						<tr>
							<td>Isle - day #1A - NHL $50,000 Guaranteed</td>
							<td>$1,300</td>
							<td>2</td>
							<td>$2,600</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
